import {Component, OnDestroy, OnInit} from '@angular/core';

import {BookService} from '../../services/book.service';
import {IBook, IGenre} from '../../interfaces/bookInterface';
import {AuthService} from '../../../auth/services/auth.service';
import {ControllerService} from '../../services/controller.service';
import {Subscription} from 'rxjs';


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
  subscriptions: Subscription[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  constructor(
    private bookService: BookService,
    public auth: AuthService,
    private cs: ControllerService) {
  }

  ngOnInit() {
    this.getBooks();
    this.getGenres();
    this.cs.filterName(this.name)
    this.sub1 = this.cs.searchStr$.subscribe(str => {
      this.getList(str)
    })
    this.subscriptions.push(this.sub1);
    this.subscriptions.push(this.sub2);
    this.subscriptions.push(this.sub3);
    this.subscriptions.push(this.sub4);
  }

  getGenres() {
    this.sub2 = this.bookService.getGenres().subscribe((genres) => {
      genres
        .map((genre) => {
          this.genres[genre.key] = genre.val
        })
    })
  }

  getBooks(str: string = '') {
    this.sub3 = this.bookService.getBooks(str).subscribe((books) => {
      this.isLoad = true
      this.books = books
    })
  }

  removeBook(id: string | undefined) {
    if (id) {
      this.sub4 = this.bookService.remove(id).subscribe(() => {
        this.getBooks()
      })
    }
  }

  getList(str: string) {
    this.getBooks(str)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }
}
