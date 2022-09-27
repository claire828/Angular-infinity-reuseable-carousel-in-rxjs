import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICommonState } from '../../../../shared/data-access/store/generic-state';
import { tasksFeatureKey } from "./task.reducer";
import { ITask } from '../../models/task.models';



export const getTasksState = createFeatureSelector<ICommonState<ITask[]>>(tasksFeatureKey);

export const getTasksLoading = createSelector(getTasksState, (s)=> s.status === 'loading');

export const getTasks = createSelector(getTasksState, (s)=> s.data);