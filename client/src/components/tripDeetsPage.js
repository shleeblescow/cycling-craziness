import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {v4 as uuid} from "uuid";
import TripForm from './tripForm';

export default function TripDeetsPage({currentUser}){

    const navigate = useNavigate();
    const params = useParams();
    const [errors, setErrors] = useState(false)

    const [trip, setTrip] = useState({})
    const [attendees, setAttendees] = useState([])
    const [organizer, setOrganizer] = useState({})

    useEffect(()=>{
        fetch(`/trips/${params.id}`)
        .then(res => { 
            if(res.ok){
                res.json().then(data => {
                    setTrip(data)
                    setAttendees(data.users)
                    setOrganizer(data.users.find(peeps => peeps.id == data.creator_id))
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

    function editTripDrama() {
        <TripForm
            currentUser={currentUser}
        />
    }

    function joinTripDrama() {

    }

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
                        <p>about the trip: {trip.about_trip}</p>
                    </div>

                    <div>
                        <h3>about the organizer</h3>
                            <p>basics: {organizer.name} - {organizer.hometown} - {organizer.age}</p>
                            <p>style: {organizer.bikepacking_method}</p>
                    </div>

                    <div>
                        <h4>meet the gang ({attendees.length} peep{attendees.length == 1 ? null : "s"} #sendingit)</h4>
                            {attendees.map((peep) =>
                                <div key={uuid()} >
                                    <li>{peep.name} - {peep.age} - '{peep.username}'</li>
                                    <br/>
                                </div>
                            )}
                    </div>

                </div>

                <br/><br/>

                <div>
                    {trip.creator_id == currentUser.id ?
                    <div>
                        <button onClick={editTripDrama}>
                                edit trip
                        </button>
                    </div>
                    :
                    <div>
                        <button onClick={joinTripDrama}>
                            join trip
                        </button>
                    </div>
                    }  
                </div> 

                <br/><br/> 

        </div>




    )
}