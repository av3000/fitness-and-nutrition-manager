import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from 'src/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { Store } from 'store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AppRoutingModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
