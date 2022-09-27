import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from "@angular/core";
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-token';

export interface DialogConfig<T> {
  data: T;
  name?:string
}

@Injectable({ 
    providedIn: 'root',
  })
export class DialogService{

    private waittingQueue:[];

    constructor(private overlay: Overlay, private injector: Injector){}
    

    public openDialog<T,C>(component:ComponentType<T>, dialogConfig?:DialogConfig<C>){

      //Step1 先進行overlay設定
      //產設定 - 位置設定比較長，先產出來
      const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
      
      //產設定 - 最終設定檔案
      const config:OverlayConfig = {
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'overlay-backdrop',
        panelClass: 'overlay-panel',
        scrollStrategy:this.overlay.scrollStrategies.block(),
      }

      //有了設定檔，才能接著產出OverlayRef，並且裝飾一下
      const overlayRef:OverlayRef = this.overlay.create(config);
      //Step2 - Overlay進行裝飾模式，衍生關閉的callback之類
      const dialogRef = new DialogRef(overlayRef);

      /* DI要怎麼做呢
        Injector內部有個Map在儲存對應的Ref. 因此要加入自己的ＤＩ，就是使用Injector.create( {自己的設定} )，就可以了。

        但由於我們資料不是Class, 因此他沒有實體，無法儲存，所以我們需要使用額外創一個InjectionToken作為儲存Key.
        provide中給予key(new InjectionToken<any>('DIALOG_DATA')創出來的), 然後ref的資料就用useValue就可以了。

        一個DI的設定檔案，總共有三個欄位。
        Providers, parent, name.
      */
        
      //Step3, 根據Overlay的資料，以及外部要傳入的data, 製作一份DI, 再注入給ComponentPortal, 這樣他才拿得到
      //創造injector去ref DialogRef, 新版要使用這一種格式製作
      const options = {
        providers: [
          { provide: DialogRef, useValue: dialogRef },
          //export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
          { provide: DIALOG_DATA, useValue: dialogConfig?.data }],
        parent: this.injector,
        name: dialogConfig?.name
      };
      const injector = Injector.create(options);

      //Step4 這邊把ＤＩ著入進去COmponent, 所以component可以拿到data, 也能拿到裝飾器提供的方法, new出我們真正的畫面Portal
      // 產出Portal(這個才是我們的畫面) Attach component portal to the overlay
      // 這個injector，就會把我們的DI provider相關資訊，丟進去我們的component construct中
      const portal = new ComponentPortal(component, null, injector);

      //把畫面加入到overlayRef中，並且註冊關閉事件的監聽
      overlayRef.attach(portal);
      overlayRef.backdropClick().subscribe(x=>{
        dialogRef.closed();
      })

      console.log("創造Dialog")

      return dialogRef;

    }


}