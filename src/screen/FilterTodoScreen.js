import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useSelector, useDispatch } from 'react-redux'
import { visibiltyFilters } from '../redux';
import { useFilter } from '../hooks';

const generateDataList = () => {
   let list = [];
   for (let p in visibiltyFilters) list.push({ txt: p });
   return list;
}

const ItemFilter = ({ item }) => {
   const { checked, onPress } = useFilter(item.txt);
   return (
      <TouchableOpacity
         style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
         onPress={() => onPress(item.txt)}
      >
         <Text style={{ fontSize: 20, paddingVertical: 10 }}>
            {item.txt.replace('_', ' ')}
         </Text>
         {checked && <Icon name="check" color="green" size={25} />}
      </TouchableOpacity>
   )
}
const FilterTodoScreen = () => {
   const _itemSeparator = () => <View style={{ height: 0.5, backgroundColor: 'rgba(0,0,0, .5)' }} />
   return (
      <FlatList
         data={generateDataList()}
         renderItem={({ item }) => <ItemFilter item={item}/>}
         ItemSeparatorComponent={_itemSeparator}
         keyExtractor={(item, i) => i.toString()}
      />
   )
}

export default FilterTodoScreen;