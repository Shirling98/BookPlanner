import { Component, OnInit } from '@angular/core';
import {BookService} from "../../shared/components/book.service";
import {IBook, IGenre} from "../../shared/components/interface";
import {EMPTY, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: IBook[] = []
  getBooks: Observable<IBook[]> = EMPTY

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks = this.bookService.getBooks()
  }

}
