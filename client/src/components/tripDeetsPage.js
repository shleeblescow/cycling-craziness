import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {v4 as uuid} from "uuid";
import TripForm from './tripForm';

// CSS TO DO: all buttons same size maybe
export default function TripDeetsPage({currentUser, allJoins, fetchJoinsData}){

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
                    // console.log(data)
                    setTrip(data)
                    setAttendees(data.users)
                    setOrganizer(data.users.find(peeps => peeps.id == data.creator_id))
                    // console.log(data.users.find(peeps => peeps.id == data.creator_id))
                    //setOrganizer(data.find())
                    partOfSquad(data)
            })
            } else {
                console.log('error')
                res.json().then(data => setErrors(data.error))
            }
        })
    },[])

    // edit the trip if it belongs to the current user
    function handleEditTrip(tripStuff, formDataSubmit) {
            // fetch(`/trips/${params.id}`,{
            //     method:'PATCH',
            //     headers: {'Content-Type': 'application/json'},
            //     body:JSON.stringify(tripStuff)
            // })
            // console.log('form data submit in hanlde edit trip', formDataSubmit)
            // console.log('trip stuff in hanlde edit trip', tripStuff)
            fetch(`/trips/${params.id}`,{
                method: 'PATCH',
                body: formDataSubmit
            })
            .then(res => {
                if(res.ok){
                    res.json()
                    .then((tripUpdate) => {
                        console.log(tripUpdate)
                        setTrip(() => tripUpdate)
                        console.log('hellow from an updated state')
                        clickDrama()
                    });
                } else {
                    //res.json().then(json => setErrors(Object.entries(json.errors)))
                    res.json().then(retErrors => {
                        setErrors(Object.entries(retErrors.errors))
                        console.log(retErrors)
                    })
                }
            })
    }

    // let the current user join a trip if it doesn't belong to them
    function joinTripDrama() {
        const joinToPost = {
            user_id: currentUser.id,
            trip_id: trip.id
        }
        // console.log('new join', joinToPost)
        // console.log('all joins', allJoins)
        fetch(`/user_trip_joins`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(joinToPost)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(res => {
                    setIsAttendee(() => true)
                    setAttendees([...attendees, currentUser])
                    fetchJoinsData()
                    console.log(`${currentUser.username} is going to ${trip.location}! stupid bitch`)
                  })
              }else {
                  res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    // determine if the current user is already part of the trip
    function partOfSquad(data) {
        data.users.forEach((attendee) => {
            if (attendee.id == currentUser.id && currentUser.id != trip.creator_id) {
                setIsAttendee(() => true)
            }
        })
    }

    // removes the user from the trip
    function leaveTripDrama() {
        console.log('all joins', allJoins)
        let deleteID = allJoins.find((join) => join.user_id == currentUser.id && join.trip_id == trip.id).id
        fetch(`/user_trip_joins/${deleteID}`,{
            method:'DELETE'
          })
          .then(res => {
              if(res.ok){
                console.log(`${currentUser.username} is ditching to ${trip.trip_name}! stupid bitch`)
                fetchJoinsData()
                setIsAttendee(() => false)
                setAttendees(attendees.filter((peep) => peep.id != currentUser.id))
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
            if (res.ok) {
                console.log(`${currentUser.username} is deleting ${trip.trip_name}!? stupid bitch`)
                navigate('/browsetrips')
            } else {
                //res.json().then(json => setErrors(Object.entries(json.errors)))
                res.json().then(retErrors => {
                    setErrors(Object.entries(retErrors.errors))
                    console.log(retErrors)
                })
            }
        })
    }

    // just a little state situation to make condional rendering work
    function clickDrama() {
        setIsClicked(() => !isClicked)
    }

    // cause state likes to be a lil bitch
    const cheaterProp = trip
    //console.log(cheaterProp.trip_photo_file)

    const bigClassBlack = 'mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white'
    const imgClass = 'rounded-t-lg rounded-b-lg'
    const linkClass = 'font-medium text-blue-600 dark:text-blue-500 hover:underline'
    const buttonClass = 'py-3 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg rounded-r-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
    // object-cover h-68 w-120'


    if(errors) return <h1> omg you broke something</h1>

    return(

        <div className='p-4'>

                <br/>

                <h1 className={bigClassBlack}>{trip.trip_name}</h1>

                <br/>

                <div className='flex w-1/2 h-full overflow-hidden'>
                    {trip.trip_photo_file ?
                            <img
                                className={imgClass}
                                src={trip.trip_photo_file}
                                alt={"trip photo"}
                            />
                        :
                            <img
                                className={imgClass}
                                src={trip.route_photo}
                                alt={"bike photo"}
                            />
                    }
                </div>
                
                <p><b>Location:</b> {trip.location}</p>
                <p><b>Departing from:</b> {trip.departure_city} in {trip.departure_month}</p>
                <p><b>Ending in:</b> {trip.final_city}</p>
                <p><i>{trip.total_mileage} total miles - {trip.total_vert} total vert</i></p>
                <br/>
                {trip.link ?
                    <p>extra deets:  
                        <Link to={trip.link} className={linkClass}>
                            {trip.link}
                        </Link>
                    </p>
                    :
                    <></>
            
                }
                <br/>
                <div>

                    <div className='flex w-1/2 h-full'>
                        <p><b>about the trip:</b> {trip.about_trip}</p>
                    </div>

                    <br/>

                    <div>
                        <h3><b>about the organizer</b></h3>
                            basics: 
                            <Link to={`/userprofile/${organizer.id}`} className={linkClass}>
                                 {organizer.name} - {organizer.hometown} - {organizer.age}
                            </Link>
                            <p>style: {organizer.bikepacking_method}</p>
                    </div>

                    <br/>

                    <div>
                        <h4><b>meet the gang</b> ({attendees.length} peep{attendees.length == 1 ? null : "s"} #sendingit)</h4>
                            {attendees.map((peep) =>
                                <div key={uuid()} >
                                    <Link to={`/userprofile/${peep.id}`} className={linkClass}>
                                        {peep.name} - {peep.age} - '{peep.username}'
                                    </Link>
                                    <br/><br/>
                                </div>
                            )}
                    </div>

                </div>

                <br/><br/>

                <div>
                    {trip.creator_id == currentUser.id ?
                        <div>
                            <button onClick={clickDrama} className={buttonClass}>
                                    edit trip
                            </button>
                            <br/><br/>
                            <div>
                                {
                                    isClicked ?
                                    <div>
                                        <TripForm
                                            currentUser={currentUser}
                                            onClickDrama={(tripStuff, formDataSubmit) => handleEditTrip(tripStuff, formDataSubmit)}
                                            dramaType={cheaterProp}
                                            buttonText={'Save Changes'}
                                        />
                                    </div>
                                    :
                                    <></>
                                }   
                            </div>
                            <button onClick={deleteTripDrama} className={buttonClass}>
                                    delete trip
                            </button>
                    </div>
                    :
                    <div>
                        {isAttendee ? 
                            <button onClick={leaveTripDrama} className={buttonClass}>
                                leave trip
                            </button>
                            :
                            <button onClick={joinTripDrama} className={buttonClass}>
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