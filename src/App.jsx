import {useEffect, useState} from 'react';

import { addTodo, fetchTodos } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';
import { useDispatch } from 'react-redux';


function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAction = () => {
    if(text.trim().length) {
      dispatch(addTodo({text}));
      setText('');
    }
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])

  return (
    <div className='App'>123
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      <TodoList />
    </div>
  );
}

export default App;
