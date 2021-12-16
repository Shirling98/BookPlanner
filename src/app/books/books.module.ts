import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

import {BookComponent} from "./components/book/book.component";
import {BooksListComponent} from './components/books-list/books-list.component';
import {AuthModule} from "../auth/auth.module";
import {FilterComponent} from './components/filter/filter.component';
import { BookViewComponent } from './components/book-view/book-view.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);

@NgModule({
  declarations: [
    BookComponent,
    BooksListComponent,
    FilterComponent,
    BookViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([

      {path: 'list', component: BooksListComponent},
      {
        path: 'create',
        component: BookComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
      },
      {
        path: 'edit/:id',
        component: BookComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
      },
      {path: 'view/:id', component: BookViewComponent},
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthModule]
})

export class BooksModule {

}
