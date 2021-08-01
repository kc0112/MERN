import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE  } from "./UserTypes";
import axios from 'axios'

// Action 1
export const fetchUsersRequest = ()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}

// Action 2
export const fetchUsersSuccess = (users)=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

// Action 3
export const fetchUsersFailure =(error)=>{
    return {
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

export const fetchUsers=()=>{
    return async (dispatch)=>{
        dispatch(fetchUsersRequest())
        try{
            let res = await axios.get('https://jsonplaceholder.typicode.com/users');
            let users = res.data;
            dispatch(fetchUsersSuccess(users))
        }
        catch(e)
        {
            let errorMsg = e.message;
            dispatch(fetchUsersFailure(errorMsg))
        }

    }
}