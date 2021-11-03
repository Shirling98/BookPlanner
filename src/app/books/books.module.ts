import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../shared/components/header/header.component";
import {BookComponent} from "./book/book.component";
import {BooksListComponent} from './books-list/books-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
    ])

  ],
  exports: [
    RouterModule
  ]
})

export class BooksModule {

}
