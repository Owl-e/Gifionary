import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

const MODULES = [
  MaterialModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [
    MODULES
  ]
})
export class SharedModule { }
