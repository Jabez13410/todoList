import dayjs from 'dayjs';
export const dva = {
  config: {
    onAction:
      ({ getState, dispatch }) =>
      (next) =>
      (action) => {
        const prevState = getState();
        if (action.type === 'todosModel/changeTodoStateById' && action.payload.aimState === 1) {
          const {
            todosModel: { todos },
          } = prevState;
          //   const date = new Date();
          const now = dayjs();
          const changeTodo = todos.find((item) => item.id === action.payload.id);
          //   console.info(
          //     `${
          //       changeTodo.title
          //     } completed at ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          //   );
          const message = `${changeTodo.title} completed at ${now.format('YYYY-MM-DD HH:mm:ss')}`;
          console.groupCollapsed('开始打印', message);
          console.info(message);
          console.log('结束打印');

          console.groupEnd();
        }
        next(action);
        // const nextState = getState();
      },
  },
};
