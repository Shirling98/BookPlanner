import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {EMPTY, Observable} from 'rxjs';
import {IBook, IGenres} from '../../interfaces/bookInterface';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  formBook!: FormGroup
  getGenres: Observable<IGenres[]> = EMPTY
  book: IBook[] = []
  submitted = false
  bookId = ''
  isCreate = false


  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isCreate = true
    this.getGenres = this.bookService.getGenres()

    this.formBook = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      read: [false, Validators.required],
    })

    this.route.params
      .subscribe((params) => {
        this.bookId = params.id
        if (this.bookId) {
          this.isCreate = false
          this.getBook()
        }
      })
  }

  getBook() {
    this.bookService.getById(this.bookId)
      .subscribe((book) => {
        this.formBook.patchValue({
          ...book
        })
      })
  }

  submit() {

    const formData: IBook = {...this.formBook.value}
    console.log(formData);
    this.submitted = true

    if (this.bookId) {
      this.bookService.update({
        id: this.bookId,
        ...formData

      })
        .pipe(catchError( (error) => {
          this.submitted = false
          return error
        }))
        .subscribe(async () => {
        this.submitted = false
        await this.router.navigate(['/books', 'list'])
      })

    } else {
      this.bookService.create(formData).subscribe(() => {
        this.formBook.reset()
      })
    }
  }
}
