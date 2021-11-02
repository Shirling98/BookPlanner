import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {BookComponent} from "./book/book.component";

@NgModule({
  declarations: [
    HomePageComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: HomePageComponent, children: [
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
