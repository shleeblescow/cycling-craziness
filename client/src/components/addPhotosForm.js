import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPhotosForm({ currentUser, onDoneEditing }) {

    const [errors, setErrors] = useState([])

    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadedCaption, setUploadedCaption] = useState('')
    
    
    function onSubmit(e){
       
        e.preventDefault()

        const formDataSubmit = new FormData()
            formDataSubmit.append("user_id", currentUser.id)
            formDataSubmit.append("fun_photo_file", uploadedFile)
            formDataSubmit.append("photo_caption", uploadedCaption)



        fetch('/user_personal_photos',{
            method:'POST',
            body: formDataSubmit
        })
        .then(res => {
            if(res.ok){
                res.json()
                .then((freshIdentity) => { 
                    console.log('hellow from an added photo state')
                    onDoneEditing()
                });
            } else {
            //Display errors
            // TO DO: ERROR POP UP
                res.json().then(data => setErrors(Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)))
                console.log('add a photo!')
            }
        })
    }

    return (
        <div>
            {errors?errors.map(e => <div>{e}</div>):null}
            <form onSubmit={onSubmit}>

                <label> this aint instagram but upload yoru sturpid photos anways </label>
                <input type='file' accept="image/*" onChange={(e) => setUploadedFile(e.target.files[0])}/>

                <br/><br/>

                <label> got any words about the photo </label>
                <input type='text' onChange={(e) => setUploadedCaption(e.target.value)}/>
                
                <br/><br/>

                <input type='submit' value='post it bro' />
            </form>
            {errors?errors.map(e => <h2 style={{color:'red'}}>{e.toUpperCase()}</h2>):null}
        </div>
    )
}