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

    //console.log(thisBike)

    return (
        <>      
            <div>
                    {thisBikePosted.bike_photo_file ?
                        <img
                            src={thisBikePosted.bike_photo_file}
                            alt={"bike photo"}
                        />
                    :
                        <img
                            src={thisBikePosted.bike_photo}
                            alt={"bike photo"}
                        />
                    }
            </div>
            <h4>{thisBikePosted.bike_name}</h4>
            <p>{thisBikePosted.brand} - <span>{thisBikePosted.model}</span></p>
            <p>{thisBikePosted.bike_type}</p>
            <div>
                {currentUser.id == thisBikePosted.user_id ?
                    <div>
                        <button 
                            onClick={toggleEditButton}>
                            editBike
                        </button>
                        <button 
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
        </>
    )
}