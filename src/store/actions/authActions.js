// Without Thunk:
// export const actionName = (param) => {
//     return {
//         type: 'ACTION_NAME',
//         payload: param
//     }
// }

// export const actionName = (param) => {
//     return (dispatch, getState) => {
//         // Make Async call
        
//         // Pausing the dispatch
//         dispatch({
//             type: 'ACTION_NAME',
//             payload: param
//         })
//     }
// }

export const register = (data) => {
    return (dispatch, getState) => {
        // Make Async call
        console.log(data);
        // Pausing the dispatch
        dispatch({
            type: 'ACTION_NAME',
            payload: data
        })
    }
}