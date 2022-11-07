import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/login";
import Signup from "./components/signup";
import Browse from "./components/browse";
import About from "./components/about";
import TripDeetsPage from "./components/tripDeetsPage";
import PostTrip from "./components/postTrip";
import Profile from "./components/profile";
import Navbar from "./components/navbar";



function App() {

  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [allTrips, setAllTrips] = useState([])
  const [allJoins, setAllJoins] = useState([])

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          updateUser(user);
          fetchTrips()
          fetchJoinsData()
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

  const fetchJoinsData = () => {
    fetch('/user_trip_joins')
    .then(res => {
      if(res.ok){
        res.json().then((joins) => { 
          setAllJoins(joins)

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

      {currentUser ?
          <Navbar
            currentUser={currentUser}
          />
          :
          <h2>{"log in to get dirty (and flirty??)"}</h2>
      }

      <br/>

      <Routes>  
          <Route exact path="/" element={
            <Login
              onUpdateUser={updateUser}
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
              currentUser={currentUser}
              allJoins={allJoins}
            />
          }/>
         <Route exact path="/browsetrips/create" element={
            <PostTrip
              currentUser={currentUser}
            />
          }/>
          <Route exact path="/users/:id" element={
            <Profile
              currentUser={currentUser}
            />
          }/>
      </Routes>
    </Router>
  );
}

export default App;