import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {v4 as uuid} from "uuid";
import TripForm from './tripForm';

export default function TripDeetsPage({currentUser, allJoins}){

    const navigate = useNavigate();
    const params = useParams();
    const [errors, setErrors] = useState(false)

    const [trip, setTrip] = useState({})
    const [attendees, setAttendees] = useState([])
    const [organizer, setOrganizer] = useState({})
    const [isClicked, setIsClicked] = useState(false)
    const [isAttendee, setIsAttendee] = useState(false)
    
    // get info on the current trip being displayed
    useEffect(()=>{
        fetch(`/trips/${params.id}`)
        .then(res => { 
            if(res.ok){
                res.json().then(data => {
                    setTrip(data)
                    setAttendees(data.users)
                    setOrganizer(data.users.find(peeps => peeps.id == data.creator_id))
                    partOfSquad(data)
            })
            } else {
                console.log('error')
                res.json().then(data => setErrors(data.error))
            }
        })
    },[])

    // edit the trip if it belongs to the current user
    function handleEditTrip(tripStuff) {
            fetch(`/trips/${params.id}`,{
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(tripStuff)
            })
            .then(res => {
                if(res.ok){
                    console.log('hellow from an updated state')
                    clickDrama()
                } else {
                //Display errors
                    res.json().then(data => setErrors(Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)))
                }
            })
    }

    // let the current user join a trip if it doesn't belong to them
    function joinTripDrama() {
        const joinToPost = {
            user_id: currentUser.id,
            trip_id: trip.id
        }
        fetch(`/user_trip_joins`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(joinToPost)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(res => {
                      console.log(`${currentUser.username} is going to ${trip.location}! stupid bitch`)
                  })
              }else {
                  res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    // determine if the current user is already part of the trip
    function partOfSquad(data) {
        console.log('gonna look @', data)
        console.log('for', currentUser)
        data.users.forEach((attendee) => {
            if (attendee.id == currentUser.id && currentUser.id != trip.creator_id) {
                setIsAttendee(() => true)
                console.log('found em', attendee)
            }
        })
    }

    function leaveTripDrama() {
        let deleteID = allJoins.find((join) => join.user_id == currentUser.id && join.trip_id == trip.id).id
        fetch(`/user_trip_joins/${deleteID}`,{
            method:'DELETE'
          })
          .then(res => {
              if(res.ok){
                console.log(`${currentUser.username} is ditching to ${trip.trip_name}! stupid bitch`)
                setIsAttendee(() => false)
              }else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    function deleteTripDrama() {
        fetch(`/trips/${trip.id}`,{
            method:'DELETE'
          })
          .then(res => {
              if(res.ok){
                console.log(`${currentUser.username} is deleting ${trip.trip_name}!? stupid bitch`)
                navigate('/browsetrips')
              }else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    // just a little state situation to make condional rendering work
    function clickDrama() {
        setIsClicked(() => !isClicked)
    }

    // cause state likes to be a lil bitch
    const cheaterProp = trip

    if(errors) return <h1> omg you broke something</h1>

    return(

        <div>

            you? youre gonna go on this trip?  yyeaaahhhh right buckaroo lmaooooooo

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
                            <button onClick={clickDrama}>
                                    edit trip
                            </button>
                            <br/>
                            <button onClick={deleteTripDrama}>
                                    delete trip
                            </button>
                            <div>
                                {
                                    isClicked ?
                                    <div>
                                        <TripForm
                                            currentUser={currentUser}
                                            onClickDrama={(tripStuff) => handleEditTrip(tripStuff)}
                                            dramaType={cheaterProp}
                                        />
                                    </div>
                                    :
                                    <></>
                                }   
                            </div>
                    </div>
                    :
                    <div>
                        {isAttendee ? 
                            <button onClick={leaveTripDrama}>
                                leave trip
                            </button>
                            :
                            <button onClick={joinTripDrama}>
                                join trip
                            </button>
                        }
                    </div>
                    }  
                </div> 

                <br/><br/> 

        </div>




    )
}