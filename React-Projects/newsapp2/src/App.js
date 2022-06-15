import logo from './logo.svg';
import './App.css';

import React, { Component, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = ()=> {

  const [progress,setProgress] = useState(0);
  const pageSize=10;

  const apiKey = '5ed23fc0cea44cd888c9eb4e2b663b00'

  

    return (
      <div>
        <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
        
      />
       
      <Routes>
          <Route exact path="/" element = {<News apiKey={apiKey}  setProgress={setProgress}   key="general" pageSize={20} country="in" category="general" />} />
          
         
          <Route exact path="/business" element = {<News apiKey={apiKey} setProgress={setProgress}   key="business" pageSize={20} country="in" category="business" />}>
          
          </Route>
          <Route exact path="/entertainment" element={ <News apiKey={apiKey} setProgress={setProgress}   key="entertainment" pageSize={20} country="in" category="entertainment" />}>
         
          </Route>
          <Route exact path="/sports" element={ <News apiKey={apiKey} setProgress={setProgress}   key="sports" pageSize={20} country="in" category="sports" />}>
         
          </Route>
          <Route exact path="/health" element={  <News apiKey={apiKey} setProgress={setProgress}   key="health" pageSize={20} country="in" category="health" />}>
        
          </Route>
          <Route exact  path="/general" element={<News apiKey={apiKey} setProgress={setProgress}   key="againgeneral" pageSize={20} country="in" category="general" />}>
          
          </Route>
          <Route exact path="/science" element={ <News apiKey={apiKey} setProgress={setProgress}   key="science" pageSize={20} country="in" category="science" />}>
         
          </Route>
          <Route exact path="/technology" element={ <News apiKey={apiKey} setProgress={setProgress}   key="technology" pageSize={20} country="in" category="technology" />}>
         
          </Route>
          </Routes>
       </Router>
      </div>
    )
  
}
export default App
