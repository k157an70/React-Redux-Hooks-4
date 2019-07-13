import { createSelector } from 'reselect';
import { visibiltyFilters } from './redux'

const getAllTodos = state => state.myTodos.todos;
const getFilter = state => state.filter;

// create selector current filter
export const getCurrentFilterSelector = createSelector(
   getFilter,
   (_, filter) => filter,
   (_gf, _f) => _gf === _f// return true or false
);

// getcompleted selector todos
const getCompletedMyTodosSelector = createSelector(
   getAllTodos,
   _todos => _todos.filter(t => t.completed)
);
// getActive selector todos
const getActiveMyTodosSelector = createSelector(
   getAllTodos,
   _todos => _todos.filter(t => !t.completed)
);
// filter todos
export const getVisibleMyTodosSelector = createSelector(
   getFilter,
   getAllTodos,
   getCompletedMyTodosSelector,
   getActiveMyTodosSelector,
   (_filter, _todos, _todosComp, _todosAct ) => {
      switch(_filter){
         case visibiltyFilters.SHOW_ACTIVE:
            return _todosAct
         case visibiltyFilters.SHOW_COMPLETED:
            return _todosComp
         case visibiltyFilters.SHOW_ALL:
           return _todos
         default:
            alert('filter undefined');
            return _todos;
      }
   }
)
// get edit todos
export const getTodoEditSelector = createSelector(
   getAllTodos,
   (_, id) => id,
   (_todos, _id) => _todos.find(t => t.id === _id)
)