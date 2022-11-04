import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function TripForm({currentUser}) {
    
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        link: '',
        trip_name: '',
        location: '',
        route_photo: '',
        total_mileage: undefined,
        total_vert: undefined,
        daily_mileage: undefined,
        est_total_weeks: undefined,
        departure_city: '',
        final_city: '',
        departure_month: '',
        about_trip: ''
    })

    const {link, trip_name, location, route_photo, total_mileage, total_vert, daily_mileage, est_total_weeks, departure_city, final_city, departure_month, about_trip} = formData
    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()
        const tripStuff = {
            "link": link,
            "trip_name": trip_name,
            "location": location,
            "route_photo": route_photo,
            "total_mileage": total_mileage,
            "total_vert": total_vert,
            "daily_mileage": daily_mileage,
            "est_total_weeks": est_total_weeks,
            "departure_city": departure_city,
            "final_city": final_city,
            "departure_month": departure_month,
            "about_trip": about_trip,
            "creator_id": currentUser.id
        }
       
        fetch(`/trips`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(tripStuff)
        })
        .then(res => {
            if(res.ok){
                res.json().then(tripStuff => {
                    console.log(`${tripStuff.name} is gooooiiinnngggg be sick`)
                    navigate('/browsetrips')


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
        <div>make a trip but no one is gonna sign up</div>

        <br/><br/>

        <form onSubmit={onSubmit}>

        <label>
        Trip Name
        </label>
        <input type='text' name='trip_name' value={trip_name} onChange={handleChange} />    
        
        <br/><br/>

        <label>
        Link
        </label>  
        <input type='text' name='link' value={link} onChange={handleChange} />
       
        <br/><br/>

        <label>
        Location
        </label>
        <input type='text' name='location' value={location} onChange={handleChange} />

        <br/><br/>

        <label>
        Route Photo
        </label>  
        <input type='text' name='route_photo' value={route_photo} onChange={handleChange} />

        <br/><br/>

        <label>
         Total Mileage
        </label>  
        <input type='integer' name='total_mileage' value={total_mileage} onChange={handleChange} />

        <br/><br/>

        <label>
         Total Vert
        </label>  
        <input type='integer' name='total_vert' value={total_vert} onChange={handleChange} />
       
       <br/><br/>

        <label>
         Daily Mileage
        </label>  
        <input type='integer' name='daily_mileage' value={daily_mileage} onChange={handleChange} />

        <br/><br/>

        <label>
         Total Trip Weeks
        </label>  
        <input type='integer' name='est_total_weeks' value={est_total_weeks} onChange={handleChange} />

        <br/><br/>

        <label>
         Departure City
        </label>  
        <input type='text' name='departure_city' value={departure_city} onChange={handleChange} />

        <br/><br/>

        <label>
         Final City
        </label>  
        <input type='text' name='final_city' value={final_city} onChange={handleChange} />

        <br/><br/>

        <label>
         Departure Month
        </label>  
        <input type='text' name='departure_month' value={departure_month} onChange={handleChange} />

        <br/><br/>

        <label>
         About the Trip
        </label>  
        <input type='text' name='about_trip' value={about_trip} onChange={handleChange} />

        <br/><br/>

        <input type='submit' value='good luck hehe LOSEr' />
      </form>
      {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}

      </>
    )
}