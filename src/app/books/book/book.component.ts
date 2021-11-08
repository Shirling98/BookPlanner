import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";

interface IBook {
  name: string
  author: string
  genre: string
  description: string
  read: boolean
  id?: number
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {


 /* genreList = [
    {genre: 'Психология'},
    {genre: 'Фантастика'},
    {genre: 'Детектив'}
  ]*/


  formBook!: FormGroup
  genreList: Observable<any>

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase) {
    //this.genre$= GenreService.getGenre();
    this.genreList = db.list('genreList').snapshotChanges()
    console.log(this.genreList)
  }

  ngOnInit(): void {
    this.formBook = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      read: [false, Validators.required],
    })
  }

  submit() {
    const formData: IBook = {...this.formBook.value}
    console.log('Данные с формы', formData)
    this.formBook.reset();
  }


}
