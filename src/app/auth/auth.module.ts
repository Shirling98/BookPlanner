import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {AuthComponent} from "./components/auth/auth.component";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'auth', component: AuthComponent}
    ])
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AuthModule {

}
