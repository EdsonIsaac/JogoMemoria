import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { MessageUtils } from 'src/app/utils/message-utils';
import { OperatorUtils } from 'src/app/utils/operator-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass'],
})
export class CardsComponent implements AfterViewInit {
  api!: string;
  cards!: Array<Card>;
  isLoadingResults!: boolean;
  resultsLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _cardService: CardService,
    private _notificationService: NotificationService,
    private _redirectService: RedirectService
  ) {
    this.api = environment.api;
    this.isLoadingResults = true;
    this.resultsLength = 0;
  }

  ngAfterViewInit(): void {
    this.findAll();
  }

  add() {}

  delete(card: Card) {}

  async findAll() {
    const page: number = this.paginator.pageIndex;
    const size: number = this.paginator.pageSize;
    const sort: string = 'name';
    const direction: string = 'asc';

    this.isLoadingResults = true;
    await OperatorUtils.delay(1000);

    this._cardService.findAll(page, size, sort, direction).subscribe({
      next: (cards) => {
        this.cards = cards.content;
        this.resultsLength = cards.totalElements;
        this.isLoadingResults = false;
      },

      error: (error) => {
        this.isLoadingResults = false;
        console.error(error);
        this._notificationService.show(
          MessageUtils.getMessage(error),
          NotificationType.FAIL
        );
      },
    });
  }
}
