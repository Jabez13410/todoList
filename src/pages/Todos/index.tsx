import { connect } from 'umi';
import styles from './index.less';
import AddTodo from '../AddTodo';
import IButton from '@/components/IButton';
import { requestDeleteTodoById, changeTodoStateById } from '@/models/todos/actions';
import { TodoState } from '@/models/todos/todos';

const Todos = (props, props1) => {
  const { todos, requestDeleteTodoById: onClickDelete, changeTodoStateById: onClickTodo } = props;
  return (
    <>
      <ul className={styles.list}>
        {todos.map((item) => (
          <li key={item.id} className={styles.item}>
            <section
              className={styles.left}
              onClick={() =>
                onClickTodo(
                  item.id,
                  item.state === TodoState.Todo ? TodoState.Finish : TodoState.Todo,
                )
              }
            >
              {/* 图标复制自https://remixicon.com */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z" />
                {item.state === TodoState.Finish ? (
                  <path
                    d="M21 2.992v18.016a1 1 0 0 1-.993.992H3.993A.993.993 0 0 1 3 21.008V2.992A1 1 0 0 1 3.993 2h16.014c.548 0 .993.444.993.992zM19 4H5v16h14V4zm-7.707 9.121l4.243-4.242 1.414 1.414-5.657 5.657-3.89-3.89 1.415-1.414 2.475 2.475z"
                    fill="rgba(231,76,60,1)"
                  />
                ) : (
                  <path
                    d="M21 2.992v18.016a1 1 0 0 1-.993.992H3.993A.993.993 0 0 1 3 21.008V2.992A1 1 0 0 1 3.993 2h16.014c.548 0 .993.444.993.992zM19 4H5v16h14V4zm-7.707 9.121l4.243-4.242 1.414 1.414-5.657 5.657-3.89-3.89 1.415-1.414 2.475 2.475z"
                    fill="rgba(50,152,219,1)"
                  />
                )}
              </svg>
              <span className={item.state === TodoState.Finish ? styles['finish-text'] : undefined}>
                {item.title}
              </span>
            </section>
            <IButton onClick={() => onClickDelete(item.id)} type="text">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </IButton>
          </li>
        ))}
      </ul>
      <AddTodo />
    </>
  );
};

const mSTP = (state, ownProps) => {
  // console.log('state', state);
  // console.log('ownProps',ownProps);
  return { ...state.todosModel };
};

export default connect(mSTP, { requestDeleteTodoById, changeTodoStateById })(Todos);
