import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
// import {useHistory} from 'react-router-dom'


function Login({onUpdateUser}) {
    
    //const history = useHistory()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    const {username, password} = formData
    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
       console.log(user)
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    onUpdateUser(user)
                    navigate('/browsetrips')
                    // history.push(`/users/${user.id}`)
                })
            }else {
                res.json().then(json => setErrors(json.errors))
            }
        })
       
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }
    return (
        <> 
            <form onSubmit={onSubmit}>
            <label>
                username:
            </label>
            <input type='text' name='username' value={username} onChange={handleChange} />
        
            <label>
                password:
            </label>
            <input type='password' name='password' value={password} onChange={handleChange} />
        
        
            <input type='submit' value='sup dawg' />
        </form>
        {errors? <div>{errors}</div>:null}
        <p>dont have an accnt?</p>
        <button onClick={() => navigate("/signup")}>
            <i>Saddle up</i>
        </button>
        </>
    )
}

export default Login