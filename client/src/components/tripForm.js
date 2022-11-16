import React, {useState, useEffect} from 'react'

export default function TripForm({currentUser, onClickDrama, dramaType, buttonText}) {
    
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

        console.log('form data in on submit', formData)
        
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
            if (tripPhotoFile) {
                formDataSubmit.append("trip_photo_file", tripPhotoFile)
            }

        onClickDrama(tripStuff, formDataSubmit)
    }

    const fileClass = "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    const textClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'


    return (
        <div className='p-4'> 

        <form onSubmit={onSubmit}>

        <label className={labelClass}>
        Trip Name
        </label>
        <input className={textClass} type='text' name='trip_name' value={formData.trip_name} onChange={handleChange} />    
        
        <br/><br/>

        <label className={labelClass}>
        Link <i>(optional)</i>
        </label>  
        <input className={textClass} type='text' name='link' value={formData.link} onChange={handleChange} />
       
        <br/><br/>

        <label className={labelClass}>
        Location
        </label>
        <input className={textClass} type='text' name='location' value={formData.location} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
        Route Photo Link Upload
        </label>  
        <input className={textClass} type='text' name='route_photo' value={formData.route_photo} onChange={handleChange} />

        <br/>

        <p><i>-OR-</i></p>

        <br/>

        <label className={labelClass}>
         Route Photo File Upload <i>jpeg, img, etc.</i>
         </label>
        <input className={fileClass} type='file' accept="image/*" onChange={(e) => setTripPhotoFile(e.target.files[0])} />

        <br/><br/>

        <label className={labelClass}>
         Total Mileage
        </label>  
        <input className={textClass} type='integer' name='total_mileage' value={formData.total_mileage} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
         Total Vert
        </label>  
        <input className={textClass} type='integer' name='total_vert' value={formData.total_vert} onChange={handleChange} />
       
       <br/><br/>

        <label className={labelClass}>
         Daily Mileage
        </label>  
        <input className={textClass} type='integer' name='daily_mileage' value={formData.daily_mileage} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
         Total Trip Weeks
        </label>  
        <input className={textClass} type='integer' name='est_total_weeks' value={formData.est_total_weeks} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
         Departure City
        </label>  
        <input className={textClass} type='text' name='departure_city' value={formData.departure_city} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
         Final City
        </label>  
        <input className={textClass} type='text' name='final_city' value={formData.final_city} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
         Departure Month
        </label>  
        <input className={textClass} type='text' name='departure_month' value={formData.departure_month} onChange={handleChange} />

        <br/><br/>

        <label className={labelClass}>
         About the Trip
        </label>  
        <input className={textClass} type='text' name='about_trip' value={formData.about_trip} onChange={handleChange} />

        <br/><br/>

        <button className={blueButtonClass}>
                    <input type='submit' value={buttonText}/>
        </button>

      </form>
      {errors?errors.map(e => <div>{e[0]+': ' + e[1]}</div>):null}

      </div>
    )
}