import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, ChangeDetectorRef, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-announcement-item',
  templateUrl: './announcement-item.component.html',
  styleUrls: ['./announcement-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AnnouncementItemComponent implements OnInit {
  @ViewChild('elem') elem:ElementRef<HTMLHtmlElement>;

  private _task:BehaviorSubject<string> = new BehaviorSubject<string>('');
  task$ = this._task.asObservable();
  get title():string{return this._task.value;}
  set title(str:string){
    this._task.next(str);
  }

  public mark:boolean = false;

  constructor(public ref: ElementRef<HTMLHtmlElement>, public cdr:ChangeDetectorRef) { 
    //內部高度都是0
    //console.log(`ref:${this.ref.nativeElement.getBoundingClientRect().y}`)
  }

  ngOnInit(): void {
  }

}
