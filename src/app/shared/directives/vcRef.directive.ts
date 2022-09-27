import { ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Directive, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[vcRefDirective]'
})
export class VCRefDirective{
    constructor(public vcRef: ViewContainerRef){}

    public createComponent<T>(component:ComponentType<T>):ComponentRef<T>{
      const ref = this.vcRef.createComponent(component);
      return ref;
    }
}



export interface DynamicComponentInterface<T>{
  payload:T;
}

export type ConfigType = {
  what:string
}

