import React,{useContext} from 'react'
import { Route,Redirect } from 'react-router-dom';
import {AuthContext} from '../context/AuthProvider';

// checks agr login kr rkha to component pr jao vrkna login page pr
function PrivateRoute({component:Component,...rest}) {
    const {currentUser} = useContext(AuthContext);
    return (
       <Route {...rest} render={props=>{
           return currentUser?<Component {...props} />:<Redirect to='/login'/>
       }}/>
    )
}

export default PrivateRoute