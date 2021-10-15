import { NgModule, Type } from '@angular/core';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

const MODULES: Type<unknown>[] = [
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireAuthModule,
  AngularFireFunctionsModule
];

@NgModule({
  imports: [
    MODULES,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [MODULES],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['http://localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['http://localhost', 8080] : undefined },
    { provide: USE_STORAGE_EMULATOR, useValue: !environment.production ? ['http://localhost', 9199] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: !environment.production ? ['http://localhost', 5001] : undefined },
  ]
})
export class FireModule { }
