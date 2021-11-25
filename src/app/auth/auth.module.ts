import {NgModule} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthComponent} from "./components/auth/auth.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [AuthService]
})
export class AuthModule {

}
