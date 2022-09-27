import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTasks } from '../../data-access/store/global/task.selector';
import { deleteTasks } from '../../data-access/store/global/task.action';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  task$ = this.store.select(getTasks);
  constructor(private store:Store) { }

  ngOnInit(): void {
    
  }




  deleteAll(){
    this.store.dispatch(deleteTasks());
  
    /*
    from(this.task$).pipe(
      map(tasks=> tasks.map(value=> {
        return value})
      ),
        concatMap( (tasks)=> from(tasks).pipe(
          delay(1000),
          tap(
            task=> {
              console.log("...")
              this.store.dispatch(deleteTask({id:task.id}));}
            )
      ) )
    )*/
  }



}
