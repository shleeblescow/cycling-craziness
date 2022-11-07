import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditProfileForm from './editProfileForm';
import RenderTripCard from './renderTripCard';
import {v4 as uuid} from "uuid";

export default function Profile({currentUser}){

    const navigate = useNavigate();
    const params = useParams();

    // might have to push these up later but chillin for now i think
    const [joinedTrips, setJoinedTrips] = useState([])
    const [createdTrips, setCreatedTrips] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [thisUserPage, setThisUserPage] = useState({})

    useEffect(() => {
        fetch(`/users/${params.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((user) => {
                    setThisUserPage(() => user)
                    fetchJoinedTrips(user)
                    fetchCreatedTrips(user)
                    console.log('who should be displayed here', user)

                })
            } else {
                console.log('loser')
            }
        })
        // fetch('/joinedtrips')
        // .then((res) => {
        //     if (res.ok) {
        //         res.json()
        //         .then((joinedTrips) => {
        //             setJoinedTrips(joinedTrips)
        //             console.log(joinedTrips)
        //         })
        //     } else {
        //         console.log('loser')
        //     }
        // })
        // fetch('/createdtrips')
        // .then((res) => {
        //     if (res.ok) {
        //         res.json()
        //         .then((createdTrips) => {
        //             setCreatedTrips(createdTrips)
        //             console.log(createdTrips)
        //         })
        //     }
        // })
    },[])

    const fetchJoinedTrips = (thisUserPage) => {
        fetch(`/joinedtrips/${thisUserPage.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((joinedTrips) => {
                    setJoinedTrips(joinedTrips)
                    console.log(joinedTrips)
                })
            } else {
                console.log('loser')
            }
        })
    }

    const fetchCreatedTrips = (thisUserPage) => {
        fetch(`/createdtrips/${thisUserPage.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((createdTrips) => {
                    setCreatedTrips(createdTrips)
                    console.log(createdTrips)
                })
            }
        })
    }

    function seeFormDrama(){
        setIsClicked(() => !isClicked)
    }

    function handleDoneEditing() {
        setIsClicked(() => !isClicked)
    }

    return(
        <>

            <div>
                pls jsut leave
                <h1>{currentUser.username}</h1>
            </div>

            <br/><br/>

            {currentUser.id == thisUserPage.id ?
                <button onClick={seeFormDrama}>
                        pls let me change my identity
                </button>
            :
                <p>howdy to this personsn page</p>
            
            }

            {isClicked ?
                <div>
                    <h4>change your entire identity</h4>
                    <EditProfileForm
                        currentUser={currentUser}
                        onDoneEditing={handleDoneEditing}
                    />
                </div>
                :
                <></>
            }

            <div>
                <h2>my lil trips i made go me</h2>
                {createdTrips.map((eachTrip) => 
                <RenderTripCard
                    key={uuid()} 
                    thisTrip={eachTrip}
                    onButtonDrama={() => navigate(`/browsetrips/${eachTrip.id}`)}
                />
            )}
            </div>

            <br/>

            <div>
                <h2>trips im totally crashing</h2>
                {joinedTrips.map((eachTrip) => 
                <RenderTripCard
                    key={uuid()} 
                    thisTrip={eachTrip}
                    onButtonDrama={() => navigate(`/browsetrips/${eachTrip.id}`)}
                />
            )}
            </div>

        </>



    )
}