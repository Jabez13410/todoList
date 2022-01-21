import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { v4 as uuidv4 } from 'uuid';
import { ADD_TODO_DELAY_TIME, DELETE_TODO_DELAY_TIME } from '@/constants';

export const NAME_SPACE = 'todosModel';
export enum FUNCTION_NAME {
  CHANGE_INPUT_VALUE = 'changeInputValue',
  REQUEST_ADD_TODO = 'requestAddTodo',
  REQUEST_DELETE_TODO_BY_ID = 'requestDeleteTodoById',

  ADD_TODO = 'addTodo',
  DELETE_TODO_BY_ID = 'deleteTodoById',
  CHANGE_TODO_STATE_BY_ID = 'changeTodoStateById',
}
export enum TodoState {
  Todo = 0,
  Finish = 1,
}
export interface AddTodoAction {
  type: `${FUNCTION_NAME.ADD_TODO}`;
  payload: { id: string };
}
export interface ChangeTodoStateByIdAction {
  type: `${FUNCTION_NAME.CHANGE_TODO_STATE_BY_ID}`;
  payload: { aimState: TodoState; id: string };
}

export interface DeleteTodoByIdAction {
  type: `${FUNCTION_NAME.DELETE_TODO_BY_ID}`;
  payload: { id: string };
}

export interface IndexModelState {
  todos: { id: string; title: string; state: TodoState }[];
  inputValue: string;
}

export interface IndexModelType {
  namespace: 'todosModel';
  state: IndexModelState;
  effects: {
    // query: Effect;
    [FUNCTION_NAME.REQUEST_ADD_TODO]: Effect;
    [FUNCTION_NAME.REQUEST_DELETE_TODO_BY_ID]: Effect;
  };
  reducers: {
    // save: Reducer<IndexModelState>;
    // save: ImmerReducer<IndexModelState>; // immer
    [FUNCTION_NAME.CHANGE_INPUT_VALUE]: ImmerReducer<IndexModelState>;
    [FUNCTION_NAME.ADD_TODO]: ImmerReducer<IndexModelState, AddTodoAction>;
    [FUNCTION_NAME.CHANGE_TODO_STATE_BY_ID]: ImmerReducer<
      IndexModelState,
      ChangeTodoStateByIdAction
    >;
    [FUNCTION_NAME.DELETE_TODO_BY_ID]: ImmerReducer<IndexModelState, DeleteTodoByIdAction>;
  };
}
const addTodo = (id: string) => ({
  type: `${FUNCTION_NAME.ADD_TODO}`,
  payload: { id },
});
const deleteTodoById = (id: string) => ({
  type: `${FUNCTION_NAME.DELETE_TODO_BY_ID}`,
  payload: { id },
});
const IndexModel: IndexModelType = {
  namespace: NAME_SPACE,
  state: {
    todos: [{ title: 'learn react' }, { title: 'Go shopping' }, { title: 'buy flowsers' }].map(
      (item) => ({ ...item, id: uuidv4(), state: TodoState.Todo }),
    ),
    inputValue: '',
  },
  effects: {
    *[FUNCTION_NAME.REQUEST_ADD_TODO](action, effects) {
      console.log('requestAddTodo', action);
      const { put } = effects;
      const todoId = yield new Promise((resolve) => {
        setTimeout(() => {
          resolve(uuidv4());
        }, ADD_TODO_DELAY_TIME);
      });
      yield put(addTodo(todoId));
    },
    *[FUNCTION_NAME.REQUEST_DELETE_TODO_BY_ID](action, { put, call }) {
      console.log('requestDeleteTodoById', action);
      const { id } = yield call(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(action.payload);
            }, DELETE_TODO_DELAY_TIME);
          }),
      );
      yield put(deleteTodoById(id));
    },
  },
  reducers: {
    // immer
    [FUNCTION_NAME.CHANGE_INPUT_VALUE](state, action) {
      console.log('changeInputValueReducer', state);
      console.log('changeInputValueReducer', action);
      state.inputValue = action.payload;
    },
    [FUNCTION_NAME.ADD_TODO](state, action) {
      console.log('addTodoReducer', state);
      console.log('addTodoReducer', action);
      state.todos.push({
        ...action.payload,
        title: state.inputValue,
        state: TodoState.Todo,
      });
    },
    [FUNCTION_NAME.CHANGE_TODO_STATE_BY_ID](state, action) {
      console.log('changeTodoStateReducer', action);
      const todoItem = state.todos.find((item) => item.id === action.payload.id);
      if (todoItem) todoItem.state = action.payload.aimState;
    },
    [FUNCTION_NAME.DELETE_TODO_BY_ID](state, action) {
      console.log('deleteTodoByIdReducer', action);
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },
  },
  //   subscriptions: {
  //     setup({ dispatch, history }) {
  //       console.log('setup');

  //       return history.listen(({ pathname }) => {
  //         if (pathname === '/') {
  //           dispatch({
  //             type: 'query',
  //           });
  //         }
  //       });
  //     },
  //   },
};

export default IndexModel;
