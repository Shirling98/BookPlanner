import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/books/list', pathMatch: 'full'},
  {path: 'books', loadChildren: () => import('./books/books.module').then((m) => m.BooksModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
