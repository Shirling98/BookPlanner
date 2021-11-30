import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../interfaces/interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Component({
  selector: 'app-book-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formAuth!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit(): void {


    this.formAuth = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)]]
    })
  }

  googleLogin() {
    this.auth.loginGoogle();
  }

  submit() {
    this.submitted = true
    const user: IUser = {...this.formAuth.value}
    if (this.formAuth.invalid) {
      return
    } else {
      this.submitted = false
    }
    this.auth.login(user)

  }
}
