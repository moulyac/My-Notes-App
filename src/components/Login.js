import React, { useState }  from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { postMethodLogin } from '../action/postmethod'

const Login = (props)=>{
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
 //   const [error, seterror] =useState('')

    const login = useSelector((state)=>{
        return state.userLogin
    })

    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()

        const formData = {
            email: email,
            password: password
        }
        //console.log(formData)

        dispatch(postMethodLogin(formData))

        if(login){
            props.history.push('/account')
        }
    }

    const handleChange = (e)=>{
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }
    return (
        <div class='mt-3'>
        <div class="border">
            <h2 style={{textAlign:'center'}} class='mt-2'>Login</h2>
            <form onSubmit={handleSubmit} className='form'>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input
                        class="form-control"
                        type='email'
                        placeholder='enter email'
                        value={email}
                        name='email'
                        onChange={handleChange}
                    />
                </div>
            
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                        class="form-control"
                        type='password'
                        placeholder='enter password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                    />
                </div>
                
                
                {/* { error? <small>{error}</small> : null } */}

                <br/>

                <input class="btn btn-primary" type='submit'/>

            </form>
        </div>
        </div>
    )
}

export default Login