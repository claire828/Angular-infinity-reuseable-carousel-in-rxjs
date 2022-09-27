import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTasks } from '../../data-access/store/global/task.selector';
import { ITask } from '../../data-access/models/task.models';
import { deleteTask, editTask } from '../../data-access/store/global/task.action';
import { delay, Observable, of, observable, merge, concatMap, forkJoin ,mergeMap, tap, switchMap, from} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  tasks$ = this.store.select(getTasks);

  private test = (param:string, sec:number)=> {
    return of(param)
          .pipe( 
            tap(x=>console.log(`==exe:${x}`)),
            delay(sec*1000)
          )
  }

  constructor(private store:Store) { }

  ngOnInit(): void {
/*
    console.log("==start==")

    const testPayload = [this.test('1',3), this.test('2',1), this.test('3',2)];

    forkJoin(testPayload).subscribe(x=>{
      console.log(`emit:${x}`)
    })
*/
    
    /*
       1) forkJoin only = await Promiss.all( ...)  //沒有順序
       2) from + concatMap = 有順序的，執行完才會往下. exe1->await 1 -> exe2->await 2 -> ...
       3) from + mergeMap = 沒有順序的，先回來的先做, exe1 + 2 + 3 => result....
   
    from(testPayload).pipe(
      concatMap(x=> {console.log(`see:${x}`); return x;})
    ).subscribe(x=>{
      console.log(`emit:${x}`)
    })*/

    
  }

  onRemoveTask(task:ITask){
    this.store.dispatch(deleteTask({id:task.id}))
  }
  
  onEditTask(task:ITask){
    this.store.dispatch(editTask({task}))
  }
}
