import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { LayoutComponent } from '../others/layout/layout.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {path: 'cards', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', component: CardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }