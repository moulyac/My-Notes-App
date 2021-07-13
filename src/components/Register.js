import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  postMethodRegister, stateRegister } from '../action/postmethod';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'


const Register = (props)=>{
const register = useSelector((state)=>{
    return state.userRegister
})
console.log(register)

useEffect(()=>{
    if(register){
        props.history.push('/')
        dispatch(stateRegister(false))
    }
},[register])
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
                  .min(8, 'password must be greater than 8 characters')
                  .required('Required')
        }),
    
        onSubmit: (values, {resetForm}) => {
            dispatch(postMethodRegister(values))
            resetForm({values : ''})
        },
      });

    return (
        <div class="mt-3">
        <div class="border">
            <h2 style={{textAlign:'center'}} class='mt-2'>Register form</h2>
            <form onSubmit={formik.handleSubmit} className='form' >
                <div class="mb-3">
                    <input
                        class="form-control"
                        type='text'
                        placeholder='enter username'
                        name='username'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        style={formik.touched.username && formik.errors.username && {borderColor:"red"}}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <small>{formik.errors.username}</small>
                    ) : null}
                </div>
                
                <div class="mb-3">
                    <input
                        class="form-control"
                        type='text'
                        placeholder='enter email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        style={formik.touched.email && formik.errors.email && {borderColor:"red"}}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <small>{formik.errors.email}</small>
                    ) : null}
                </div>

                <div class="mb-3">
                    <input
                        class="form-control"
                        type='password'
                        placeholder='enter password'
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        style={formik.touched.password && formik.errors.password && {borderColor:"red"}}      
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <small>{formik.errors.password}</small>
                    ) : null}
                </div>
                
                <input class="btn btn-primary" type='submit'/>
            </form>
        </div>
        </div>
    )
}

export default Register