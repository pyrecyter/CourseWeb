import axios from 'axios';
import { setAlert } from './alert';


import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

//GET current user 

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res  = await axios.get('/api/adminprofile/me');

         dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg: error.response.statusText, status: error.response.status}
        })
    }
};
// create or update 

export const createProfile = (formData, history, edit = false ) => async dispatch =>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const res = await axios.post('/api/adminprofile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload : res.data
        });

        dispatch(setAlert(edit ? 'Profile Updates':'Profile Created', 'success'));

        if(!edit){
            history.push('/profiledashoard');
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(error =>dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg: error.response.statusText, status: error.response.status}
        })
    }
}