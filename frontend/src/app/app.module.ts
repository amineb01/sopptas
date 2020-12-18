import { NgModule } from '@angular/core';

import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from '../services/services.module';
import { BrowserModule } from '@angular/platform-browser';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost"],
      },
    }),
  ],
  providers: [ServicesModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
