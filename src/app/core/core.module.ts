import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FireModule } from './fire/fire.module';
import { GifService } from './services/gif.service';
import { UserService } from './services/user.service';

const MODULES: Type<unknown>[] = [
  FireModule
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MODULES
  ],
  exports: [MODULES],
  providers: [
    UserService,
    GifService
  ]
})
export class CoreModule { }
