import axios from 'axios';
import  { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ADMIN_LOADED,
    LOG_OUT,
    IN_LOADED,
    CLEAR_PROFILE
       
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load student 

export const loadUser =() => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);

    }
    try {
        const res = await axios.get('/api/auth');
        localStorage.setItem('utype', 'student');
        localStorage.setItem('uid',res.data._id);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}
//Load admin 

export const loadAdmin =() => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);

    }
    try {
        const res = await axios.get('/api/adminauth');
        localStorage.setItem('utype', 'admin');
        localStorage.setItem('uid',res.data._id);
        dispatch({
            type: ADMIN_LOADED,
            payload: res.data
        });
        
    } catch (error) {
        
    }
}

//Load Instructor


export const loadIn =() => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);

    }
    try {
        const res = await axios.get('/api/inauth');
        localStorage.setItem('utype', 'instructor');
        localStorage.setItem('uid',res.data._id);
        dispatch({
            type: IN_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}



//register Student 

export const register  =({ firstname, lastname, email, sid, password}) => async dispatch => {
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
     
    const body =JSON.stringify({ firstname, lastname,email,sid,password});

    try {
        const res = await axios.post('/api/students', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


//Login Student 

export const login  =(email,password) => async dispatch => {
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
     
    const body =JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser()); 

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        }) 
    }
}

//login admin
export const AdminLogin  =(email,password) => async dispatch => {
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
     
    const body =JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/adminauth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadAdmin()); 

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        }) 
    }
}

//login instructor
export const InstructLogin  =(email,password) => async dispatch => {
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
     
    const body =JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/inauth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadIn()); 

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        }) 
    }
}

//logout

export const logout =() => dispatch =>{
    localStorage.removeItem('utype');

    localStorage.removeItem('uid');
    dispatch({type:CLEAR_PROFILE});
    dispatch({type:LOG_OUT});
     

}