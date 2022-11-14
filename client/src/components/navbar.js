import { useNavigate } from 'react-router-dom';

export default function Navbar({setCurrentUser, currentUser}) {

    const navigate = useNavigate()

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(setCurrentUser(false))
        .then(navigate('/'))
    }

    function moreNavDrama() {
        navigate(`/profile/${currentUser.id}`)
    }

    function andMoreNavDrama() {
        navigate("/browsetrips/create")
    }

    function navDrama(){
        navigate('/browsetrips')
    }

    const buttonClass = 'py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg rounded-r-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'

    return (
        
        <div className="inline-flex rounded-md shadow-sm p-4" role="group">

            <button onClick={handleSignout} className={buttonClass}>
                logout
            </button>


            <button onClick={moreNavDrama} className={buttonClass}>
                my profile
            </button>

            <button onClick={andMoreNavDrama} className={buttonClass}>
                post a trip
            </button>

            <button onClick={navDrama} className={buttonClass}>
                all trips
            </button>



        </div>

    )
}