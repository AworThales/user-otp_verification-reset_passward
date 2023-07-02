import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../images/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from '../helper/validate'
// import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Reset() {

  // const navigate = useNavigate();
  // const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pass: ''
    },
    validate : resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      console.log(values)
    }
  })

  return (
    <div className="container py-1 mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center py-0 items-center h-screen'>
        <div className={styles.glass} style={{width:"50%"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-xl font-bold'>Reset</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              Enter your password
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
              
              <div className="textbox flex flex-col items-center gap-6">
                  <input value={formik.values.password} {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />
                  <input value={formik.values.password} {...formik.getFieldProps('confirm_pass')} className={styles.textbox} type="text" placeholder='Repeat Password' />
                  <button className={styles.btn} type='submit'>Reset</button>
              </div>
          </form>

        </div>
        
      </div>
      
    </div>
  )
}
