import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from './card/card.module';
import { UserModule } from './user/user.module';
import { OthersModule } from './others/others.module';
import { GeneralModule } from './general/general.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CardModule,
    GeneralModule,
    OthersModule,
    UserModule,
  ]
})
export class TemplateModule { }