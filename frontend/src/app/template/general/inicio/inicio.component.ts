import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/model/card.model';
import { CardService } from 'src/app/service/card.service';
import { DialogGameoverComponent } from '../dialog-gameover/dialog-gameover.component';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  card_one!: any;
  card_two!: any;
  cards!: Array<Card>;
  cards_matchers!: Array<any>;
  matches!: number;

  constructor(private cardService: CardService, private dialog: MatDialog) {
    this.cards_matchers = [];
    this.matches = 0;
  }

  ngOnInit(): void {
    this.cardService.findAll().subscribe(cards => {
      
      if (cards.length >= 12) {
        this.cards = cards;
      
        $(document).ready(() => {
          this.buildCards();
        });
      } else {
        this.cards = [];
      }
    });
  }

  buildCards() {

    let matches = [];

    while (matches.length < 24) {

      let randomInt = this.randomIntInclusive(1, 12);
      let match = 0;

      matches.forEach(number => {
        if (number === randomInt) match++;
      });

      if (match === 0 || match === 1) matches.push(randomInt);
    }

    $('#flip-card-01').data('match', matches[0]);
    $('#flip-card-02').data('match', matches[1]);
    $('#flip-card-03').data('match', matches[2]);
    $('#flip-card-04').data('match', matches[3]);
    $('#flip-card-05').data('match', matches[4]);
    $('#flip-card-06').data('match', matches[5]);
    $('#flip-card-07').data('match', matches[6]);
    $('#flip-card-08').data('match', matches[7]);
    $('#flip-card-09').data('match', matches[8]);
    $('#flip-card-10').data('match', matches[9]);
    $('#flip-card-11').data('match', matches[10]);
    $('#flip-card-12').data('match', matches[11]);
    $('#flip-card-13').data('match', matches[12]);
    $('#flip-card-14').data('match', matches[13]);
    $('#flip-card-15').data('match', matches[14]);
    $('#flip-card-16').data('match', matches[15]);
    $('#flip-card-17').data('match', matches[16]);
    $('#flip-card-18').data('match', matches[17]);
    $('#flip-card-19').data('match', matches[18]);
    $('#flip-card-20').data('match', matches[19]);
    $('#flip-card-21').data('match', matches[20]);
    $('#flip-card-22').data('match', matches[21]);
    $('#flip-card-23').data('match', matches[22]);
    $('#flip-card-24').data('match', matches[23]);

    let arrCards = [];

    while (arrCards.length < 12) {

      let randomInt = this.randomIntInclusive(0, (this.cards.length - 1));

      if (arrCards.indexOf(randomInt) === -1) {
        arrCards.push(randomInt);
      }
    }

    for (let i = 0, j = 1; i < 12; i++, j++) {

      let card_one = null;
      let card_two = null;

      if ($('#flip-card-01').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-01');
        }

        if (card_one == null) {
          card_one = $('#card-01');
        }
      }

      if ($('#flip-card-02').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-02');
        }

        if (card_one == null) {
          card_one = $('#card-02');
        }
      }

      if ($('#flip-card-03').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-03');
        }

        if (card_one == null) {
          card_one = $('#card-03');
        }
      }

      if ($('#flip-card-04').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-04');
        }

        if (card_one == null) {
          card_one = $('#card-04');
        }
      }

      if ($('#flip-card-05').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-05');
        }

        if (card_one == null) {
          card_one = $('#card-05');
        }
      }

      if ($('#flip-card-06').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-06');
        }

        if (card_one == null) {
          card_one = $('#card-06');
        }
      }

      if ($('#flip-card-07').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-07');
        }

        if (card_one == null) {
          card_one = $('#card-07');
        }
      }

      if ($('#flip-card-08').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-08');
        }

        if (card_one == null) {
          card_one = $('#card-08');
        }
      }

      if ($('#flip-card-09').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-09');
        }

        if (card_one == null) {
          card_one = $('#card-09');
        }
      }

      if ($('#flip-card-10').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-10');
        }

        if (card_one == null) {
          card_one = $('#card-10');
        }
      }

      if ($('#flip-card-11').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-11');
        }

        if (card_one == null) {
          card_one = $('#card-11');
        }
      }

      if ($('#flip-card-12').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-12');
        }

        if (card_one == null) {
          card_one = $('#card-12');
        }
      }

      if ($('#flip-card-13').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-13');
        }

        if (card_one == null) {
          card_one = $('#card-13');
        }
      }

      if ($('#flip-card-14').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-14');
        }

        if (card_one == null) {
          card_one = $('#card-14');
        }
      }

      if ($('#flip-card-15').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-15');
        }

        if (card_one == null) {
          card_one = $('#card-15');
        }
      }

      if ($('#flip-card-16').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-16');
        }

        if (card_one == null) {
          card_one = $('#card-16');
        }
      }

      if ($('#flip-card-17').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-17');
        }

        if (card_one == null) {
          card_one = $('#card-17');
        }
      }

      if ($('#flip-card-18').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-18');
        }

        if (card_one == null) {
          card_one = $('#card-18');
        }
      }

      if ($('#flip-card-19').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-19');
        }

        if (card_one == null) {
          card_one = $('#card-19');
        }
      }

      if ($('#flip-card-20').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-20');
        }

        if (card_one == null) {
          card_one = $('#card-20');
        }
      }

      if ($('#flip-card-21').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-21');
        }

        if (card_one == null) {
          card_one = $('#card-21');
        }
      }

      if ($('#flip-card-22').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-22');
        }

        if (card_one == null) {
          card_one = $('#card-22');
        }
      }

      if ($('#flip-card-23').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-23');
        }

        if (card_one == null) {
          card_one = $('#card-23');
        }
      }

      if ($('#flip-card-24').data('match') === j) {

        if (card_one != null) {
          card_two = $('#card-24');
        }

        if (card_one == null) {
          card_one = $('#card-24');
        }
      }

      let card = this.cards[arrCards[i]];
      $(card_one).append("<img src='" + card.cardOne + "' width='150px' height='200px'>");
      $(card_two).append("<img src='" + card.cardTwo + "' width='150px' height='200px'>");

      card_one = null;
      card_two = null;
    }
  }

  endGame() {
    setTimeout(() => {

      if (this.matches === 12) {

        this.dialog.open(DialogGameoverComponent, {
          width: '50%'
        })
        .afterClosed().subscribe(result => {

          if (result.restart) {
            this.restart();
          }
        });
      }
    }, 1500);
  }

  flip(element: any) {

    if (!this.cards_matchers.includes(element)) {

      $(element).children().removeClass('unflip');
      $(element).children().addClass('flip');

      if (this.card_one != null) {

        if (this.card_one != element) {

          if (this.card_two == null) this.card_two = element;
        }
      }

      if (this.card_one == null) this.card_one = element;


      if (this.card_one != null && this.card_two != null) {

        if ($(this.card_one).data('match') === $(this.card_two).data('match')) {

          this.cards_matchers.push(this.card_one, this.card_two);
          this.matches++;

          this.endGame();
        }

        else {
          this.unflip(this.card_one, this.card_two);
        }

        this.card_one = null;
        this.card_two = null;
      }
    }
  }

  isDesabled(element: any) {
    return this.cards_matchers.includes(element);
  }

  randomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  restart() {
    this.cards_matchers.forEach(card => {
      $(card).children().removeClass('flip');
      $(card).children().add('unflip');
    });

    Array.prototype.slice.call(document.getElementsByTagName('img')).forEach(img => img.remove());
    this.cards_matchers = [];
    this.matches = 0;

    this.ngOnInit();
  }

  unflip(card_one: any, card_two: any) {
    setTimeout(() => {
      $(card_one).children().removeClass('flip');
      $(card_two).children().removeClass('flip');
      $(card_one).children().add('unflip');
      $(card_two).children().add('unflip');
    }, 1500);
  }
}