import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import BikeForm from './bikeForm';

export default function RenderBikeCard({ thisBike, currentUser }) {

    const [timeToEdit, setTimeToEdit] = useState(false)
    const [errors, setErrors] = useState([])
    const [thisBikePosted, setThisBikePosted] = useState(thisBike)

    function editBikeNowPls(bikeStuff) {
        console.log("gonna edit some bikes y'all")
        fetch(`/bikes/${thisBike.id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(bikeStuff)
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
        setTimeToEdit(() => !timeToEdit)
    }

    function setEditTime() {
        setTimeToEdit(() => !timeToEdit)
    }

    function handleDoneEditingBike() {
        setTimeToEdit(() => !timeToEdit)
    }

    console.log(thisBike)

    return (
        <>      
            <div>
                <img
                    src={thisBikePosted.bike_photo}
                    alt={"bike photo"}
                />
            </div>
            <h4>{thisBikePosted.bike_name}</h4>
            <p>{thisBikePosted.brand} - <span>{thisBikePosted.model}</span></p>
            <p>{thisBikePosted.bike_type}</p>
            <div>
                {currentUser.id == thisBikePosted.user_id ?
                    <button 
                        onClick={setEditTime}>
                        editBike
                    </button>
                    :
                    <></>
                }
            </div>
            <div>
                {timeToEdit ?
                    <BikeForm
                        dramaType={thisBikePosted}
                        currentUser={currentUser}
                        onClickDramaBike={(bikeStuff) => editBikeNowPls(bikeStuff)}
                        onDoneEditingBike={handleDoneEditingBike}
                    />
                    :
                    <></>
                }
            </div>
        </>
    )
}