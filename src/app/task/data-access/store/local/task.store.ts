import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ITask } from '../../models/task.models';


interface ITaskState{
    tasks:ITask[]
}

@Injectable()
export class TaskStore extends ComponentStore<ITaskState> { 

    constructor(){
        super(<ITaskState>{});
    }


    
}