import React from 'react'
import { Link, Route, withRouter, Redirect } from 'react-router-dom'
import { CgNotes } from 'react-icons/cg'
import Login from './Login'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'
import Account from './Account'
import MyNotes from './MyNotes'
import { stateLogin } from '../action/postmethod'
import './style.css'

const Home = (props)=>{
    const login = useSelector((state)=>{
        return state.userLogin
    })
    const dispatch = useDispatch()
    return (
        <div>
            {
                !login&&
                <>
                    <div className='row'>
                    <Link to='/' className='col-7' style={{fontFamily:"'Special Elite', cursive", color:'black', fontSize:'5rem' }}>My Notes App <CgNotes/></Link>
                    
                    <div className='col-4'  style={{textAlign:'right'}}>
                     
                        <>
                            <Link to='/login'><small>SignIn</small></Link> / 
                            <Link to='/register'><small> SignUp</small></Link>
                            <Route path='/login' component={Login} exact={true} />
                            <Route path='/register' component={Register} exact={true}/>
                        </>
                        
                    </div>
            </div>
                </>
            }
            

            {
                login &&
                <>
                    <div>
                        <h1 style={{fontFamily:"'Special Elite', cursive", textAlign:'center', fontSize:'4rem'}}>My Notes App <CgNotes/></h1>
                    </div>
                    <div>
                        <Link to='/account'>Account</Link> |
                        <Link to='/notes'> Notes</Link> |
                        <Link onClick={()=>{
                                localStorage.removeItem('token')
                                dispatch(stateLogin(false))
                                props.history.push('/')
                                alert('successfully logged out')
                            }}
                        > Logout</Link> 

                        <Route path='/account' render={(props)=>{
                            return login? <Account {...props} /> : <Login {...props}
                            />
                        }}/>
                        <Route path='/notes' render={(props)=>{
                            return login? <MyNotes {...props} /> : <Login {...props}
                            />
                        }}/>
                    </div>
                </>
            }
        </div>

        
    )
}

export default withRouter(Home)