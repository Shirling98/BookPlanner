import {Component, OnInit} from '@angular/core';
import {BookService} from "../../shared/components/book.service";
import {IBook} from "../../shared/components/interface";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: IBook[] = []

  constructor(
    private bookService: BookService) {
  }

  ngOnInit() {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books
    })
  }

  removeBook(id: string | undefined) {
    if (id) {
      this.bookService.remove(id).subscribe(() => {
        //this.books = this.books.filter(book => book.id !== id)
        this.getBooks()
      })
    }

  }

}
