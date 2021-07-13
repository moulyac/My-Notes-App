import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountGetMethod } from '../action/userGetMethod'

const Account = (props)=>{
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        dispatch(accountGetMethod())
    },[])
    return(
        <div class='mx-5 my-5' >
            <h1 style={{fontFamily:'monospace'}}><strong>User Account</strong></h1>
            <div class='mx-5 my-5' style={{fontFamily:'sans-serif'}}>
                <h3><strong>Email</strong> - {user.email}</h3>
                <h3><strong>UserName</strong> - {user.username}</h3>
            </div>
            
        </div>
    )
}
export default Account