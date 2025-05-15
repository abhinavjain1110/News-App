import './App.css';
import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const [progress,setProgress] =useState(0)
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
        <Route exact path='/' element = {<News setProgress={setProgress} pageSize={8} key="general" country="in" category="general"/>}/>
        <Route exact path='/entertainment'element={<News setProgress={setProgress} pageSize={8}  key="entertainment"  country="in" category="entertainment"/>}/>
        <Route exact path='/general'element={<News setProgress={setProgress} pageSize={8}  key="general"  country="in" category="general" />}/>
        <Route exact path='/health' element={<News setProgress={setProgress} pageSize={8}  key="health" country="in" category="health" />}/>
        <Route exact path='/science'element={<News setProgress={setProgress} pageSize={8}  key="science" country="in" category="science" />}/>
        <Route exact path='/sports'element={<News setProgress={setProgress} pageSize={8}  key="sports" country="in" category="sports" />}/>
        <Route exact path='/technology'element={<News setProgress={setProgress} pageSize={8}  key="technology" country="in" category="technology" />}/>
        <Route exact path='/business'element={<News setProgress={setProgress} pageSize={8}  key="business" country="in" category="business" />}/>
        </Routes>
      </Router>
      </div>
    )
  }

  export default App;