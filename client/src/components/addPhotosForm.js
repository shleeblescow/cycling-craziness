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

    const fileClass = "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    const textClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

    return (
        <div className='p-4'>
            {errors?errors.map(e => <div>{e}</div>):null}
            <form onSubmit={onSubmit}>

                <label className={labelClass}>
                     Photo File <i>jpeg, img, etc.</i> 
                </label>
                <input className={fileClass} type='file' accept="image/*" onChange={(e) => setUploadedFile(e.target.files[0])}/>

                <br/><br/>

                <label className={labelClass}>
                    Photo Caption 
                </label>
                <input className={textClass} type='text' onChange={(e) => setUploadedCaption(e.target.value)}/>
                
                <br/><br/>

                <button className={blueButtonClass}>
                    <input type='submit' value='Post Photo'/>
                </button>
            </form>
            {errors?errors.map(e => <h2 style={{color:'red'}}>{e.toUpperCase()}</h2>):null}
        </div>
    )
}