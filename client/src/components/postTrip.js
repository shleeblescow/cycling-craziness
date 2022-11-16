import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from './tripForm';

export default function PostTrip({currentUser}){

    const navigate = useNavigate();

    const [errors, setErrors] = useState([])

    function handlePostTrip(tripStuff) {

        console.log(tripStuff)
        
        fetch(`/trips`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(tripStuff)
        })
          .then(res => {
              if(res.ok){
                  res.json().then(tripStuff => {
                      console.log(`${tripStuff.name} is gooooiiinnngggg be sick`)
                      makeAJoin(tripStuff)
                  })
              }else {
                // TO DO: ERROR POP UP
                  res.json().then(json => setErrors(Object.entries(json.errors)))
              }
        })
    }

    const makeAJoin = (tripStuff) => {

        const joinToPost = {
            user_id: currentUser.id,
            trip_id: tripStuff.id
        }

        fetch(`/user_trip_joins`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(joinToPost)
        })
        .then(res => {
            if(res.ok){
                res.json().then(res => {
                    console.log(`${currentUser.username} is going to ${tripStuff.location}! stupid bitch`)
                    navigate('/browsetrips')
                })
            } else {
                console.log("loser")
                res.json().then(json => setErrors(Object.entries(json.errors)))
            }
        })

        }
        

    const bigClassBlack = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'



    return(

        <div className='p-4'>

            <br/>

            <h1 className={bigClassBlack}>post a new trip</h1>

            <br/>

            <TripForm 
                currentUser={currentUser}
                onClickDrama={(tripStuff) => handlePostTrip(tripStuff)}
                dramaType={"post"}
                buttonText={"Post Trip"}
            />


        </div>

    )
}