import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/components/auth/auth.component";


const routes: Routes = [
  {path: '', redirectTo: '/books/list', pathMatch: 'full'},
  {path: 'books', loadChildren: () => import('./books/books.module').then((m) => m.BooksModule)},
  {path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
