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

    function bikeDrama() {
        console.log('bike drama legggoo')
    }

    function handleDoneEditing() {
        setIsClicked(() => !isClicked)
    }

    function messageDrama(){
        console.log("omg we're gonna do action cable!")
    }

    return(
        <>

            <div>
                <h1>{thisUserPage.username}</h1>
                <p>name: {thisUserPage.name}</p>
                <p>hometwon: {thisUserPage.hometown}</p>
                <p>age: {thisUserPage.age}</p>
                <p>what im all about in life: {thisUserPage.bio}</p>
                <p>what im all about in bikepacking: {thisUserPage.bikepacking_method}</p>
            </div>

            {currentUser.id == thisUserPage.id ?
                <div>
                    <button onClick={seeFormDrama}>
                            pls let me change my identity
                    </button>
                    <br/>
                    <button onClick={bikeDrama}>
                            add a fresh bike
                    </button>
                </div>
            :
                <button onClick={messageDrama}>
                    message {thisUserPage.username}
                </button>
            
            }

            {isClicked ?
                <div>
                    <h4>change your entire identity</h4>
                    <EditProfileForm
                        currentUser={currentUser}
                        onDoneEditing={handleDoneEditing}
                        onUpdatingIdentity={(freshIdentity) => setThisUserPage(freshIdentity)}
                    />
                </div>
                :
                <></>
            }

            <div>
                <h2>my lil trips i made go me</h2>
                {createdTrips.length >= 1 ?
                    <div>
                    {createdTrips.map((eachTrip) => 
                        <RenderTripCard
                            key={uuid()} 
                            thisTrip={eachTrip}
                            onButtonDrama={() => navigate(`/browsetrips/${eachTrip.id}`)}
                        />
                    )}
                    </div>
                    :
                    <p>{thisUserPage.username} doesn't currently have any trips they've created!</p>
                }
            </div>

            <br/>


            <div>
                <h2>trips im totally crashing</h2>
                {joinedTrips.length >= 1 ?
                    <div>
                        {joinedTrips.map((eachTrip) => 
                        <RenderTripCard
                            key={uuid()} 
                            thisTrip={eachTrip}
                            onButtonDrama={() => navigate(`/browsetrips/${eachTrip.id}`)}
                        />
                    )}
                    </div>
                    :
                    <p>{thisUserPage.username} doesn't currently have any trips they're crashing'!</p>
                }
            </div>
        </>



    )
}