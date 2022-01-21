import { connect } from 'umi';
import IButton from '@/components/IButton';
import styles from './index.less';
import { changeInputValue, requestAddTodo } from '@/models/todos/actions';

interface Props {
  inputValue: string;
  changeInputValue: any;
  requestAddTodo: any;
}
const AddTodo = (props: Props, props1) => {
  // console.log('AddTodoProps', props);
  // console.log('AddTodoProps1', props1);
  const { inputValue, changeInputValue: onInputChange, requestAddTodo: onClickAdd } = props;
  return (
    <div className={styles['add-todo-wrapper']}>
      <input
        value={inputValue}
        className={styles.input}
        placeholder="add a new todo..."
        onChange={(e) => onInputChange(e.target.value)}
      />
      <IButton disabled={inputValue.length === 0} onClick={onClickAdd}>
        Add
      </IButton>
    </div>
  );
};
const mSTP = (state, ownProps) => {
  // console.log('AddTodoState', state);
  // console.log('AddTodoownProps', ownProps);
  return { ...state.todosModel };
};
export default connect(mSTP, { changeInputValue, requestAddTodo })(AddTodo);
