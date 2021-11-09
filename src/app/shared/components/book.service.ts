import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, IBook, IGenre} from "./interface";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({providedIn: 'root'})
export class BookService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
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

  getGenres(): Observable<any[]> {
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

  getBooks(): Observable<IBook[]> {
    return this.http.get(`${environment.firebase.databaseURL}/books.json`)
      .pipe(map((response: { [key: string]: any }) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
      }))
  }
}


