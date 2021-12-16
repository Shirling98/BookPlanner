import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, takeUntil} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {IGenres} from '../../interfaces/bookInterface';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

  formBook!: FormGroup;
  bookId = '';
  getGenres: Observable<IGenres[]> = EMPTY;
  unsub$ = new Subject();
  coverUrl: Observable<string>;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.getGenres = this.bookService.getGenres()
    this.formBook = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      cover: [''],
      read: [false],
    })

    this.route.params.pipe(takeUntil(this.unsub$))
      .subscribe((params) => {
        this.bookId = params.id
        if (this.bookId) {
          this.getBook()
        }
      })
  }

  getBook() {
    return this.bookService.getById(this.bookId).pipe(takeUntil(this.unsub$))
      .subscribe((book) => {
        if (!book) {
          this.router.navigate(['/books', 'list'])
          this.alert.danger('Указанная книга не существует')
          return
        }
        this.formBook.patchValue({
          ...book
        })

        const ref = this.storage.ref(book.cover);
        this.coverUrl = ref.getDownloadURL()
          .pipe(
            catchError( err => {
              if(err.code == 'storage/invalid-root-operation') {
                this.alert.danger('У книги нет обложки')
              }
              return EMPTY
            })
          )
      })
  }


}
