import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';

import { SelectImageComponent } from '../select-image/select-image.component';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { MessageUtils } from 'src/app/utils/message-utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  form!: FormGroup;
  image!: any;

  constructor(
    private _cardService: CardService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _imageService: ImageService,
    private _notificationService: NotificationService,
    private _redirectService: RedirectService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  addImage() {
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
            this.image = {
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

  buildForm() {
    this.form = this._formBuilder.group({
      id: [null, Validators.nullValidator],
    });
  }

  removeImage() {
    this.image = null;
  }

  submit() {
    if (this.form.valid && this.image) {
      const card: Card = Object.assign({}, this.form.getRawValue());
      const image: File = this.image.file;

      this._cardService.save(card, image).subscribe({
        complete: () => {
          this._notificationService.show(
            MessageUtils.CARD.SAVE_SUCCESS,
            NotificationType.SUCCESS
          );
          this._redirectService.toCardsList();
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
