import { ModuleWithProviders, NgModule } from '@angular/core';
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

const MODULES: ModuleWithProviders<unknown>[] = [
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage())
];

@NgModule({
  imports: [
    MODULES,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  exports: [MODULES],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['localhost', 8080] : undefined },
    { provide: USE_STORAGE_EMULATOR, useValue: !environment.production ? ['localhost', 9199] : undefined }
  ]
})
export class FireModule { }
