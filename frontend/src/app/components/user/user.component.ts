import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { Authentication } from 'src/app/models/authentication.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { UserService } from 'src/app/services/user.service';
import { FormUtils } from 'src/app/utils/form-utils';
import { MessageUtils } from 'src/app/utils/message-utils';
import { environment } from 'src/environments/environment';

import { SelectImageComponent } from '../select-image/select-image.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  api!: string;
  authentication!: Authentication | null;
  form!: FormGroup;
  hide!: boolean;
  photo!: any;
  user!: User | null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _imageService: ImageService,
    private _notificationService: NotificationService,
    private _redirectService: RedirectService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.api = environment.api;
    this.authentication = this._authenticationService.getAuthentication();
    this.hide = true;
    this.photo = null;

    this._activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params && params.id) {
          if (params.id.includes('register')) {
            this._userService.set(null);
          } else {
            this._userService.findById(params.id).subscribe({
              next: (user) => {
                this._userService.set(user);
              },

              error: (error) => {
                console.error(error);
                this._notificationService.show(
                  MessageUtils.getMessage(error),
                  NotificationType.FAIL
                );
              },
            });
          }
        }
      },
    });

    this._userService.get().subscribe({
      next: (user) => {
        this.buildForm(user);

        if (user) {
          this.user = user;
          this.photo = user.photo
            ? { id: user.photo.id, name: user.photo.name }
            : null;
        }
      },
    });
  }

  addPhoto() {
    this._dialog
      .open(SelectImageComponent, {
        data: {
          multiple: false,
        },
        width: '100%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result && result.status) {
          this._imageService.toBase64(result.images[0])?.then((data) => {
            this.photo = {
              id: new Date().getTime(),
              data: data,
              file: result.images[0],
            };
          });
        }
      });
  }

  back() {
    this._redirectService.toUsersList();
  }

  buildForm(user: User | null) {
    this.form = this._formBuilder.group({
      id: [user?.id, Validators.nullValidator],
      name: [user?.name, Validators.required],
      username: [user?.username, Validators.required],
      password: [user?.password, Validators.required],
      department: [user?.department, Validators.required],
      enabled: [user?.enabled, Validators.required],
      photo: [user?.photo, Validators.nullValidator],
    });

    if (user && user.username === this.authentication?.username) {
      this.form.get('username')?.disable();
      this.form.get('department')?.disable();
      this.form.get('enabled')?.disable();
    }
  }

  getErrorMessage(controlName: string) {
    return FormUtils.getErrorMessage(this.form, controlName);
  }

  hasError(controlName: string) {
    return FormUtils.hasError(this.form, controlName);
  }

  removePhoto() {
    this.photo = null;
    this.form.get('photo')?.patchValue(null);
  }

  submit() {
    if (this.form.valid) {
      const user: User = Object.assign({}, this.form.getRawValue());
      const image: File = this.photo?.file;

      if (user.id) {
        this._userService.update(user, image).subscribe({
          next: (user) => {
            this._userService.set(user);
            this._notificationService.show(
              MessageUtils.USER.UPDATE_SUCCESS,
              NotificationType.SUCCESS
            );
          },

          error: (error) => {
            console.error(error);
            this._notificationService.show(
              MessageUtils.getMessage(error),
              NotificationType.FAIL
            );
          },
        });
      } else {
        this._userService.save(user, image).subscribe({
          next: (user) => {
            this._notificationService.show(
              MessageUtils.USER.SAVE_SUCCESS,
              NotificationType.SUCCESS
            );
            this._redirectService.toUser(user.id);
          },

          error: (error) => {
            console.error(error);
            this._notificationService.show(
              MessageUtils.getMessage(error),
              NotificationType.FAIL
            );
          },
        });
      }
    }
  }
}
