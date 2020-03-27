import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 //import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SharedModule} from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidateAccComponent } from './components/candidate/validate-acc/validate-acc.component';


@NgModule({
  declarations: [
    AppComponent,
    ValidateAccComponent,
   
   
  ],
  imports: [
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    // GuestModule,
    AppRoutingModule,

   
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }