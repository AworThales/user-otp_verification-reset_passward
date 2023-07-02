import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../images/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidated } from '../helper/validate'
import { convertImageToBase64 } from '../helper/converter'
// import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Register() {

  const [file, setFile] = useState(); 

  // const navigate = useNavigate();
  // const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username: '',
      email: '',
      password : ''
    },
    validate : passwordValidated,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, {profle: file || ''})
    }
  })

  // formik does not support file upload so we create handle
  const onUpload = async (e) => {
    const base64 = await convertImageToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container py-1 mx-auto" >

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center py-0 items-center h-screen' style={{height:"50%"}}>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-xl font-bold'>Register</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor='profile'>
                    <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>
                  <input type='file' id='profile' name='profile' onChange={onUpload} />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input value={formik.values.password} {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />
                  <input value={formik.values.password} {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                  <input value={formik.values.password} {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password*' />
                  <button className={styles.btn} type='submit'>Register</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already register? <Link className='text-red-500' to="/">Login Now</Link></span>
              </div>

          </form>

        </div>
        
      </div>
      
    </div>
  )
}
