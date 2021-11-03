import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HomePageComponent} from "./shared/components/home-page/home-page.component";
import {BookComponent} from "./book/book.component";
import { BooksListComponent } from './books-list/books-list.component';

@NgModule({
  declarations: [
    HomePageComponent,
    BookComponent,
    BooksListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: HomePageComponent, children: [
          {path: 'booksList', component: BooksListComponent},
          {path: 'create', component: BookComponent},
          {path: 'edit/:id', component: BookComponent}
        ]
      }
    ])

  ],
  exports: [
    RouterModule
  ]
})
export class BooksModule {

}
