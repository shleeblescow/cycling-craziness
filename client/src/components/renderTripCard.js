export default function RenderTripCard({ thisTrip, onButtonDrama }) {

    const cardDiv = "max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    const imgClass = 'rounded-t-lg object-cover h-48 w-96'
    const bigClassBlack = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
    const bigCLassGray = 'mb-2 text-2xl font-semibold tracking-tight text-gray-500 dark:text-white'
    const smallClass = 'mb-3 font-normal text-gray-700 dark:text-gray-400'
    const blueButtonClass = 'inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'


    return (
        <div className={cardDiv}>   
            <div onClick={onButtonDrama}>
                    {thisTrip.trip_photo_file ?
                        <img 
                            className={imgClass}
                            src={thisTrip.trip_photo_file}
                            alt={"trip photo"}
                        />
                    :
                        <img
                            className={imgClass}
                            src={thisTrip.route_photo}
                            alt={"bike photo"}
                        />
                    }
            </div>
            <div className='p-5'>
                <h2 className={bigClassBlack}>{thisTrip.trip_name}: <span className={bigCLassGray}><i>{thisTrip.location}</i></span></h2>
                <div className={smallClass}>
                    <p><b>Departure City:</b> {thisTrip.departure_city}</p>
                    <p><b>Departure Month:</b> {thisTrip.departure_month}</p>
                    <p><b>Final City:</b> {thisTrip.final_city}</p>
                    <p><i>{thisTrip.total_mileage} total miles - {thisTrip.total_vert} total vert</i></p>
                    <br/>
                    <div>
                        <button 
                            className={blueButtonClass}
                            onClick={onButtonDrama}>
                            more deets →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}