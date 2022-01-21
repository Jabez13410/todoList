import { NAME_SPACE, FUNCTION_NAME } from './todos';
import type { TodoState } from './todos';

export const changeInputValue = (payload: string) => ({
  type: `${NAME_SPACE}/${FUNCTION_NAME.CHANGE_INPUT_VALUE}`,
  payload,
});
export const requestAddTodo = () => ({
  type: `${NAME_SPACE}/${FUNCTION_NAME.REQUEST_ADD_TODO}`,
});
export const requestDeleteTodoById = (id: string) => ({
  type: `${NAME_SPACE}/${FUNCTION_NAME.REQUEST_DELETE_TODO_BY_ID}`,
  payload: { id },
});
export const changeTodoStateById = (id: string, aimState: TodoState) => ({
  type: `${NAME_SPACE}/${FUNCTION_NAME.CHANGE_TODO_STATE_BY_ID}`,
  payload: { id, aimState },
});
