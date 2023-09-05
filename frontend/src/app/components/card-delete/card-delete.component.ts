import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MessageUtils } from 'src/app/utils/message-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-delete',
  templateUrl: './card-delete.component.html',
  styleUrls: ['./card-delete.component.sass'],
})
export class CardDeleteComponent {
  api!: string;
  card!: Card;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardService: CardService,
    private _dialogRef: MatDialogRef<CardDeleteComponent>,
    private _notificationService: NotificationService
  ) {
    this.api = environment.api;
    this.card = this.data.card;
  }

  submit() {
    this._cardService.delete(this.card.id).subscribe({
      complete: () => {
        this._notificationService.show(
          MessageUtils.CARD.DELETE_SUCCESS,
          NotificationType.SUCCESS
        );
        this._dialogRef.close({ status: true });
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
