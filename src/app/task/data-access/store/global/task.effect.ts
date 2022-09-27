//TODO Effect終於是Class啦！ Inject要給provideIn

import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY, forkJoin, from, Observable, of } from "rxjs";
import { loadTask, loadTaskSuccess, addTask, addTaskSuccess, editTask, editTaskSuccess, deleteTask, deleteTaskSuccess, deleteTasks, deleteTasksSuccess } from './task.action';
import { TaskApiService } from '../../api/task-api';
//TODO 記得這個一定要抓'rxjs/operators'; 原本只抓rxjs就錯了:/
import { catchError, map, mergeMap,tap,switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from "@ngrx/store";
import { getTasks } from './task.selector';

@Injectable({ providedIn: 'root' })
export class TaskEffect {

    constructor(private action$: Actions, private taskAPI: TaskApiService, private store:Store) { }

    loadTasks$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadTask),
            mergeMap(() =>
                this.taskAPI.getAllTasks().pipe(
                    map((tasks) => 
                        loadTaskSuccess({tasks})
                    ),
                    catchError(() => EMPTY)
                )
            )
        )
    );


//TODO 注意～Effect內部不要用{}
    addTask$ = createEffect(()=>
        this.action$.pipe(
            ofType(addTask),
           // withLatestFrom(this.store.pipe(select(getPlaylistTracksState))),
            mergeMap( ({task})=>
                this.taskAPI.addTask(task).pipe(
                    map(() => 
                        addTaskSuccess({task})
                    ),
                    catchError(() => EMPTY)
                )
             )
        )
    )



    editTask$ = createEffect(()=> this.action$.pipe(
        ofType(editTask),
        mergeMap(  ({task})=>
            this.taskAPI.editTask(task).pipe(
                map(()=> editTaskSuccess({task})),
                catchError(()=>EMPTY)
            )
        )
    ))


    deleteTask$ = createEffect(()=> this.action$.pipe(
        ofType(deleteTask),
        mergeMap(  ({id})=>
            this.taskAPI.removeTask(id).pipe(
                map(()=> deleteTaskSuccess({id})),
                catchError(()=>EMPTY)
            )
        )
    ))



   //@returns — If EffectConfig#dispatch is true, returns Observable<Action>. Else, returns Observable<unknown>.
    test$ = createEffect( ()=> this.action$.pipe(
        ofType(editTask),
        withLatestFrom(this.store.select(getTasks)),
    ),{ dispatch: false })


   /* deleteTasks2$ = createEffect( ()=> this.action$.pipe(
        ofType(deleteTasks),
        withLatestFrom(this.store.pipe(select(getTasks))),
        tap(([_,tasks])=> tasks.forEach( task=> this.store.dispatch(deleteTask({id:task.id}))) ),
        switchMap( ([_,tasks],inx)=> 
            this.taskAPI.removeTask("1").pipe(
                    map(()=> deleteTaskSuccess({id:""})),
                    catchError(()=>EMPTY)
                )
            ) 
        )
    )*/


    deleteTasks$ = createEffect( ()=> this.action$.pipe(
        ofType(deleteTasks),
        withLatestFrom(this.store.pipe(select(getTasks))),
        tap(([_,tasks])=> tasks.forEach( task=> this.store.dispatch(deleteTask({id:task.id}))) ),
        map(()=>deleteTasksSuccess())
    ))

    

}
