import {Component, OnInit} from '@angular/core';

import {BookService} from '../../services/book.service';
import {IBook, IGenre} from '../../interfaces/bookInterface';
import {AuthService} from '../../../auth/services/auth.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: IBook[] = []
  searchStr = '';
  isLoad = false;
  genres: { [key: string]: IGenre } = {};

  //name: string = 'Поиск по наименованию книги'

  constructor(
    private bookService: BookService,
    public auth: AuthService,) {
  }

  ngOnInit() {
    this.getBooks()
    this.getGenres()
  }

  getGenres() {
    this.bookService.getGenres().subscribe((genres) => {
      genres
        .map((genre) => {
          this.genres[genre.key] = genre.val
        })
    })
  }

  getBooks(str: string = '') {
    this.bookService.getBooks(str).subscribe((books) => {
      this.isLoad = true
      this.books = books
    })
  }

  removeBook(id: string | undefined) {
    if (id) {
      this.bookService.remove(id).subscribe(() => {
        this.getBooks()
      })
    }
  }

  getList(str: string) {
    this.getBooks(str)
  }

}
