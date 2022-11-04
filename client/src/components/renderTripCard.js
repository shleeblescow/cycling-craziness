import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function RenderTripCard({ thisTrip, onButtonDrama }) {

    return (
        <>      
            <div>
                <img
                    src={thisTrip.route_photo}
                    alt={"route photo"}
                />
            </div>
            <h2>{thisTrip.trip_name}: <span>{thisTrip.location}</span></h2>
            <p>Departing from: {thisTrip.departure_city} in {thisTrip.departure_month}</p>
            <p>Ending in: {thisTrip.final_city}</p>
            <p>{thisTrip.total_mileage} total miles - {thisTrip.total_vert} total vert</p>
            <div>
                <button 
                    onClick={onButtonDrama}>
                    more deets pls
                </button>
            </div>
        </>
    )
}