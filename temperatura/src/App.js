import React , { Fragment , useState } from 'react';
import { Header }  from "./components/template/Header";
import { Main }  from "./components/template/Main";
import  { Footer } from "./components/template/Footer";
import './App.css';

function App(){
  return (
     <Fragment>
         <Header />
         <Main /> 
         <Footer /> 
     </Fragment>  
  );
}

export default App;
