import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {EMPTY, Observable, Subscription} from "rxjs";
import {IBook, IGenre} from "../../shared/components/interface";
import {BookService} from "../../shared/components/book.service";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit{


  formBook!: FormGroup
  getGenres: Observable<IGenre[]> = EMPTY



  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase, private bookService: BookService) {
      }

  ngOnInit(): void {
    this.formBook = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      read: [false, Validators.required],
    })

    this.getGenres = this.bookService.getGenres()
  }

  submit() {
    const formData: IBook = {...this.formBook.value}
    console.log('Данные с формы', formData)


    const book: IBook = {
      name: this.formBook.value.name,
      author: this.formBook.value.author,
      genre: this.formBook.value.genre,
      description: this.formBook.value.description,
      read: this.formBook.value.read,
    }

    this.bookService.create(book).subscribe(() => {
      this.formBook.reset()
    })
  }

}
