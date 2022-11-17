import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfileForm({ onUpdatingIdentity, currentUser, onDoneEditing }) {

    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        age: undefined,
        hometown:'',
        bio:'',
        bikepacking_method:''
      })

    const [uploadedFile, setUploadedFile] = useState(null)
    const [appendImg, setAppendImg] = useState(false)

    useEffect(() => {
        fetch(`/users/${currentUser.id}`)
        .then(res => res.json())
        .then(setFormData)
        setUploadedFile(currentUser.profile_pic_file)
    },[])
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImgChange = (e) => {
        setUploadedFile(e.target.files[0])
        setAppendImg(() => true)
    }
    
    function onSubmit(e){
       
        e.preventDefault()

        const formDataSubmit = new FormData()
            formDataSubmit.append("age", formData.age)
            formDataSubmit.append("hometown", formData.hometown)
            formDataSubmit.append("bio", formData.bio)
            formDataSubmit.append("bikepacking_method", formData.bikepacking_method)
            if (appendImg) {
                formDataSubmit.append("profile_pic_file", uploadedFile)
            }


        fetch(`/users/${currentUser.id}`,{
            method:'PATCH',
            // headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(formData)
            body: formDataSubmit
        })
        .then(res => {
            if(res.ok){
                res.json()
                .then((freshIdentity) => { 
                    onDoneEditing()
                    onUpdatingIdentity(freshIdentity)
                });
            } else {
                //Display errors
                res.json().then(data => setErrors(Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)))
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
                
                <label className={labelClass}>your hometown:</label>
                <input type='text' name='hometown' value={formData.hometown} className={textClass} onChange={handleChange} />
                
                <br/>

                <label className={labelClass}>your age:</label>
                <input type='integer' name='age' value={formData.age} className={textClass} onChange={handleChange} />
                
                <br/><br/>

                <label className={labelClass}>your life story:</label>
                <textarea type='text' name='bio' value={formData.bio} rows="2"  className={textClass} onChange={handleChange} />
                
                <br/><br/>

                <label className={labelClass}>your bikepacking style:</label>
                <textarea type='text' name='bikepacking_method' value={formData.bikepacking_method} rows="2" className={textClass} onChange={handleChange} />

                <br/><br/>

                <label className={labelClass}> upload a profile picture </label>
                <input type='file' accept="image/*" className={fileClass} onChange={handleImgChange}/>

                <br/><br/>

                <button className={blueButtonClass}>
                    <input type='submit' value='save changes'/>
                </button>
            </form>
            {errors?errors.map(e => <h2 style={{color:'red'}}>{e.toUpperCase()}</h2>):null}
        </div>
    )
}