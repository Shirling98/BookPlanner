import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {EMPTY, Observable, Subscription} from 'rxjs';
import {IBook, IGenres} from '../../interfaces/bookInterface';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  formBook!: FormGroup;
  getGenres: Observable<IGenres[]> = EMPTY;
  book: IBook[] = [];
  submitted = false;
  bookId = '';
  isCreate = false;
  subscriptions: Subscription[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;


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

    this.sub1 = this.route.params
      .subscribe((params) => {
        this.bookId = params.id
        if (this.bookId) {
          this.isCreate = false
          this.getBook()
        }
      })
    this.subscriptions.push(this.sub1);
    this.subscriptions.push(this.sub2);
    this.subscriptions.push(this.sub3);
    this.subscriptions.push(this.sub4);
  }

  getBook() {
    this.sub2 = this.bookService.getById(this.bookId)
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
     this.sub3 = this.bookService.update({
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
      this.sub4 = this.bookService.create(formData).subscribe(() => {
        this.formBook.reset()
      })
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscriptions) => subscriptions.unsubscribe())
  }
}
