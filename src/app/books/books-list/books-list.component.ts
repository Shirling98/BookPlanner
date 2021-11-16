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
  searchStr = '';
  isLoad = false;
  genres: { [key: string]: string } = {}

  constructor(
    private bookService: BookService) {
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
