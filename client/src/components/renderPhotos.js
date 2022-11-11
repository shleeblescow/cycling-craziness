import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function RenderPhotos({ thisPhoto }) {

    const [errors, setErrors] = useState([])
    const [thisPhotoPosted, setThisPhotoPosted] = useState(thisPhoto)

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

    console.log(thisPhoto)

    return (
        <>      
            <div>
                <img
                    src={thisPhotoPosted.fun_photo_file}
                    alt={"fun photo"}
                />
                <button 
                    onClick={destroyPhotoAH}>
                    delete photo
                </button>
            </div>
        </>
    )
}