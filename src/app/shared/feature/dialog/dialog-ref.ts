import { Subject, Observable } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

export class DialogRef{

    private afterClosedSubject = new Subject<any>();

    constructor(private overlayRef:OverlayRef ){}

    public closed(payload?:any){
        this.overlayRef.dispose();
        this.afterClosedSubject.next(payload);
        this.afterClosedSubject.complete();
    }

    public afterClosed():Observable<any>{
        return this.afterClosedSubject.asObservable();
    }
}