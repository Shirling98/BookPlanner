import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {IUser} from "../shared/components/interface";



@Component({
  selector: 'app-book-auth',
  templateUrl: './book-auth.component.html',
  styleUrls: ['./book-auth.component.scss']
})
export class BookAuthComponent implements OnInit {

  formAuth!: FormGroup
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

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

  submit() {
    console.log(this.formAuth);
    if(this.formAuth.invalid) {
      return
    }
    this.submitted = true

      const user: IUser = {...this.formAuth.value}

    this.authService.login(user).subscribe(() => {
      this.formAuth.reset()
      this.router.navigate(['/books', 'list'])
      this.submitted = false
    })
  }
}
