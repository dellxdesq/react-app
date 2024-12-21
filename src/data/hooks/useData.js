import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

  //подключить хук мутации, вызвать метод из LS по удалению элемента
  //Обновить данные в RQ по ключу
export const useDeleteTodoItem = () => {
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (todoItemId) => LocalStorage.deleteTodoItemFromLocalStorage(todoItemId),
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return { mutate };
}