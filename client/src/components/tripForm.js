import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function TripForm({currentUser, onClickDrama, dramaType}) {
    
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

    const [tripPhotoFile, setTripPhotoFile] = useState(null)

    useEffect(() => {
        if (dramaType == "post") {
            const {link, trip_name, location, route_photo, total_mileage, total_vert, daily_mileage, est_total_weeks, departure_city, final_city, departure_month, about_trip} = formData
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
        
        const tripStuff = {
            "link": formData.link,
            "trip_name": formData.trip_name,
            "location": formData.location,
            "route_photo": formData.route_photo,
            "total_mileage": formData.total_mileage,
            "total_vert": formData.total_vert,
            "daily_mileage": formData.daily_mileage,
            "est_total_weeks": formData.est_total_weeks,
            "departure_city": formData.departure_city,
            "final_city": formData.final_city,
            "departure_month": formData.departure_month,
            "about_trip": formData.about_trip,
            "creator_id": currentUser.id,
            "trip_photo_file": tripPhotoFile
        }

        const formDataSubmit = new FormData()
            formDataSubmit.append("link", formData.link)
            formDataSubmit.append("trip_name", formData.trip_name)
            formDataSubmit.append("location", formData.location)
            formDataSubmit.append("route_photo", formData.route_photo)
            formDataSubmit.append("total_mileage", formData.total_mileage)
            formDataSubmit.append("total_vert", formData.total_vert)
            formDataSubmit.append("daily_mileage", formData.daily_mileage)
            formDataSubmit.append("est_total_weeks", formData.est_total_weeks)
            formDataSubmit.append("departure_city", formData.departure_city)
            formDataSubmit.append("final_city", formData.final_city)
            formDataSubmit.append("departure_month", formData.departure_month)
            formDataSubmit.append("about_trip", formData.about_trip)
            formDataSubmit.append("creator_id", currentUser.id)
            formDataSubmit.append("trip_photo_file", tripPhotoFile)

        onClickDrama(tripStuff, formDataSubmit)
    }

    return (
        <> 
        <div>trip info but no one is gonna sign up</div>

        <br/><br/>

        <form onSubmit={onSubmit}>

        <label>
        Trip Name
        </label>
        <input type='text' name='trip_name' value={formData.trip_name} onChange={handleChange} />    
        
        <br/><br/>

        <label>
        Link
        </label>  
        <input type='text' name='link' value={formData.link} onChange={handleChange} />
       
        <br/><br/>

        <label>
        Location
        </label>
        <input type='text' name='location' value={formData.location} onChange={handleChange} />

        <br/><br/>

        <label>
        Route Photo Link Upload
        </label>  
        <input type='text' name='route_photo' value={formData.route_photo} onChange={handleChange} />

        <br/>

        <p>OR</p>

        <label>
         {"your own personal photo of the route wow (screenshot, jpeg, whatevs')"}
        </label>  
        <input type='file' accept="image/*" onChange={(e) => setTripPhotoFile(e.target.files[0])} />

        <br/><br/>

        <label>
         Total Mileage
        </label>  
        <input type='integer' name='total_mileage' value={formData.total_mileage} onChange={handleChange} />

        <br/><br/>

        <label>
         Total Vert
        </label>  
        <input type='integer' name='total_vert' value={formData.total_vert} onChange={handleChange} />
       
       <br/><br/>

        <label>
         Daily Mileage
        </label>  
        <input type='integer' name='daily_mileage' value={formData.daily_mileage} onChange={handleChange} />

        <br/><br/>

        <label>
         Total Trip Weeks
        </label>  
        <input type='integer' name='est_total_weeks' value={formData.est_total_weeks} onChange={handleChange} />

        <br/><br/>

        <label>
         Departure City
        </label>  
        <input type='text' name='departure_city' value={formData.departure_city} onChange={handleChange} />

        <br/><br/>

        <label>
         Final City
        </label>  
        <input type='text' name='final_city' value={formData.final_city} onChange={handleChange} />

        <br/><br/>

        <label>
         Departure Month
        </label>  
        <input type='text' name='departure_month' value={formData.departure_month} onChange={handleChange} />

        <br/><br/>

        <label>
         About the Trip
        </label>  
        <input type='text' name='about_trip' value={formData.about_trip} onChange={handleChange} />

        <br/><br/>

        <input type='submit' value='good luck hehe LOSEr' />
      </form>
      {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}

      </>
    )
}