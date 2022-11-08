import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfileForm({ currentUser, onDoneEditing }) {

    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        age: undefined,
        hometown:'',
        bio:'',
        bikepacking_method:'',
       // profile_pic: undefined
      })
    
    useEffect(() => {
        fetch(`/users/${currentUser.id}`)
        .then(res => res.json())
        .then(setFormData)
    },[])
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleChangeProfilePic = (e) => {
        const { name, files } = e.target
        setFormData({...formData, [name]: files[0]})
    }
    
    
    function onSubmit(e){
        e.preventDefault()
        fetch(`/users/${currentUser.id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
        })
        .then(res => {
            if(res.ok){
                console.log('hellow from an updated state')
                onDoneEditing()
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
                <label>in what city is your LBS</label>
                <input type='text' name='hometown' value={formData.hometown} onChange={handleChange} />
                
                <br/><br/>

                <label>ya old</label>
                <input type='integer' name='age' value={formData.age} onChange={handleChange} />
                
                <br/><br/>

                <label>what are you all about man</label>
                <input type='text' name='bio' value={formData.bio} onChange={handleChange} />
                
                <br/><br/>

                <label>what's you stryle bru</label>
                <input type='text' name='bikepacking_method' value={formData.bikepacking_method} onChange={handleChange} />

                <br/><br/>

                {/* <label> upload a sick prof pic dude </label>
                <input type="file" name="profile_pic" value={formData.profile_pic} onChange={handleChangeProfilePic}/> */}

                <br/><br/>

                <input type='submit' value='send the change' />
            </form>
            {errors?errors.map(e => <h2 style={{color:'red'}}>{e.toUpperCase()}</h2>):null}
        </div>
    )
}