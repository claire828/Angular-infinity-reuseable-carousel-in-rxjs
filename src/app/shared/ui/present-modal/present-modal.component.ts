import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import {
    interval,
    BehaviorSubject,
    observable,
    Subject,
    distinctUntilChanged,
    takeUntil,
    pairwise,
    map,
    startWith,
    tap,
    concatMap,
    of,
    filter,
    switchMap,
    EMPTY,
    mergeMap,
    exhaustMap,
    Observable
} from 'rxjs';
import { Fade,FadeScale } from 'src/app/animations/animation.def';
import { DialogRef } from 'src/app/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/dialog/dialog-token';
import { IImgList } from '../../components/project-item/project-item.component';
import { state } from '@angular/animations';
import { delay } from 'rxjs';

@Component({
  selector: 'app-present-modal',
  templateUrl: './present-modal.component.html',
  styleUrls: ['./present-modal.component.scss'],
  animations:[Fade, FadeScale]
})
export class PresentModalComponent<T extends IImgList> implements OnInit, OnDestroy {

  private currentInx:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentInx$:Observable<number> = this.currentInx;
  finish$:Subject<void> = new Subject();
  currentImgPath:string;
  public animationStateOut:string;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data:T) { }


    ngOnInit(): void {
      this.currentInx.pipe(
         takeUntil(this.finish$),
         distinctUntilChanged(),
         startWith(0),
         pairwise(),
         map(([pre,curr])=> curr===pre ? "" : curr >= pre ? "next" : "pre" ),
         exhaustMap(state=>{
          this.animationStateOut = state;
          this.resetImgPath();
          return of(true);
        })
      ).subscribe()
    }

  /*
  ngOnInit(): void {
    this.currentInx.pipe(
       takeUntil(this.finish$),
       distinctUntilChanged(),
       startWith(0),
       pairwise(),
       map(([pre,curr])=> curr===pre ? "" : curr >= pre ? "next" : "pre" ),
       exhaustMap(state=>{
        if(this.animationStateOut) return of(false);
        this.animationStateOut = state;
        this.resetImgPath();
        return of(true);
      }),
      filter(inProcessing=>inProcessing),
      //每個Request都要依序完成, 會等前面的 Observable 結束後，才會「接續」(concat)新產生的 Observable 資料流
      concatMap(inProcessing => of(inProcessing).pipe(delay(300))),
      tap(()=> {this.animationStateOut = "";}
     ),
    ).subscribe()
  }*/

  onClose(){
    this.dialogRef.closed();
  }

  async setPageInx(i:number){
    let predictInx = this.currentInx.value + i;
  
    if(predictInx<0){
      this.currentInx.next(this.maxInx || 0);
    }
    else if(predictInx > this.maxInx){
      this.currentInx.next(0);
    }else{
      this.currentInx.next(predictInx);
    }
  }



  private resetImgPath(){
    this.currentImgPath = this.data?.imgList[this.currentInx.value] || "";
  }


  private get maxInx():number {return this.data.imgList.length && this.data.imgList.length-1}


  get totalAmount():number{return this.data?.imgList.length || 0}

  ngOnDestroy(): void {
    this.finish$.next();
    this.finish$.complete();
  }

}
