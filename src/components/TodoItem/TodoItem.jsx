import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox'
import {useDeleteTodoItem} from 'C:/Users/Dell/Desktop/weblab2/react-app/src/data/hooks/useData.js'
import {useToggleTodoItem} from 'C:/Users/Dell/Desktop/weblab2/react-app/src/data/hooks/useData.js'

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const TitleContainer = styled.div`
  flex: 1; 
  padding: 0 10px; 
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 15px;
  ${props => (props.isDone ? checkedCss : "")};
  white-space: pre-wrap;
  word-break: break-word; 
  line-height: 1.5;
`;

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;
export const TodoItem = ({ id, title, isDone }) => {
  const { mutate: deleteTodoItem } = useDeleteTodoItem();
  const { mutate: toggleTodoItem } = useToggleTodoItem();

  const handleCheckboxClick = () => {
    toggleTodoItem(id); 
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteTodoItem(id);
    }
  };

  return (
    <TodoItemContainer>
       <TodoItemCheckbox checked={isDone} onClick={handleCheckboxClick} />
      <TitleContainer>
        <Title checked={isDone}>{title}</Title>
      </TitleContainer>
      <Delete onClick={handleDelete} />
    </TodoItemContainer>
  );
};