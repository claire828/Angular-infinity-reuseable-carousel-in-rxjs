import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { merge, fromEvent, filter, map, pluck, tap, throttleTime, zip, mapTo } from 'rxjs';
import { SubSink } from 'subsink';
import { ITask } from '../../data-access/models/task.models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task:ITask;
  @Output() removeTask:EventEmitter<ITask> = new EventEmitter();
  @Output() editTask:EventEmitter<ITask> = new EventEmitter();

  @ViewChild('edit') editElm:ElementRef<HTMLInputElement>;
  @ViewChild('check') checkElm:ElementRef<HTMLInputElement>;
  @ViewChild('main') mainElm:ElementRef<HTMLHtmlElement>;

  isEditMode:boolean;
  isMouseOver:boolean;

  private subs:SubSink = new SubSink();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.subs.sink = merge(
      //Event類型要給，才知道是什麼
      fromEvent<KeyboardEvent>(this.editElm.nativeElement, 'keypress').pipe(
        filter(x=>x.key === 'Enter'),
        map(()=>this.editElm.nativeElement.value),
        tap(()=>this.finishEdit()),
        filter(Boolean),
        map(x=> {
          return{
            ...this.task,
            name:x,
          }
        })
      ),
      fromEvent<FocusEvent>(this.editElm.nativeElement, 'focusout').pipe(
        map(()=>this.editElm.nativeElement.value),
        tap(()=>this.finishEdit()),
        filter(Boolean),
        map(x=> {
          return{
            ...this.task,
            name:x,
          }
        })
      ),
      fromEvent<MouseEvent>(this.checkElm.nativeElement,'click').pipe(
        tap(()=>this.finishEdit()),
        map(()=> {
          return{
            ...this.task,
            complete:!this.task.complete
          }
        })
      )
    ).pipe(
      filter(x=>x.name !== this.task.name || x.complete !==this.task.complete),
      throttleTime(300),
      tap(afterEdit=>this.editTask.emit(afterEdit))
    ).subscribe();
    

  }

  startEdit(){
    this.isEditMode = true;
    this.editElm.nativeElement.focus();
  }
  finishEdit(){
    this.isEditMode = false;
  }
  
  onClick(){
    if(!this.task) return;
    this.removeTask.emit(this.task);
  }


  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  get defaultInput():string{ 
    return this.isEditMode ? this.task.name : '';
   }


}

