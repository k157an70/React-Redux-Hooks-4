import React, { useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useTodoAction }from '../hooks';

const MyInput = ({ name, onChangeName }) => {
   return (
      <TextInput
         value={name}
         onChangeText={val => onChangeName(val)}
         placeholder={'Name of Todo'}
         underlineColorAndroid={'darkblue'}
         style={{ paddingHorizontal: 10, fontSize: 25 }}
      />
   )
}
const AddTodoScreen = ({ navigation }) => {
   const id = navigation.getParam('id', null);
   const {
      todoEdit,
      name,
      addTodo,
      updateTodo,
      onChangeName
   }= useTodoAction(id);

   useEffect(() => {
      id && onChangeName(todoEdit.name);
      return () => {
         onChangeName('');
      }
   }, [])

   return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
         <MyInput name={name} onChangeName={onChangeName} />
         <Button
            title={id ? 'UPDATE' : 'SAVE'}
            onPress={() => {
               if(id){
                  updateTodo(id)
               }else{
                  addTodo()
               }
               navigation.navigate('HOME_NAV')
            }}
      />
      </View>
   )
}

AddTodoScreen.navigationOptions = ({ navigation }) => {
   const isAdd = navigation.getParam('isAdd', false);
   const title = (isAdd ? 'ADD' : 'EDIT') + ' TODO';
   return {
      title
   }
}

export default AddTodoScreen;