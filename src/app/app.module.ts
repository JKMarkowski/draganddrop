import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import {DragListDirective} from './drag-list.directive';
import { DragItemDirective } from './drag-item.directive';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule
  ],
  declarations: [ AppComponent, DragListDirective, DragItemDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
