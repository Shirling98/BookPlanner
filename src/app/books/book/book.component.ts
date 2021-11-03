import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent{

  // @ts-ignore
  formBook: FormGroup;

  constructor() {
    this.createForm()
  }

  private createForm() {
    this.formBook = new FormGroup({
      name: new FormControl(null),
      author: new FormControl(null),
      genre: new FormControl(null),
      description: new FormControl(null),
      read: new FormControl(false),
    })
  }

  submit() {
    const formData = {...this.formBook.value}
    console.log('Данные с формы', formData)
    this.formBook.reset()

  }
}
