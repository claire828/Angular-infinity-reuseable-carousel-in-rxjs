import { Subject, Subscription, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { Directive, ElementRef, Output, EventEmitter, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnDestroy {

  @Output() 
  appDebounceClick = new EventEmitter();

  //click:Subject<MouseEvent> = new Subject();
  finish$:Subject<void> = new Subject();

  constructor(elemRef:ElementRef) { 

    //這個是傳入pointEvent, 如果要MouseEvent做其他對應動作，就專注使用HostListener吧
    fromEvent(elemRef.nativeElement,'click')
    .pipe(
      takeUntil(this.finish$),
      debounceTime(300))
    .subscribe((x)=>{
      return this.appDebounceClick.emit(x);
    })
  }

  ngOnDestroy(): void {
    this.finish$.next();
    this.finish$.complete();
  }



  /*
  ngOnInit(): void {
    this.sub = this.click.pipe(debounceTime(300)).subscribe(x=>{
      return this.appDebounceClick.emit(x);
    });
  }

  @HostListener('click', ['$event'])
  onClick(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.click.next(event);
  }
  */
}
