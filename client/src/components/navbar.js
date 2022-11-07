import { useNavigate } from 'react-router-dom';

export default function Navbar({currentUser}) {

    const navigate = useNavigate()

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    function moreNavDrama() {
        navigate(`/users/${currentUser.id}`)
    }

    function andMoreNavDrama() {
        navigate("/browsetrips/create")
    }

    function navDrama(){
        navigate('/browsetrips')
    }

    return (
        
        <div>

            <button onClick={handleSignout}>
                get out of here GROSS
            </button>


            <button onClick={moreNavDrama}>
                let me look at how cool I am, see me thru their eyes
            </button>

            <button onClick={andMoreNavDrama}>
                post a trip
            </button>

            <button onClick={navDrama}>
                {'<~'} nvm take me back to the other trips
            </button>



        </div>

    )
}