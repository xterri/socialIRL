/*
** ReUsable component to create new Data Contexts
**
** May want to revamp and see if we can use Redux or Mobx instead?
*/

import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};

        for (let key in actions){ 
            boundActions[key] = actions[key](dispatch);
        };

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                { children }
            </Context.Provider>
        );
    };

    return { Context, Provider }; 
};