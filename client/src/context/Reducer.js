export const appReducer = (state, action) => {
    switch (action.type) {
        case "INSERT_SEARCH_NOTIFICATION":
            return {
                ...state, 
                cpbsearches: [action.payload]
            }
        case "REMOVE_SEARCH_NOTIFICATION":
            return {
                ...state, 
                cpbsearches: []
            }
        default: 
            return state;
    }
}