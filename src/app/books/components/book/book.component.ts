import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {EMPTY, Observable, Subject} from 'rxjs';

import {IBook, IGenres} from '../../interfaces/bookInterface';
import {BookService} from '../../services/book.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {AlertService} from '../../../shared/services/alert.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  @ViewChild('bookCover') bookCover: ElementRef;

  formBook!: FormGroup;
  getGenres: Observable<IGenres[]> = EMPTY;
  book: IBook[] = [];
  submitted = false;
  bookId = '';
  isCreate = false;
  unsub$ = new Subject();
  coverUrl: Observable<string>;
  uploadPercent: Observable<number>;


  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.isCreate = true
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
          this.isCreate = false
          this.getBook()
        }
      })
  }

  upload(event: any) {
    if (event.target.files.length > 0) {
      this.submitted = true
      const file = event.target.files[0];
      const filePath = `covers/${file.name}`;
      this.formBook.get('cover').setValue(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges()
      task
        .then(() => {
          this.submitted = false;
          this.uploadPercent = new Observable<number>();
          this.alert.success('Обложка загружена');
        })
        .catch((error) => {
          if (error.code == 'storage/unknown') {
            this.alert.danger('Неизвестная ошибка')
          } else if (error.code == 'storage/no-default-bucket') {
            this.alert.danger('В свойстве конфигурации не задан storageBucket')
          }
        })
    } else {
      this.alert.warning('Операция отменена пользователем')
    }

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
          .pipe(catchError((error) => {
            console.log(error.code)
            if (error.code == 'storage/object-not-found') {
              this.alert.danger('Объект не найден')
            } else if (error.code == 'storage/invalid-root-operation') {
              this.alert.danger('У книги нет обложки')
            }
            return EMPTY
          }))
      })
  }

  submit() {
    const formData: IBook = {...this.formBook.value};
    this.submitted = true;

    if (this.bookId) {
      this.bookService.update({
        id: this.bookId,
        ...formData
      })
        .pipe(catchError((error) => {
          this.submitted = false;
          return error;
        }))
        .subscribe(async () => {
          this.submitted = false;
          this.alert.success('Книга отредактирована');
          await this.router.navigate(['/books', 'list']);
        })
    } else {
      this.bookService.create(formData).pipe(takeUntil(this.unsub$))
        .subscribe(() => {
          this.submitted = false;
          this.formBook.reset();
          this.bookCover.nativeElement.value = '';
          this.alert.success('Книга добавлена');
        })
    }
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
