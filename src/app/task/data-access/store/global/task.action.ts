//TODO Action不需要主Class, 而是放置需要的Actions類型 => export const ActionName = createAction( typeName, props<{}>)
//Action中的prop只要給，需要額外傳入的資訊即可。 而不用所有Reduce一大包，除非你真的需要才這樣做，
import { createAction, props } from "@ngrx/store";
import { ITask } from '../../models/task.models';


//注意，像是要取得資料，就要有一整套set! 
//Status -> loading, success, fail
//注意！ Props<>內部obj一定要有key:Interface, 最後還要()才可以喔
export const loadTask = createAction( '[Task Page/loadTask]');
export const loadTaskSuccess = createAction( '[Task Page/loadTaskSuccess]', props<{tasks:ITask[]}>());
export const loadTaskFail = createAction( '[Task Page/loadTaskFail]', props<{error:string}>());


//Effect執行加入
export const addTask = createAction('[Task Page/addTask]', props<{task:ITask}>());
export const addTaskSuccess = createAction('[Task Page/addTaskSuccess]', props<{task:ITask}>());
export const addTaskFail = createAction('[Task Page/addTaskFail]', props<{error:string}>());


//Edit
export const editTask = createAction('[Task Page/editTask]', props<{task:ITask}>());
export const editTaskSuccess = createAction('[Task Page/editTaskSuccess]',props<{task:ITask}>());
export const editTaskFail = createAction('[Task Page/editTaskFail]', props<{error:string}>());


//Remove
export const deleteTask = createAction('[Task Page/deleteTask]',props<{id:string}>());
export const deleteTaskSuccess = createAction('[Task Page/deleteTaskSuccess]',props<{id:string}>());
export const deleteTaskFail = createAction('[Task Page/deleteTaskFail]', props<{error:string}>());



export const deleteTasks = createAction('[Task Page/deleteTasks]');
export const deleteTasksSuccess = createAction('[Task Page/deleteTasksSuccess]');
export const deleteTasksFail = createAction('[Task Page/deleteTasksFail]', props<{error:string}>());

