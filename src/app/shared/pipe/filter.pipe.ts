import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: string[], startWith: string): unknown {
    let temp:string[] = [];
    temp = arr.filter(x=>x.startsWith(startWith));
    return temp;
  }



}

//example:
/*
<div class="card">
      <div class="card-body">
        <h4 class="card-title">Custom Pipe</h4>
        <div class="form-group">
          這邊是input, #startWith=> 此elem的input value
          <input type="text" class="form-control" placeholder="Enter Search String..." #startWith>
        </div>

        <ul class="list-group">
          將這個filter pipe帶入過濾的參數值，針對陣列處理，所以剩下的陣列就是少數的
          <li class="list-group-item" *ngFor="let l of languages | filter : startWith.value">{{l}}</li>
        </ul>
      </div>
*/