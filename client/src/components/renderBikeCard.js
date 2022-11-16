import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BikeForm from './bikeForm';

export default function RenderBikeCard({ thisBike, currentUser, onDelete }) {

    const [timeToEdit, setTimeToEdit] = useState(false)
    const [errors, setErrors] = useState([])
    const [thisBikePosted, setThisBikePosted] = useState(thisBike)

    

    function editBikeNowPls(bikeStuff, formDataSubmit) {
        console.log("gonna edit some bikes y'all")
        fetch(`/bikes/${thisBike.id}`,{
            method:'PATCH',
            body: formDataSubmit
            // headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(bikeStuff)
        })
        .then(res => {
            if(res.ok){
                res.json()
                .then((bikeUpdate) => {
                    console.log(bikeUpdate)
                    setThisBikePosted(() => bikeUpdate)
                    console.log('hellow from an updated state')
                });
            } else {
            //Display errors
            // TO DO: ERROR POP UP
                res.json().then(data => setErrors(Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)))
            }
        })
        toggleEditButton()
    }

    function destroyBikeAH() {
        fetch(`/bikes/${thisBike.id}`,{
            method:'DELETE'
          })
          .then(res => {
              if(res.ok){
                console.log(`${currentUser.username} is deleting ${thisBike.bike_name}!? stupid bitch`)
                onDelete()
              }else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    function toggleEditButton() {
        setTimeToEdit(() => !timeToEdit)
    }

    const cardDiv = "max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    const imgClass = 'rounded-t-lg object-cover h-48 w-96'
    const bigClassBlack = 'text-xl font-bold tracking-tight text-gray-900 dark:text-white'
    const bigCLassGray = 'text-l font-semibold tracking-tight text-gray-500 dark:text-white'
    const smallClass = 'mb-3 font-normal text-gray-700 dark:text-gray-400'
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

    // console.log("this bike posted", thisBikePosted)

    return (
        <div className={cardDiv}>      
            <div>
                    {thisBikePosted.bike_photo_file ?
                        <img
                            className={imgClass}
                            src={thisBikePosted.bike_photo_file}
                            alt={"bike photo"}
                        />
                    :
                        <img
                            className={imgClass}
                            src={thisBikePosted.bike_photo}
                            alt={"bike photo not user pic"}
                        />
                    }
            </div>
            <div className='p-5'>
                <h4 className={bigClassBlack}>{thisBikePosted.bike_name}</h4>
                <p className={bigCLassGray}>Type: {thisBikePosted.bike_type}</p>
                <p><span className={smallClass}>{thisBikePosted.brand} <span><i>"{thisBikePosted.model}"</i></span></span></p>
                <div>
                    {currentUser.id == thisBikePosted.user_id ?
                        <div>
                            <button
                                className={blueButtonClass}
                                onClick={toggleEditButton}>
                                editBike
                            </button>
                            {"    "}
                            <button 
                                className={blueButtonClass}
                                onClick={destroyBikeAH}>
                                delete bike
                            </button>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div>
                    {timeToEdit ?
                        <BikeForm
                            dramaType={thisBikePosted}
                            currentUser={currentUser}
                            onClickDramaBike={(bikeStuff, formDataSubmit) => editBikeNowPls(bikeStuff, formDataSubmit)}
                            onDoneEditingBike={toggleEditButton}
                        />
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}