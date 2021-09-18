import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackgroundComponent } from './components/background.component';
import { FireModule } from './fire/fire.module';
import { GifService } from './services/gif.service';
import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';

const EXPORTED_MODULES: Type<unknown>[] = [
  FireModule
];

const EXPORTED_COMPONENTS: Type<unknown>[] = [
  BackgroundComponent
];

@NgModule({
  declarations: [EXPORTED_COMPONENTS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EXPORTED_MODULES
  ],
  exports: [EXPORTED_MODULES, EXPORTED_COMPONENTS],
  providers: [
    UserService,
    GifService,
    RoomService
  ]
})
export class CoreModule { }
