import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  //сколько по времени отображается сообщение
  @Input() delay = 5000

  text: string
  type = 'success'
  unsub$ = new Subject();

  constructor(private alertServices: AlertService) { }

  ngOnInit(): void {
    this.alertServices.alert$.pipe(takeUntil(this.unsub$))
      .subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout( () => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
