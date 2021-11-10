import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
function id() {

    const router = useRouter();
    const {id} = router.query;
    console.log('hello')
    async function getUrl() {
        try {
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "id":id,
                })}
            const result = await fetch('http://localhost:5000/findurl', options)
            const data = await result.json()
            window.location.href = `https://${data.url}`
        }
        catch(err) {
            console.log(err)
        }
    }
    getUrl()
    
    return (
        <div>
           Loading page...
        </div>
    )
}

export default id
