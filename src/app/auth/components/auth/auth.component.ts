import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {IUser} from '../../interfaces/interface';
import {AlertService} from '../../../shared/services/alert.service';


@Component({
  selector: 'app-book-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formAuth!: FormGroup;
  submitted = false;
  errMess: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    private alert: AlertService
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
    this.auth.login(user)
      .catch((error) => {
        this.submitted = false
        if (error.code == 'auth/user-not-found') {
          this.alert.danger('Некорректный email')
        } else if (error.code == 'auth/wrong-password') {
          this.alert.danger('Неверный пароль')
        }
      })
  }
}
