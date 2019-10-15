const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTION_NAME':
            console.log(action.payload)
    }
    return state;
}

export default authReducer;