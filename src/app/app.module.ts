import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksModule} from './books/books.module';
import {HeaderComponent} from './shared/components/header/header.component';
import {environment} from '../environments/environment';
import {AuthModule} from './auth/auth.module';
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from './shared/services/alert.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BooksModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
