import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function RenderPhotos({ thisPhoto, currentUser, onDelete }) {

    const [errors, setErrors] = useState([])

    function destroyPhotoAH() {
        fetch(`/user_personal_photos/${thisPhoto.id}`,{
            method:'DELETE'
          })
          .then(res => {
              if(res.ok){
                console.log(`you may have deleted it from here but you can never really delete photos can you hahhahaehehheh`)
                onDelete()
              }else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    const blueButtonClass = 'mt-2 center-flex items-center py-2 px-3 text-sm font-xsm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    const imgClass = 'rounded-t-lg rounded-b-lg object-cover h-48 w-96'

    // console.log('this photo', thisPhoto)

    return (
        <div>     
            <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                <img className={imgClass} src={thisPhoto.fun_photo_file} alt="user image unavaliable" />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    <p>{thisPhoto.photo_caption}</p>
                    {thisPhoto.user_id == currentUser.id ?
                    <button 
                        className={blueButtonClass}
                        onClick={destroyPhotoAH}>
                        delete photo
                    </button>
                    :
                    <></>
                }
                </figcaption>
            </figure>
        </div>
    )
}