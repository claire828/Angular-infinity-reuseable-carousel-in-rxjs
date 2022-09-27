//API這個就是Service

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITask } from '../models/task.models';
import { shareReplay } from "rxjs";


const httpOptions: Object = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
@Injectable({providedIn:'root'})
export class TaskApiService{

    private apiUrl: string = 'http://localhost:3000/tasks';
    constructor(private http:HttpClient){}

    getAllTasks(){
        return this.http.get<ITask[]>(this.apiUrl).pipe(shareReplay());
    }


    addTask(task:ITask){
        console.log(`add:${JSON.stringify(task)}`)
        return this.http.post<ITask>(this.apiUrl, task, httpOptions).pipe(shareReplay());
    }

    editTask(task:ITask){
        console.log(`edit:${JSON.stringify(task)}`)
        return this.http.put<ITask>(`${this.apiUrl}/${task.id}`, task, httpOptions);
    }


    removeTask(id: string) {
        return this.http.delete<ITask>(`${this.apiUrl}/${id}`);
      }


   /* updateTasks(tasks: Task[]): void {
        from(tasks)
          .pipe(concatMap((task) => this.putTask(task)))
          .subscribe(() => this.dataService.updateTasks(tasks));
      }*/
}