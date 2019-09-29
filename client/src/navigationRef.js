// used to trigger navigation from an action function
import { NavigationActions } from 'react-navigation';

let navigator; 

export const setNavigator = (nav) => {
    navigator = nav;
};

export const navigate = (routeName, params) => { 
    navigator.dispatch( 
        NavigationActions.navigate({
            routeName, 
            params
        })
    );
};