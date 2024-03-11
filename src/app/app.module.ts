import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { materialModule } from './material.module';
import { PictureComponent } from './picture/picture.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent, 
    PictureComponent, 
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    materialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
