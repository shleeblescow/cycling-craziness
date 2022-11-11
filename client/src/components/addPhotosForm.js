import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPhotosForm({ currentUser, onDoneEditing }) {

    const [errors, setErrors] = useState([])

    const [uploadedFile, setUploadedFile] = useState(null)
    
    
    function onSubmit(e){
       
        e.preventDefault()

        const formDataSubmit = new FormData()
            formDataSubmit.append("user_id", currentUser.id)
            formDataSubmit.append("profile_pic_file", uploadedFile)



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
                res.json().then(data => setErrors(Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)))
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

                <input type='submit' value='post it bro' />
            </form>
            {errors?errors.map(e => <h2 style={{color:'red'}}>{e.toUpperCase()}</h2>):null}
        </div>
    )
}