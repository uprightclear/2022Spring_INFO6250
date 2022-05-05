export function fetchAddTodo(task) {
    return fetch('/api/todos', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify( { task } ),
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchAddSurvey(course) {
    return fetch('/api/surveys', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify( { course } ),
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchDeleteTodo(id) {
    return fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchDeleteSurvey(id) {
    return fetch(`/api/surveys/${id}`, {
        method: 'DELETE',
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchUpdateTodo( id, todoUpdates ) {
    return fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify( todoUpdates ),
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchScoreRanking( id, score ) {
    return fetch(`/api/ranking/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify( score ),
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchTodos() {
    return fetch('/api/todos')
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchSurveys() {
    return fetch('/api/surveys')
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch( () => Promise.reject({ error: 'networkError' }) )
        .then( response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch( error => Promise.reject({ error }) )
                .then( err => Promise.reject(err) );
        });
}

export function fetchLogin(username) {
    return new Promise( (resolve) => {
        setTimeout(resolve, 2000);
    })
    .then(
        () => fetch('/api/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ username }),
        })
            .catch( () => Promise.reject({ error: 'networkError' }) )
            .then( response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json()
                    .catch( error => Promise.reject({ error }) )
                    .then( err => Promise.reject(err) );
            })
    )

}