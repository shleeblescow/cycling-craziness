import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function TripDeetsPage({ allTrips }){

    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(false)

    const [trip, setTrip] = useState({})

    useEffect(()=>{
        //GET to '/productions/:id'
        fetch(`/trips/${params.id}`)
        .then(res => { 
            if(res.ok){
                res.json().then(data => {
                    setTrip(data)
                    setLoading(false)
                    console.log(data)
            })
            } else {
                console.log('error')
                res.json().then(data => setErrors(data.error))
            }
        })
    },[])


    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    function navDrama(){
        navigate('/browsetrips')
    }

    if(loading) return <h1>hold your horsies jjjeeezzzz....</h1>
    if(errors) return <h1> omg you broke something</h1>

    return(

        <div>


            you? youre gonna go on this trip?  yyeaaahhhh right buckaroo lmaooooooo
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>

            <br/><br/><br/>

            <button onClick={navDrama}>
                {'<~'} nvm take me back to the other trips
            </button>


            <br/><br/><br/>

            <h1>{trip.trip_name}</h1>

                <div>
                    <img
                        src={trip.route_photo}
                        alt={"route photo"}
                    />
                </div>
                <p>Location: {trip.location}</p>
                <p>Departing from: {trip.departure_city} in {trip.departure_month}</p>
                <p>Ending in: {trip.final_city}</p>
                <p>{trip.total_mileage} total miles - {trip.total_vert} total vert</p>
                <div>

                <div>
                    <p>about: {trip.about_trip}</p>
                </div>

                </div>

        </div>



    )
}