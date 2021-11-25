import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {IBook} from "../../interfaces/bookInterface";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: IBook[] = []
  searchStr = '';
  isLoad = false;
  genres: { [key: string]: string } = {}

  constructor(
    private bookService: BookService,
    public auth: AuthService) {
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


  getBooks() {
    this.bookService.getBooks(this.searchStr).subscribe((books) => {
      this.isLoad = true
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

  searchBtn() {
    this.isLoad = false
    this.getBooks()
  }

}
