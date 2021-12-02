import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private nameFilter = new BehaviorSubject<string>("Поиск по наименованию книги");
  fName = this.nameFilter.asObservable();

  constructor() { }

  filterName(fName: string) {
    this.nameFilter.next(fName);
  }

}


