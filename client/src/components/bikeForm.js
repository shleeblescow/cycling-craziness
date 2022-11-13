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

    return (
        <> 
        <div>you think your bike is really that cool, huh?  LOSER</div>

        <br/><br/>

        <form onSubmit={onSubmit}>

        <label>
        you gave your bike a name !!??
        </label>
        <input type='text' name='bike_name' value={formData.bike_name} onChange={handleChange} />    
        
        <br/><br/>

        <label>
        now youre gonna get policital about it
        </label>  
        <input type='text' name='brand' value={formData.brand} onChange={handleChange} />
       
        <br/><br/>

        <label>
        gravel mtb road whatver you chose is the bad one
        </label>
        <input type='text' name='bike_type' value={formData.bike_type} onChange={handleChange} />

        <br/><br/>

        <label>
        like anyone know what your arbitrary bike model is
        </label>  
        <input type='text' name='model' value={formData.model} onChange={handleChange} />

        <br/><br/>

        <label>
        ofc you have a photo of it, loser, upload it here in whatever format
        </label>  
        <input type='file' accept="image/*" onChange={(e) => setBikePhotoFile(e.target.files[0])} />

        <br/>

        <p>OR</p>

        <label>
        you really don't have a photo saved of it?  if you really want you can upload a link to a photo of it I guess...
        </label>  
        <input type='text' name='bike_photo' value={formData.bike_photo} onChange={handleChange} />

        <br/><br/>

        <input type='submit' value='everyone hates your bike' />
      </form>
      {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}

      </>
    )
}