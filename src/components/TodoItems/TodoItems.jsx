import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }


  const filteredBySearchItems = todoItems.filter((todoItem) => {
    return true;
  })


  const todoItemsElements = filteredBySearchItems.map((item) => {
    return (
      <TodoItem 
        key={item.id} 
        id={item.id} 
        title={item.title} 
        checked={item.isDone} 
      />
    );
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} />
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}