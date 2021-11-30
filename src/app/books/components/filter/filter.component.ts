import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() nameFilter: string = ''
  @Output() filterBook: EventEmitter<string> = new EventEmitter<string>()

  searchStr = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  searchBtn() {
    this.filterBook.emit(this.searchStr)
    this.searchStr = ''
  }
}
