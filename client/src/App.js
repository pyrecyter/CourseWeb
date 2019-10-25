import React, { Component,useEffect } from 'react';
import Main from './component/Main';
import Nav from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import PropTypes from 'prop-types';
//redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './component/layout/Alert';
import { loadUser, loadIn} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { loadAdmin } from './actions/auth'; 



if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{ 
  useEffect(() =>{

   
      
    
    if(localStorage.getItem('utype') === 'admin'){
      store.dispatch(loadAdmin());
    }
    else if(localStorage.getItem('utype') === 'instructor'){
      store.dispatch(loadIn());
    }
    else{
      store.dispatch(loadUser());
    }
    
    
    
  }, []);

  
  return (
      
      <Provider store ={store}>
      <div>
       
        <Nav />
        
        <div className="container">
        <Alert/>
          <Main />
        
        </div>
        <br/>
        <br/>
        
        <br/>
        <br/>
        
        <br/>
        <br/>
        <Footer/>

      </div>
      </Provider>
      
    );
  
}
export default App;
