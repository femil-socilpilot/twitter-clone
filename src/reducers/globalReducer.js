const initialState = []

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'value':
            return [...state]
        default:
            return [...state]
    }
}