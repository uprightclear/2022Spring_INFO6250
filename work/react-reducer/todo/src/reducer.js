export const initialState = {
    error: '',
    username: '',
    todoLists: '',
    todo: '',
    refresh: false,
    theme: 'light',
    other: 'Jorts',
}

export function setErrorAction(error) {
    return {
        type: 'setError',
        error,
    };
}

export function setUsernameAction(username) {
    return {
        type: 'setUsername',
        username,
    };
}

export function setTodoListsAction(todoLists) {
    return {
        type: 'setTodoLists',
        todoLists,
    };
}

export function setTodoAction(todo) {
    return {
        type: 'setTodo',
        todo,
    };
}

export function setRefreshAction(refresh) {
    return {
        type: 'setRefresh',
        refresh,
    };
}

export function reducer(state, action) {
    switch(action.type) {
        case 'setError':
            return {
                ...state,
                error: action.error,
            }
        case 'setUsername':
            return {
                ...state,
                username: action.username,
            }
        case 'setTodoLists':
            return {
                ...state,
                todoLists: action.todoLists,
            }
        case 'setTodo':
            return {
                ...state,
                todo: action.todo,
            }
        case 'setRefresh':
            return {
                ...state,
                refresh: action.refresh,
            }
        default:
            throw Error(`unknown action: ${action.type}`, action);
    }
}