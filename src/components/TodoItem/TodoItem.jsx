import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox'
import {useDeleteTodoItem} from 'C:/Users/Dell/Desktop/weblab2/react-app/src/data/hooks/useData.js'

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
  `;
})

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

// на иконку удаление повесить обработчик, который будет вызывать confirm 
// если confirm = true - вызываем удаление по айдишнику
export const TodoItem = ({ id, title, checked }) => {
  const { mutate: deleteTodoItem } = useDeleteTodoItem();
  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteTodoItem(id);
    }
  };

  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} />
      <Title checked={checked}>
        {title}
      </Title>
      <Delete onClick={handleDelete} />
    </TodoItemContainer>
  );
};