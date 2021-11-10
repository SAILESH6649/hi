import React, { useState } from 'react'
import axios from 'axios'
import "./App.css"
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "http://www.omdbapi.com/?apikey=e0634f5a";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <>
    <div className="App">
      <div className="nav-cont">
      <div className="nav-cont2">
          <img src="https://myfootballmaniac.com/wp-content/uploads/2021/04/cropped-Best-MFM-Logopng.png" alt="" className="image" />
        </div>
        <div className="nav-cont3">
        <h3>Welcome to Meant For Movies.com</h3>
        </div>
        
        
      </div>
      <header>
        
        <h1>Meant for Movies(MFM)</h1>
        
      </header>
    
      
      <main>
     
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
      
    </div>
    <footer>
      <div className="foot">
      <p>By P.S.P.Sailesh © 2021 Copyright</p>
      <p>Contact us:<a href="mailto:sailesh2872@gmail.com">
             sailesh2872@gmail.com</a></p>
        
        
      </div>
      </footer>
    </>
  );
}

export default App
