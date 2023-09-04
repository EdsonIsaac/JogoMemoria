import { Component } from '@angular/core';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { Authentication } from 'src/app/models/authentication.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';
import { MessageUtils } from 'src/app/utils/message-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent {
  api!: string;
  authentication!: Authentication | null;
  theme!: string;
  user!: User;

  constructor(
    private _authenticationService: AuthenticationService,
    private _notificationService: NotificationService,
    private _redirectService: RedirectService,
    private _userService: UserService,
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.api = environment.api;
    this.authentication = this._authenticationService.getAuthentication();

    this._themeService.get().subscribe({
      next: (theme) => (this.theme = theme),
    });

    if (this.authentication) {
      this._userService
        .search(this.authentication.username, 0, 1, 'name', 'asc')
        .subscribe({
          next: (users) => {
            this.user = users.content[0];
          },

          error: (error) => {
            console.error(error);
            this._notificationService.show(
              MessageUtils.getMessage(error),
              NotificationType.FAIL
            );
          },
        });

      this._userService.get().subscribe({
        next: (user) => {
          if (user && this.user.id === user.id) {
            this.user = user;
          }
        },
      });
    }
  }

  changeTheme() {
    this._themeService.changeTheme();
  }

  redirectToGame() {
    this._redirectService.toGame();
  }

  redirectToPanel() {
    this._redirectService.toPanel();
  }

  logout() {
    this._authenticationService.logout();
    this._redirectService.toLogin();
  }
}
