import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import EditProfileForm from './editProfileForm';

export default function SignUp({onUpdateUser, onUpdatingIdentity}) {
    
    const [isSaddled, setIsSaddled] = useState(false)
    const [userToPass, setUserToPass] = useState({})
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
                    setUserToPass(user)
                    setIsSaddled(() => !isSaddled)
                })
            } else {
                // TO DO: ERROR POP UP
                // res.json().then(retErrors => {
                //     setErrors(Object.entries(retErrors.errors))
                //     console.log(retErrors)
                // })
                res.json().then(json => setErrors(Object.entries(json.errors)))
            }
        })
    }

    function handleDoneEditing() {
        navigate('/browsetrips')
    }

    function navToLI() {
        navigate('/')
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    const textClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    const bigClassBlack = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
    const medClassBlack = 'mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'



    // const errorPopUpSignup = (
    //     <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
    //          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    //          <span class="sr-only">Infor</span>
    //          <div>
    //              <span class="font-medium">Whoops!</span> Please add your name, username, and password to signup!
    //          </div>
    //     </div>
    // )


    return (
        <div className='p-4'> 
                {isSaddled ?
                    <div>
                        <h1 className={bigClassBlack}>welcome to Cycling Craziness, {formData.username}!</h1>
                        <i className={medClassBlack}>add some details to your profile</i>
                        <EditProfileForm
                            currentUser={userToPass}
                            onDoneEditing={handleDoneEditing}
                        />
                        <div className='p-4'>
                            <button className={blueButtonClass} onClick={handleDoneEditing}>
                                just take me to the trips →
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <h1 className={bigClassBlack}>enter a usesrname and password to make an account</h1>
                
                            <form onSubmit={onSubmit}>

                            <label className={labelClass}>
                            your name
                            </label>
                            <input type='text' name='name' value={name} onChange={handleChange} />    
                            
                            <br/><br/>

                            <label className={labelClass}>
                            your username
                            </label>  
                            <input type='text' name='username' value={username} onChange={handleChange} />
                        
                            <br/><br/>

                            <label className={labelClass}>
                            create a password
                            </label>
                            <input type='password' name='password' value={password} onChange={handleChange} />
                        
                            <br/><br/>

                            <button className={blueButtonClass}>
                                    <input type='submit' value='create account!'/>
                            </button>

                        </form>
                        {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}
                        <div className='p-4'>
                            <button className={blueButtonClass} onClick={navToLI}>
                                ← back to login page
                            </button>
                        </div>
                    </div>
                }
        </div>
    )
}
