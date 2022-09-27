//TODO Reducer也是export const xx = createReducer( initState, ...on() )

import { createReducer, on } from "@ngrx/store";
import { loadTask, loadTaskSuccess, loadTaskFail, addTask, addTaskSuccess, addTaskFail, deleteTask, editTask, editTaskSuccess, deleteTaskSuccess, deleteTasksSuccess } from './task.action';
import { ICommonState } from '../../../../shared/data-access/store/generic-state';
import { ITask } from "../../models/task.models";

export const tasksFeatureKey = 'tasks';


//定義Default model資料
const initState:ICommonState<ITask[]> ={
    data: [],
    error: null,
    status: 'pending' 
} 

//只要export const 自己的reducer by createReducer
export const taskReducer = createReducer(
    initState,


    on(loadTask,(state)=>({
        ...state,
        status:'loading'
    })),
    //只有成功才會加入資料
    on(loadTaskSuccess, (state, {tasks})=>({
        ...state,
        status:'success',
        data:tasks
    }) ),
    on(loadTaskFail, (state, {error})=>({
        ...state,
        status:'error',
        error
    })),



    on(addTask, (state, {task}) =>({
        ...state,
        status:'loading',
     })),

     //只有成功才會加入資料
     on(addTaskSuccess, (state, {task}) =>({
        ...state,
        status:'success',
        data:[...state.data, task]
     })),

     on(addTaskFail, (state,{error})=>({
         ...state,
         status:'error',
     })),


     //修改

     on(editTask,(state, {task})=>({
        ...state,
        status:'loading',
    })),

     on(editTaskSuccess,(state, {task})=>
        {
            let data = state.data.map(x=> {
                return x.id === task.id ? task : x;
            })
            return {
                ...state,
                status:'success',
                data
            }
        }
    ),


        //刪除
    on(deleteTask,(state, {id})=>({
        ...state,
        status:'loading',
    })),

     on(deleteTaskSuccess,(state, {id})=>
        {
            let data = state.data.filter(x=>x.id !== id);
            return {
                ...state,
                status:'success',
                data
            }
        }
    ),


    on(deleteTasksSuccess,(state)=>
    {
        return {
            ...state,
            status:'success',
        }
    }
),


)