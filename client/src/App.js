import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/login";
import Signup from "./components/signup";
import Browse from "./components/browse";
import About from "./components/about";
import TripDeetsPage from "./components/tripDeetsPage";
import PostTrip from "./components/postTrip";
import Profile from "./components/profile";



function App() {

  //const [productions, setProductions] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [allTrips, setAllTrips] = useState([])

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          updateUser(user);
          fetchTrips()
        });
      }
    })
  },[])

  const fetchTrips = () => {
    fetch('/trips')
    .then(res => {
      if(res.ok){
        res.json().then((trips) => { 
          setAllTrips(trips)

      })
      }else {
        res.json().then(data => setErrors(data.error))
      }
    })
  }


  const updateUser = (user) => setCurrentUser(user)

  console.log(currentUser)

  return (
    <Router>
      <Routes>  
          <Route exact path="/" element={
            <Login
              onUpdateUser={updateUser}
              //onUpdateUser={(user) => updateUser(user)}
            />
          }/>
         <Route exact path="/signup" element={
            <Signup 
              onUpdateUser={updateUser}
            />
          }/>
          <Route exact path="/about" element={
            <About
              // whatever props
            />
          }/>

          <Route exact path="/browsetrips" element={
            <Browse
              allTrips={allTrips}
              fetchTrips={fetchTrips}
              currentUser={currentUser}
            />
          }/>

          <Route exact path="/browsetrips/:id" element={
            <TripDeetsPage
              allTrips={allTrips}
            />
          }/>
        
         <Route exact path="/browsetrips/create" element={
            <PostTrip
              // whatever props
            />
          }/>

         <Route exact path="/users/:id" element={
            <Profile
              // whatever props
              currentUser={currentUser}
            />
          }/>
    

      </Routes>
    </Router>
  );
}

export default App;

// conditional routing -> allTrips ? good route : alt
// encase the route in {allTrips &&} 