import React, {createContext, useContext, useReducer} from 'react'
import { appReducer } from './Reducer';

const Searches = createContext();

const Context = ({children}) => {
    //searches
    const cpbsearches = [];

    const [state, dispatch] = useReducer(appReducer,{
        cpbsearches: cpbsearches
    })

  return <Searches.Provider value={{state, dispatch}}>{children}</Searches.Provider>
}


export const AppState = () => {
    return useContext(Searches)
}

export default Context