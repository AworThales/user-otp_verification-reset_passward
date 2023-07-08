import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../images/profile.png';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate'
import { registerValidate } from '../helper/validate'
import { convertImageToBase64 } from '../helper/converter'
import { useAuthStore } from '../store/store'
import { updateUser } from '../helper/helper';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'
import useFetch from '../hooks/fetch.hook.js';

export default function Profile() {

  const [file, setFile] = useState();
  // const {username} = useAuthStore(state => state.auth);
  // const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const [{ isLoading, apiData, serverError }] = useFetch();

  
  // const navigate = useNavigate();
  // const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      mobile: apiData?.mobile || '',
      email: apiData?.email || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, {profle: file || apiData?.profile || ''});
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating...!',
        success: <b>Update Succesfully...!</b>,
        error: <b>Couldn't update!</b>
      });
    }
  })

  // formik does not support file upload so we create handle
  const onUpload = async (e) => {
    const base64 = await convertImageToBase64(e.target.files[0]);
    setFile(base64);
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;


  return (
    <div className="container py-1 mx-auto" >

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center py-0 items-center h-screen' style={{height:"50%"}}>
        <div className={`${styles.glass} ${extend.glass}`}>

          <div className="title flex flex-col items-center">
            <h4 className='text-xl font-bold'>My Profile</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              You can update your details
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor='profile'>
                    <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>
                  <input type='file' id='profile' name='profile' onChange={onUpload} />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName*' />
                  <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName*' />
                </div>

                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No*' />
                  <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                </div>

                <div className='name flex w-3/4 gap-10'>
                  <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address*' />
                </div>
                  <button className={styles.btn} type='submit'>Update</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Come back later <Link className='text-red-500' to="/">Logout</Link></span>
              </div>
 
          </form>

        </div>
        
      </div>
      
    </div>
  )
}
