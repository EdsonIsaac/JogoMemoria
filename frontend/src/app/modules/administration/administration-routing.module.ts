import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';
import { CardsComponent } from 'src/app/components/cards/cards.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { PanelComponent } from 'src/app/components/panel/panel.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cards', component: CardsComponent },
      { path: 'cards/:id', component: CardComponent },
      { path: 'panel', component: PanelComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
