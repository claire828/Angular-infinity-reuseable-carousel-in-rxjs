import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter,  fromEvent, merge, map, throttleTime ,tap, mergeMap} from 'rxjs';
import { SubSink } from 'subsink';
import { addTask } from '../../data-access/store/global/task.action';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('headerInput') headerInput:ElementRef<HTMLInputElement>;
  @ViewChild('enterBtn') enterBtn:ElementRef;

  private subs:SubSink = new SubSink();
  constructor(private store:Store) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
     //如果Input Enter & btnClick=>代表加入任務
     this.subs.sink = merge(
      fromEvent<MouseEvent>(this.enterBtn.nativeElement,'click'),
      fromEvent<KeyboardEvent>(this.headerInput.nativeElement,'keypress')
      .pipe(
        filter(x=> x.key === "Enter" ))
    ).pipe(
      //把input的值抓出來並確認有資訊
      map(()=> this.headerInput.nativeElement.value),
      filter(Boolean),
      throttleTime(300),
      tap(x=>{
        this.store.dispatch(addTask(
          {
            task:{
            id:uuid(),
            name:x,
            complete:false
            }
          })
        )
        this.headerInput.nativeElement.value = "";
      })
    ).subscribe(x=>console.log(x))
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
