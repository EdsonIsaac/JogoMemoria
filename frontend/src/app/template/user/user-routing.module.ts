import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { LayoutComponent } from '../others/layout/layout.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'users', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {path: '', component: UserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }