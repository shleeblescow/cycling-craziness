import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from './tripForm';

export default function PostTrip({currentUser}){

    const navigate = useNavigate();

    const [errors, setErrors] = useState([])

    console.log(currentUser)

    function handlePostTrip(tripStuff) {
        fetch(`/trips`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(tripStuff)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(tripStuff => {
                      console.log(`${tripStuff.name} is gooooiiinnngggg be sick`)
                      navigate('/browsetrips')
                  })
              }else {
                  res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }


    return(

        <div>

            <br/><br/>

            there's no way someone is gonna want to bikepack with you, esp for weeks on end, you SMELLY LOSER

            <br/><br/>

            <TripForm 
                currentUser={currentUser}
                onClickDrama={(tripStuff) => handlePostTrip(tripStuff)}
                dramaType={"post"}
            />


        </div>

    )
}