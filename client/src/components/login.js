import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';

// CSS Stuff: make the input boxes NOT span, maybe smaller text in h2 and bigger input labels

function Login({onUpdateUser}) {
    
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
        const formDataSubmit = new FormData()
            formDataSubmit.append("username", user.username)
            formDataSubmit.append("password", user.password)
       console.log(user)
        fetch(`/login`,{
          method:'POST',
          body: formDataSubmit
        //   headers:{'Content-Type': 'application/json'},
        //   body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    onUpdateUser(user)
                    navigate('/browsetrips')
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

    const buttonClass = 'py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
    const linkClass = 'font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline'
    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
    const inputClass = 'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
    const headingClass = "mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
    const gradiantClass = 'text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'
    const smallerClass = "ml-1 font-semibold text-gray-500 dark:text-gray-400"

    return (
        <div className='p-4'> 
            <h1 className={headingClass}><span className={gradiantClass}> Welcome to Cycling Craziness  </span></h1>
            <h1 className={headingClass}><small className={smallerClass}>log in to find your bikepacking squad</small></h1>
            <form onSubmit={onSubmit} className="mb-5">
            <label className={labelClass}>
                username:
            </label>
            <input type='text' name='username' value={username} onChange={handleChange} className={inputClass} />
        
            <br/>

            <label className={labelClass}>
                password:
            </label>
            <input type='password' name='password' value={password} onChange={handleChange} className={inputClass}  />

            {errors? <div>{errors}</div>:null}

            <br/>         

            <button className={buttonClass}>
                <input type='submit' value='sup dawg' />
            </button>
        </form>

        


        <p>dont have an account?</p>
        <Link to={"/signup"} className={linkClass}>
            <i>get pedaling</i>
        </Link>
        </div>
    )
}

export default Login