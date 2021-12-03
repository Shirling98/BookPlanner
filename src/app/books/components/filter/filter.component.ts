import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ISearch} from '../../interfaces/bookInterface';
import {ControllerService} from '../../services/controller.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

 // @Input() nameFilter: string = ''
 // @Output() filterBook: EventEmitter<string> = new EventEmitter<string>()

  formFilter: FormGroup;
  fName: string;
  str: string;

  constructor(
    private formBuilder: FormBuilder,
    private cs: ControllerService) {
  }

  ngOnInit(): void {
    this.formFilter = this.formBuilder.group({
      searchStr: ['']
    })
  }

  get filterTitle() {
    return this.cs.nameFilter$
  }

  searchBtn() {
    const searchStr: ISearch = {...this.formFilter.value}
    this.cs.search(searchStr.searchStr)

    // this.filterBook.emit(searchStr.searchStr)
  }
}
