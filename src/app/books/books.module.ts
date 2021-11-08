import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BookComponent} from "./book/book.component";
import {BooksListComponent} from './books-list/books-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

@NgModule({
  declarations: [
    BookComponent,
    BooksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([

      {path: 'list', component: BooksListComponent},
      {path: 'create', component: BookComponent},
      {path: 'edit/:id', component: BookComponent}
    ]),
    provideFirebaseApp(() => initializeApp({ ... environment.firebase})),
    provideFirestore(() => getFirestore()),

  ],
  exports: [
    RouterModule
  ]
})

export class BooksModule {

}
