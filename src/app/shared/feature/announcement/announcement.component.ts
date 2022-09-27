import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { timer, map,filter, of, tap} from 'rxjs';
import { AnnouncementItemComponent } from '../../ui/announcement-item/announcement-item.component';
import { ViewChildren, QueryList } from '@angular/core';
import { concatMap, delay } from 'rxjs/operators';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('cmp') components:QueryList<AnnouncementItemComponent>;
  public readonly announceMsgs:string[] = ['1.this','2.is','3.just','4.an','5.example','6.','7.','8', '9','end'];
  public readonly displayAmount:number = 5;
  public readonly range = [...Array(this.isLoopingCondition ? this.displayAmount+1 : this.announceMsgs.length).keys()];  
  public readonly moveY:number = 20;
  public readonly scrollContentH = this.displayAmount * this.moveY;
  public readonly unit = 'px';
  private sub:SubSink = new SubSink();
  //目前顯示最後一筆資料index的指針
  private currLastPoint:number = this.displayAmount;

  //only looping according to the condition
  get isLoopingCondition():boolean{
    return this.announceMsgs.length>this.displayAmount;
  }

  ngAfterViewInit(){
    if(!this.isLoopingCondition) return;

    const transitionCls ='transition-all';
    const components$ = of(this.components.toArray());
    const currentIndex$ = timer(1000,1000).pipe(
      map(tick=> tick % this.displayAmount ),
      concatMap(()=>
        components$.pipe(
          tap((components) =>{
            components.forEach( (x,inx)=>{
              if(!x.title) x.title = this.announceMsgs[inx];
              x.ref.nativeElement.classList.add(transitionCls);
              const toPos = +x.ref.nativeElement.style.top.replace(this.unit,'')-this.moveY;
              x.ref.nativeElement.style.top = `${toPos}${this.unit}`;
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
        elem.nativeElement.style.top = `${this.displayAmount*this.moveY}${this.unit}`;
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
