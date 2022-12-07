import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './template/general/inicio/inicio.component';
import { LoginComponent } from './template/general/login/login.component';
import { LayoutComponent } from './template/others/layout/layout.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: '', component: InicioComponent}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }