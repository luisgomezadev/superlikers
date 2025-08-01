import { NgModule } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    NgCircleProgressModule.forRoot({})
  ],
  exports: [NgCircleProgressModule]
})
export class CircleProgressModule { }
