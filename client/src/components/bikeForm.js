// attributes :id, :bike_name, :brand, :type, :model, :bike_photo, :user_id

import React, { useState, useEffect } from 'react';

export default function BikeForm({currentUser, onClickDramaBike, dramaType}){

    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        bike_name: '',
        brand: '',
        bike_type: '',
        model: '',
        bike_photo: ''
    })

    const [bikePhotoFile, setBikePhotoFile] = useState(null)

    useEffect(() => {
        if (dramaType == "post") {
            const {bike_name, brand, type, model} = formData
        } else {
            setFormData(dramaType)
        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    function onSubmit(e){
        e.preventDefault()
        
        const bikeStuff = {
            "bike_name": formData.bike_name,
            "brand": formData.brand,
            "bike_type": formData.bike_type,
            "model": formData.model,
            "bike_photo": formData.bike_photo,
            "user_id": currentUser.id
        }

        const formDataSubmit = new FormData()
            formDataSubmit.append("bike_name", formData.bike_name)
            formDataSubmit.append("brand", formData.brand)
            formDataSubmit.append("bike_type", formData.bike_type)
            formDataSubmit.append("model", formData.model)
            formDataSubmit.append("bike_photo", formData.bike_photo)
            formDataSubmit.append("user_id", currentUser.id)
            if (bikePhotoFile) {
                formDataSubmit.append("bike_photo_file", bikePhotoFile)
            }

        onClickDramaBike(bikeStuff, formDataSubmit)
    }

    const fileClass = "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    const textClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

    return (
        <>

        <br/>

        <form onSubmit={onSubmit}>

        <label className={labelClass}>
        your bike's name:
        </label>
        <input type='text' name='bike_name' value={formData.bike_name} className={textClass} onChange={handleChange} />    
        
        <br/><br/>

        <label className={labelClass}>
        your bike's brand:
        </label>  
        <input type='text' name='brand' value={formData.brand} className={textClass} onChange={handleChange} />
       
        <br/><br/>

        <label className={labelClass}>
        type of bike {"(road, mtb, etc)"}:
        </label>
        <input type='text' name='bike_type' value={formData.bike_type} className={textClass} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
        bike model:
        </label>  
        <input type='text' name='model' value={formData.model} className={textClass} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
        bike photo {'(any img type accepted)'}:
        </label>  
        <input type='file' accept="image/*" className={fileClass} onChange={(e) => setBikePhotoFile(e.target.files[0])} />

        <br/><br/>

        <p>OR</p>

        <br/>

        <label className={labelClass}>
        link to photo of bike
        </label>  
        <input type='text' name='bike_photo' value={formData.bike_photo} className={textClass} onChange={handleChange} />

        <br/><br/>

        <button className={blueButtonClass}>
                    <input type='submit' value='save changes'/>
        </button>

      </form>
      {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}

      </>
    )
}