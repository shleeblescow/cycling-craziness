import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditProfileForm from './editProfileForm';
import RenderTripCard from './renderTripCard';
import {v4 as uuid} from "uuid";
import BikeForm from './bikeForm';
import RenderBikeCard from './renderBikeCard';
import AddPhotosForm from './addPhotosForm';
import RenderPhotos from './renderPhotos';

export default function Profile({currentUser}){

    const navigate = useNavigate();
    const params = useParams();
    const pageID = params.id

    // might have to push these up later but chillin for now i think
    const [joinedTrips, setJoinedTrips] = useState([])
    const [createdTrips, setCreatedTrips] = useState([])
    const [profileBikes, setProfileBikes] = useState([])
    const [userFunPhotos, setUserFunPhotos] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [isClickedBikePost, setIsClickedBikePost] = useState(false)
    const [isClickedPhotoPost, setIsClickedPhotoPost] = useState(false)
    const [thisUserPage, setThisUserPage] = useState({})
    const [errors, setErrors] = useState([])


    useEffect(() => {
        fetch(`/userprofile/${params.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((user) => {
                    setThisUserPage(() => user)
                    fetchJoinedTrips(user)
                    fetchCreatedTrips(user)
                    fetchProfileBikes(user)
                    fetchUserFunPhotos(user)
                    // console.log('who should be displayed here', user)

                })
            } else {
                console.log('error loading profile page')
            }
        })
    },[pageID])

    const fetchJoinedTrips = (thisUserPage) => {
        fetch(`/joinedtrips/${thisUserPage.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((joinedTrips) => {
                    setJoinedTrips(joinedTrips)
                    // console.log(joinedTrips)
                })
            } else {
                console.log('unable to fetch joined trip')
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
                    // console.log(createdTrips)
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
                    //console.log("profile bikes ", profileBikes)
                })
            }
        })
    }

    const fetchUserFunPhotos = (thisUserPage) => {
        fetch(`/userfunphotos/${thisUserPage.id}`)
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((userFunPhotos) => {
                    setUserFunPhotos(userFunPhotos)
                    // console.log("photo fetch", userFunPhotos)
                    
                    //console.log("profile bikes ", profileBikes)
                })
            }
        })
    }

    // adding a new bike to their profile
    function postBikeNowPls(bikeStuff, formDataSubmit) {
        
        // console.log(bikeStuff)

        fetch(`/bikes`,{
            method:'POST',
            // headers:{'Content-Type': 'application/json'},
            // body:JSON.stringify(bikeStuff)
            body: formDataSubmit
        })
          .then(res => {
              if(res.ok){
                  res.json().then(bikeStuff => {
                    //   console.log(`${bikeStuff.bike_name} is such a stupid bike`)
                      setProfileBikes(() => [...profileBikes, bikeStuff])
                  })
              }else {
                // TO DO: ERROR POP UP
                  res.json().then(json => setErrors(Object.entries(json.errors)))
              }
        })

        setIsClickedBikePost(() => !isClickedBikePost)
    }

    // all the button and button state drama
    function seeFormDrama(){
        setIsClicked(() => !isClicked)

        if (isClickedPhotoPost) {
            setIsClickedPhotoPost(false)
        }

        if (isClickedBikePost) {
            setIsClickedBikePost(false)
        }
    }

    function bikeDramaPost() {
        setIsClickedBikePost(() => !isClickedBikePost)

        if (isClicked) {
            setIsClicked(false)
        }

        if (isClickedPhotoPost) {
            setIsClickedPhotoPost(false)
        }
    }

    function postPhotoDrama(){
        setIsClickedPhotoPost(() => !isClickedPhotoPost)
        fetchUserFunPhotos(currentUser)

        if (isClicked) {
            setIsClicked(false)
        }

        if (isClickedBikePost) {
            setIsClickedBikePost(false)
        }
    }

    function handleDoneEditing() {
        setIsClicked(() => !isClicked)
    }

    function handleDoneEditingBike() {
        setIsClickedBikePost(() => !isClickedBikePost)
    }

    // function messageDrama(){
    //     console.log("omg we're gonna do action cable!")
    // }


    const imgClass = 'rounded-t-lg rounded-b-lg object-cover h-48 w-96'
    const bigClassBlack = 'mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white'
    const bigCLassGray = 'mb-2 text-2xl font-semibold tracking-tight text-gray-500 dark:text-white'
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

    return(
        <div className='p-4'>

            <div>
                <h1 className={bigClassBlack}>{thisUserPage.username}</h1>
                <img
                    className={imgClass}
                    src={thisUserPage.profile_pic_file}
                    alt={'profile picture'}
                />
                <p><b>Name:</b> {thisUserPage.name}</p>
                <p><b>Hometown:</b> {thisUserPage.hometown}</p>
                <p><b>Age:</b> {thisUserPage.age}</p>
                <p><b>Life Bio:</b> {thisUserPage.bio}</p>
                <p><b>Bikepacking Style:</b> {thisUserPage.bikepacking_method}</p>
            </div>

            {currentUser.id == thisUserPage.id ?
                <div>
                    <button onClick={seeFormDrama} className={blueButtonClass}>
                            edit profile
                    </button>
                    {"   "}
                    <button onClick={bikeDramaPost} className={blueButtonClass}>
                            add bike
                    </button>
                    {"   "}
                    <button onClick={postPhotoDrama} className={blueButtonClass}>
                            add pics
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
                    {/* <h4>change your entire identity</h4> */}
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
                    <BikeForm
                        dramaType={"post"}
                        currentUser={currentUser}
                        onClickDramaBike={(bikeStuff, formDataSubmit) => postBikeNowPls(bikeStuff, formDataSubmit)}
                        onDoneEditingBike={handleDoneEditingBike}
                    />
                </div>
                :
                <></>
            }

            {isClickedPhotoPost ?
                <div>
                    <AddPhotosForm
                        currentUser={currentUser}
                        onDoneEditing={postPhotoDrama}
                    />
                </div>
                :
                <></>
            }   

            <br/>
            <div>
                <h2 className={bigCLassGray}>{thisUserPage.username}'s Bikes</h2>
                {profileBikes.length >= 1 ?
                    <div>
                    {profileBikes.map((eachBike) => 
                        <div key={uuid()} >
                            <RenderBikeCard
                                onDelete={() => fetchProfileBikes(thisUserPage)}
                                thisBike={eachBike}
                                currentUser={currentUser}
                            />
                            <br/>
                        </div>
                    )}
                    </div>
                    :
                    <p>{thisUserPage.username} doesn't currently have any bikes cause theyre poor or soemthing, loser</p>
                }
            </div>  

            <div>
                <h2 className={bigCLassGray}>Trips Organized by {thisUserPage.username}</h2>
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
            <h2 className={bigCLassGray}>Trips {thisUserPage.username} is Attending</h2>
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

            <br/>

            <div>
                <h2 className={bigCLassGray}>{thisUserPage.username}'s Photos</h2>
                {userFunPhotos.length >= 1 ?
                    <div>
                        {userFunPhotos.map((eachPhoto) => 
                        <div key={uuid()}>
                            <RenderPhotos 
                                thisPhoto={eachPhoto}
                                currentUser={currentUser}
                                onDelete={() => fetchUserFunPhotos(currentUser)}
                            />
                            <br/>
                        </div> 
                    )}
                    </div>
                    :
                    <p>{thisUserPage.username} doesn't have any photos what a pleeb</p>
                }
            </div>


        </div>



    )
}