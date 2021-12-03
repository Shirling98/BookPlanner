import {Component, OnDestroy, OnInit} from '@angular/core';

import {BookService} from '../../services/book.service';
import {IBook, IGenre} from '../../interfaces/bookInterface';
import {AuthService} from '../../../auth/services/auth.service';
import {ControllerService} from '../../services/controller.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {

  books: IBook[] = []
  searchStr = '';
  isLoad = false;
  genres: { [key: string]: IGenre } = {};
  fName: string;
  name: string = 'Поиск по наименованию книги'
  unsub = new Subject();

  constructor(
    private bookService: BookService,
    public auth: AuthService,
    private cs: ControllerService) {
  }

  ngOnInit() {
    this.getBooks();
    this.getGenres();
    this.cs.filterName(this.name)
    this.cs.searchStr$.pipe(takeUntil(this.unsub)).subscribe(str => {
      this.getList(str)
    })
  }

  getGenres() {
   this.bookService.getGenres().pipe(takeUntil(this.unsub)).subscribe((genres) => {
      genres
        .map((genre) => {
          this.genres[genre.key] = genre.val
        })
    })
  }

  getBooks(str: string = '') {
    this.bookService.getBooks(str).pipe(takeUntil(this.unsub)).subscribe((books) => {
      this.isLoad = true
      this.books = books
    })
  }

  removeBook(id: string | undefined) {
    if (id) {
      this.bookService.remove(id).pipe(takeUntil(this.unsub)).subscribe(() => {
        this.getBooks()
      })
    }
  }

  getList(str: string) {
    this.getBooks(str)
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}
