import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/to2dos?_limit=10');

            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }

            const data = await response.json();
            return data;

        }catch(error){
            console.error(error);
            return rejectWithValue(error.message);
        }




    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
              id: new Date().toISOString(),
              title: action.payload.title,
              completed: false,
            });
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
                console.log('loading')
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
                console.log('succeeded')
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                console.log('failed')
            })
    }
});

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;