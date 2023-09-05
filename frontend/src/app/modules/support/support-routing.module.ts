import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';
import { CardsComponent } from 'src/app/components/cards/cards.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { PanelComponent } from 'src/app/components/panel/panel.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { UsersComponent } from 'src/app/components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cards', component: CardsComponent },
      { path: 'cards/:id', component: CardComponent },
      { path: 'panel', component: PanelComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRoutingModule {}
