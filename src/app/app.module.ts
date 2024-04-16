import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Store } from 'store';
import { AuthModule } from 'src/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent, AppNavComponent],
  imports: [BrowserModule, AuthModule, AppRoutingModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
