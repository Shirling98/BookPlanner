import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

import {BookComponent} from "./book/book.component";
import {BooksListComponent} from './books-list/books-list.component';
import {environment} from "../../environments/environment";
import {BookAuthComponent} from "../book-auth/book-auth.component";

import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "../shared/services/auth.guard";

@NgModule({
  declarations: [
    BookComponent,
    BooksListComponent,
    BookAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([

      {path: 'list', component: BooksListComponent, canActivate: [AuthGuard]},
      {path: 'create', component: BookComponent, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: BookComponent, canActivate: [AuthGuard]},
      {path: 'auth', component: BookAuthComponent}

    ]),
    provideFirebaseApp(() => initializeApp({ ... environment.firebase})),
    provideFirestore(() => getFirestore()),

  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class BooksModule {

}
