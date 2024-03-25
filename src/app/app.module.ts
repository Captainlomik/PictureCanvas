import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { materialModule } from './material.module';
import { PictureComponent } from './picture/picture.component';
import { MainPageComponent } from './main-page/main-page.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SettingsPopupComponent } from './settings-popup/settings-popup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    PictureComponent, 
    MainPageComponent,
    SettingsPopupComponent, 
   
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule, 
    materialModule,
    ReactiveFormsModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent,]
})
export class AppModule { }
