import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FireModule } from './fire/fire.module';

const MODULES: Type<unknown>[] = [
  FireModule
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MODULES
  ],
  exports: [MODULES]
})
export class CoreModule { }
