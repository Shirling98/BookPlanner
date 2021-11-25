import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {HttpClientModule} from "@angular/common/http";

import {BookComponent} from "./components/book/book.component";
import {BooksListComponent} from './components/books-list/books-list.component';
import {environment} from "../../environments/environment";
import {AuthModule} from "../auth/auth.module";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);

@NgModule({
  declarations: [
    BookComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([

      {path: 'list', component: BooksListComponent},
      {path: 'create', component: BookComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
      {path: 'edit/:id', component: BookComponent, canActivate: [AngularFireAuthGuard]}

    ]),
    provideFirebaseApp(() => initializeApp({...environment.firebase})),
    provideFirestore(() => getFirestore()),

  ],
  exports: [
    RouterModule
  ],
  providers: [AuthModule]
})

export class BooksModule {

}
