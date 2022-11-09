import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditProfileForm from './editProfileForm';
import RenderTripCard from './renderTripCard';
import {v4 as uuid} from "uuid";
import BikeForm from './bikeForm';
import RenderBikeCard from './renderBikeCard';

export default function Profile({currentUser}){

    const navigate = useNavigate();
    const params = useParams();

    // might have to push these up later but chillin for now i think
    const [joinedTrips, setJoinedTrips] = useState([])
    const [createdTrips, setCreatedTrips] = useState([])
    const [profileBikes, setProfileBikes] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [isClickedBikePost, setIsClickedBikePost] = useState(false)
    const [thisUserPage, setThisUserPage] = useState({})
    const [errors, setErrors] = useState([])


    useEffect(() => {
        fetch(`/users/${params.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((user) => {
                    setThisUserPage(() => user)
                    fetchJoinedTrips(user)
                    fetchCreatedTrips(user)
                    fetchProfileBikes(user)
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

    const fetchProfileBikes = (thisUserPage) => {
        fetch(`/profilebikes/${thisUserPage.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((profileBikes) => {
                    setProfileBikes(profileBikes)
                    console.log("profile bikes ", profileBikes)
                })
            }
        })
    }

    // adding a new bike to their profile
    function postBikeNowPls(bikeStuff) {
        
        console.log(bikeStuff)

        fetch(`/bikes`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(bikeStuff)
        })
          .then(res => {
              if(res.ok){
                  res.json().then(bikeStuff => {
                      console.log(`${bikeStuff.bike_name} is such a stupid bike`)
                      setProfileBikes(() => [...profileBikes, bikeStuff])
                  })
              }else {
                  res.json().then(json => setErrors(Object.entries(json.errors)))
              }
        })

        setIsClickedBikePost(() => !isClickedBikePost)
    }

    // all the button and button state drama
    function seeFormDrama(){
        setIsClicked(() => !isClicked)
    }

    function bikeDramaPost() {
        setIsClickedBikePost(() => !isClickedBikePost)
    }

    function handleDoneEditing() {
        setIsClicked(() => !isClicked)
    }

    function handleDoneEditingBike() {
        setIsClickedBikePost(() => !isClickedBikePost)
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
                    <button onClick={bikeDramaPost}>
                            add a fresh bike
                    </button>
                </div>
            :
                // <button onClick={messageDrama}>
                //     message {thisUserPage.username}
                // </button>
                <></>
            
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

            {isClickedBikePost ?
                <div>
                    <h4>add a bike</h4>
                    <BikeForm
                        dramaType={"post"}
                        currentUser={currentUser}
                        onClickDramaBike={(bikeStuff) => postBikeNowPls(bikeStuff)}
                        onDoneEditingBike={handleDoneEditingBike}
                    />
                </div>
                :
                <></>
            }

            <div>
                <h2>{thisUserPage.username}'s babies</h2>
                {profileBikes.length >= 1 ?
                    <div>
                    {profileBikes.map((eachBike) => 
                        <RenderBikeCard
                            key={uuid()} 
                            onDelete={() => setProfileBikes(profileBikes)}
                            thisBike={eachBike}
                            currentUser={currentUser}
                        />
                    )}
                    </div>
                    :
                    <p>{thisUserPage.username} doesn't currently have any trips they've created!</p>
                }
            </div>  

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