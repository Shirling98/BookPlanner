import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeBooksComponent} from "./home-page/home-books.component";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  {path: '', component: HomeBooksComponent},
  {path: 'book/create', component: BookComponent},
  {path: 'book/edit/:id', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
