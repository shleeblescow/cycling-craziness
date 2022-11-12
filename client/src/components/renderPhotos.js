import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function RenderPhotos({ thisPhoto, currentUser }) {

    const [errors, setErrors] = useState([])

    function destroyPhotoAH() {
        fetch(`/userpersonalphotos/${thisPhoto.id}`,{
            method:'DELETE'
          })
          .then(res => {
              if(res.ok){
                console.log(`you may have deleted it from here but you can never really delete photos can you hahhahaehehheh`)
              }else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
              }
          })
    }

    console.log('this photo', thisPhoto)

    return (
        <>      
            <div>
                <img
                    src={thisPhoto.fun_photo_file}
                    alt={"fun photo"}
                />
                {thisPhoto.user_id == currentUser.id ?
                    <button 
                        onClick={destroyPhotoAH}>
                        delete photo
                    </button>
                    :
                    <></>
                }
            </div>
        </>
    )
}