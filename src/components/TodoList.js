import React from 'react';
import { View, Text, FlatList } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux'
// import { toggleTodoAction, deleteTodoAction, visibiltyFilters } from '../redux';
import TodoItem from './TodoItem';
import { useTodos } from '../hooks';

const TodoList = () => {
   const { todos, toggleTodo, deleteTodo } = useTodos();
   const _renderItem = ({ item }) => (
      <TodoItem
         todo={item}
         toggleTd={() => toggleTodo(item.id)}
         deleteTd={() => deleteTodo(item.id)}
      />
   )
   const _itemSeparator = () => (
      <View style={{ height: 0.5, backgroundColor: 'rgba(0,0,0,0.5)' }} />
   )
   const _listEmptyComp = () => (
      <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
         <Text style={{ fontSize: 20 }}>Todo is Empty</Text>
      </View>
   )
   return (
      <FlatList
         style={{ flex: 1, marginHorizontal: 15 }}
         data={todos}
         renderItem={_renderItem}
         ItemSeparatorComponent={_itemSeparator}
         ListEmptyComponent={_listEmptyComp}
         keyExtractor={item => item.id.toString()}
      />
   )
}

export default TodoList