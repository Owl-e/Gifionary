import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';

const MODULES = [
  MaterialModule,
  FormsModule
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
