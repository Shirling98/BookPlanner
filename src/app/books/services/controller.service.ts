import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ControllerService {


  //изменить на input
  //private _nameFilter$ = new BehaviorSubject<string>('Поиск');
  //readonly nameFilter$ = this._nameFilter$.asObservable();

  private _searchStr$ = new Subject<string>();
  searchStr$ = this._searchStr$.asObservable()

  constructor() {
  }

  search(str: string) {
    this._searchStr$.next(str)
  }

  // filterName(fName: string) {
  //   this._nameFilter$.next(fName);
  // }
}


