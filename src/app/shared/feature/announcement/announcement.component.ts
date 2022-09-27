import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, switchMap, timer, map,filter, of, startWith, pairwise, tap, range, reduce, toArray, partition, Subject } from 'rxjs';
import { AnnouncementItemComponent } from '../../ui/announcement-item/announcement-item.component';
import { ViewChildren, QueryList } from '@angular/core';
import { concatMap, delay, mapTo, mergeMap, withLatestFrom } from 'rxjs/operators';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('cmp') components:QueryList<AnnouncementItemComponent>;
  public readonly announceMsgs:string[] = ['1.我','2.真','3.的','4.成','5.功','6.了','end'];
  public readonly displayAmount:number = 4;
  public readonly range = [...Array(this.isLoopingCondition ? this.displayAmount+1 : this.announceMsgs.length).keys()];  
  public readonly moveY:number = 20;
  private sub:SubSink = new SubSink();
  //目前顯示最後一筆資料index的指針
  private currLastPoint:number = this.displayAmount;

  get isLoopingCondition():boolean{
    return this.announceMsgs.length>this.displayAmount;
  }

  ngAfterViewInit(){
    if(!this.isLoopingCondition) return;

    const transitionCls ='transition-all';
    const components$ = of(this.components.toArray());
    const currentIndex$ = timer(0,1000).pipe(
      map(tick=> tick % this.displayAmount ),
      withLatestFrom(components$),
      concatMap(([tickInx,components])=>
         of(components).pipe(
          tap((components) =>{
            components.forEach( (x,inx)=>{
              if(!x.title) x.title = this.announceMsgs[inx];
              x.ref.nativeElement.classList.add(transitionCls);
              const toPos = +x.ref.nativeElement.style.top.replace('px','')-this.moveY;
              x.ref.nativeElement.style.top = `${toPos}px`;
              x.mark = toPos < 0;
            });
          }),
          //延遲0.5秒
          delay(500),
        )
      ),
      map(components=>components.find(x=>x.mark)),
      filter(Boolean),
      tap(()=>{
        //移動下一筆資料的指針
        if(++this.currLastPoint>=this.announceMsgs.length) this.currLastPoint = 0;
      }),
      tap(moveDownCom=>{
        //趁空擋，把多餘的往下放(針對高度來抓取定應資訊)
        moveDownCom.mark = false;
        const elem = moveDownCom.ref;
        elem.nativeElement.classList.remove(transitionCls);
        elem.nativeElement.style.top = `${this.displayAmount*this.moveY}px`;
        //更新顯示下一筆資料
        moveDownCom.title = this.announceMsgs[this.currLastPoint];
      })
    );
    this.sub.sink =currentIndex$.subscribe();
  }

  constructor() { }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}



 /*
  private elems$ = range(1,6).pipe(
    toArray(),
    map(elems=>elems.map(id=> document.getElementById(`elem${id}`)))
  )*/