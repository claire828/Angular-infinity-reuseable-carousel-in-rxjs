import { distinctUntilChanged, debounceTime, Subscription } from 'rxjs';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumLimit]'
})
export class NumLimitDirective implements OnInit, OnDestroy {


  @Input('appMin')
  min:number=0;

  @Input('appMax')
  max:number = Number.MAX_SAFE_INTEGER;

  sub:Subscription;

  constructor(private control:NgControl) { }

  ngOnInit(): void {
   
    //ngcontrol 要搭配 reactiveFormModule才可以，並且要有ngmodule or ngcontrol
      this.sub = this.control.valueChanges!.pipe(
          debounceTime(300),
          distinctUntilChanged()
      ).subscribe(x=> this.onChange(x));
  }


  onChange(x:number){
    if(x && x > this.max) x= this.max;
    if(x && x < this.min) x= this.min;
    this.control.control?.setValue(x, {emitEvent:false})
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
