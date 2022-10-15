import './sign-in-form.styles.scss'
import { async } from '@firebase/util';
import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input.component.jsx/form-input.component';
import Button from '../button/button.component';
import { signInWithGooglePopup, singInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
  email: '',
  password: ''
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const SignInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    
    try {
     const response = await singInAuthUserWithEmailAndPassword(email, password)
     console.log(response)
      resetFormFields();
    } catch (error) {
     
    
    }
  }


  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email & password</span>
      <form onSubmit={handleSubmit }>

        <FormInput 
        label="Email"
        type="email" 
        required 
        onChange={handleChange} 
        name="email" 
        value={email}
        />

        <FormInput 
        label="Password"
        type="password" 
        required 
        onChange={handleChange} 
        name="password" 
        value={password}
        />

        <div className='buttons-container'>

          <Button type='submit'>Sign In</Button>
          <Button buttonType='google' onClick={SignInWithGoogle}>Google Sign In</Button>
        </div>
      </form>


    </div>
  )
}

export default SignInForm
