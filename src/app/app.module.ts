import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksModule} from './books/books.module';
import {HeaderComponent} from './shared/components/header/header.component';
import {environment} from '../environments/environment';
import {AuthModule} from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BooksModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
