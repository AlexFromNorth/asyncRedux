import { useDispatch } from 'react-redux';
import {toggleComplete, removeTodo, deleteTodo} from '../store/todoSlice';

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch(toggleComplete({ id }))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
    </li>
  );
};

export default TodoItem;
