import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import {useHistory} from 'react-router-dom'

export default function SignUp({onUpdateUser}) {
    
    // const history = useHistory()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    })

    const {name, username, password} = formData
    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()
        const user = {
            "username": username,
            "password": password,
            "name": name
        }
       
        fetch(`/users`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    console.log(`${user.username} is logged in hell yeah bruuther`)
                    onUpdateUser(user)
                    navigate('/browsetrips')
                    // history.push(`/users/${user.id}`)
                })
            }else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
            }
        })
       
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <> 
        <div>howdy from Signup bitches stoopppud you don't even have an account yet</div>
        <form onSubmit={onSubmit}>

        <label>
         Name
        </label>
        <input type='text' name='name' value={name} onChange={handleChange} />    
        
        <label>
          Username
        </label>  
        <input type='text' name='username' value={username} onChange={handleChange} />
       
        <label>
         Password
        </label>
        <input type='password' name='password' value={password} onChange={handleChange} />

        {/* <label>
         Age
        </label>
        <input type='number' name='name' value={name} onChange={handleChange} />
       
        <label>
         Hometown/Location
        </label>
        <input type='text' name='name' value={name} onChange={handleChange} />
       
        <label>
         About You
        </label>
        <input type='text' name='name' value={name} onChange={handleChange} />
       
        <label>
         How do you like to Bikepack?
        </label>
        <input type='text' name='name' value={name} onChange={handleChange} />
       
        <label>
         Name
        </label>
        <input type='text' name='name' value={name} onChange={handleChange} /> */}
       
        <input type='submit' value='Sign up!' />
      </form>
      {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}
        </>
    )
}
