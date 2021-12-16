import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/compat/database';

import {Observable} from 'rxjs';
import {FbCreateResponse, IBook, IGenre, IGenres} from '../interfaces/bookInterface';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class BookService {

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase) {
  }

  create(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(`${environment.firebase.databaseURL}/books.json`, book)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...book,
          id: response.name
        }
      }));
  }


  getGenres(): Observable<IGenres[]> {
    return this.db.list<IGenre>('genreList').snapshotChanges()
      .pipe(map((response) => {
        return response.map((genre) => {
          return {
            key: genre.payload.key,
            val: genre.payload.val()
          }
        })
      }))
  }

  getBooks(search: string): Observable<IBook[]> {
    return this.db.list<IBook>('books', (ref) => this.booksFilter(ref, search)).snapshotChanges()
      .pipe(map((response) => {
        return response.map((book) => {
          return {
            id: book.payload.key,
            ...book.payload.val()
          }
        })
      }))
  }

  booksFilter(ref: any, search = '') {
    if (search) {
      return ref.orderByChild('name').equalTo(search)
    }
    return ref
  }


  getById(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${environment.firebase.databaseURL}/books/${id}.json`)
  }

  update(book: IBook): Observable<IBook> {
    return this.http.patch<IBook>(`${environment.firebase.databaseURL}/books/${book.id}.json`, book)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebase.databaseURL}/books/${id}.json`)
  }
}


