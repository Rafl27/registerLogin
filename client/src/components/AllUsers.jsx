import axios from 'axios'
import { useEffect, useState } from 'react'
import './AllUsers.css'

export const AllUsers = () => {
    const [userList, setUserList] = useState([{}])
    useEffect(() => {
        axios.get('http://localhost:3001/getallusers').then((response) => {
            console.log(console.log(response))
            setUserList(response.data)
        })
    }, [])

    const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/deleteuser/${id}`).then(() => {
            window.location.reload()
        })//above needs to be fixed
    }

    return (
        <>
            {
                userList.map((user) => {
                    return (
                        <>
                            <div className='registered-users'>
                                <h4>username:{user.username}</h4>
                                <p>password:{user.password}</p>
                                <button onClick={() => { deleteUser(user.id) }}>Delete</button>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}