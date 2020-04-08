export const initialState={
    date : false,
    isCleared : false,
    todos : [],
}

export const ADD_TODO = 'ADD_TODO';
export const CHECK_TODO = 'CHECK_TODO';

export const LOAD_TODOS = 'LOAD_TODOS';
export const ADD_DUMMY = 'ADD_DUMMY';

export const EDIT_TODO = 'EDIT_TODO';

export const editTodoAction = {
    type: EDIT_TODO,
    data: {
        todoId: 1,
        content: '수정된 투두'
    }
}


export const checkTodoAction = {
    type: CHECK_TODO,
    data: {
        todoId: 3
    }
}

export const addTodoAction = {
    type: ADD_DUMMY,
    data: {todoId: 1, content: '밥먹기', checked: false, User: {userId:1}}
}

export const loadTodosAction = {
    type: LOAD_TODOS,
    data: {
        date: '2020-04-06',
        isCleared: false,
        todos: [
            {todoId: 0, content: '밥먹기', checked: false, User: {userId:1}},
            {todoId: 1, content: '숙제하기', checked: true, User: {userId:1}},
            {todoId: 3, content: '숙면', checked: false, User: {userId:1}},
        ]
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, action.data]
            }
        }
        case CHECK_TODO: {
            const todoIndex = state.todos.findIndex(v=>v.todoId===action.data.todoId);
            const todos = [...state.todos];
            todos[todoIndex].checked = !(todos[todoIndex].checked);
            return {
                ...state,
                todos,
            }
        }
        case LOAD_TODOS: {
            return {
                ...state,
                date: action.data.date,
                isCleared: action.data.isCleared,
                todos: action.data.todos,
            }
        }
        case ADD_DUMMY: {
            return {
                ...state,
                todos: [...state.todos, action.data]
            }
        }
        case EDIT_TODO: {
            const todoIndex = state.todos.findIndex(v=>v.todoId===action.data.todoId);
            const todos = [...state.todos];
            todos[todoIndex].content = action.data.content;
            return {
                ...state,
                todos,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;