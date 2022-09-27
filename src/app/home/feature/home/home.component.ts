import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTasksLoading, getTasks } from '../../../task/data-access/store/global/task.selector';
import { loadTask, addTask } from '../../../task/data-access/store/global/task.action';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading$ = this.store.pipe(select(getTasksLoading));
  tasks$ = this.store.pipe(select(getTasks));

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadTask());

    this.tasks$.subscribe(x=>{
      console.log(`tasks:${JSON.stringify(x)}`)
    })
  }


  onClick(){
    this.store.dispatch(addTask({task:{
      id:uuid(),
      name:'test',
      complete:false
    }}))
  }
}
