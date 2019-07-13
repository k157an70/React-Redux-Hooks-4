import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import all actions from redux
import {
   addTodoAction,
   changeNameTodoAction,
   updateTodoAction,
   deleteTodoAction,
   toggleTodoAction,
   setVisibleFilterAction
}from './redux';
// import from myselector
import {
   getCurrentFilterSelector,
   getVisibleMyTodosSelector,
   getTodoEditSelector
}from './selectors';

export const useFilter = filter => {
   const dispatch = useDispatch();
   const visiblityFilter = useSelector(
      state => getCurrentFilterSelector(state, filter)
   )
   const currentVisibiltyFilter = useMemo(() => visiblityFilter, [filter]);
   const onPress = useCallback( 
      filter => dispatch(setVisibleFilterAction(filter)),
      [dispatch]
   );

   return{
      checked : currentVisibiltyFilter,
      onPress
   }
}

export const useTodos = () => {
   const dispatch = useDispatch();
   const todos = useSelector(getVisibleMyTodosSelector, shallowEqual);
   const toggleTodo = useCallback( 
      id => dispatch(toggleTodoAction(id)),
      [dispatch]
   )
   const deleteTodo = useCallback( 
      id => dispatch(deleteTodoAction(id)),
      [dispatch]
   )

   return{
      todos,
      toggleTodo,
      deleteTodo
   }
}

export const useTodoAction = id => {
   const dispatch = useDispatch();
   const todoEdit = useSelector(
      state => getTodoEditSelector(state, id),
      shallowEqual
   )
   const name = useSelector(state => state.myTodos.name);
   
   const addTodo = useCallback(
       () => dispatch(addTodoAction()),
       [dispatch]
   );
   const updateTodo =  useCallback(
      id => dispatch(updateTodoAction(id)),
      [dispatch]
  );
  const onChangeName =  useCallback(
   txt => dispatch(changeNameTodoAction(txt)),
   [dispatch]
);

   return{
      todoEdit,
      name,
      addTodo,
      updateTodo,
      onChangeName
   }
}