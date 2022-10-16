import './sign-up-form.styles.scss'
import { async } from '@firebase/util';
import React, { useState, useContext } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input.component.jsx/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../contexts/user.context';
const defaultFormFields = { //default i.e. empty form 
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;//destructuring formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields); //again reseting the form after submitting
  }

  const handleSubmit = async (event) =>{
    event.preventDefault(); //prevent default behaviour of submit button
    if(password !== confirmPassword) {
      alert("password do not match")
      return;
    }
    try {
      const {user} = createAuthUserWithEmailAndPassword(email, password)     
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        console.log('Email already in use')
      } else {
        console.log('user creation encountered an error',error);
      }
    
    }
  }
  // console.log(formFields);
  const handleChange = (event) => { //on changing the input value
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})//put value in the name keyword
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email & password</span>
      <form onSubmit={handleSubmit }>

        
        <FormInput 
        label="Display Name"
        type="text" 
        required 
        onChange={handleChange} 
        name="displayName" 
        value={displayName}
        /> 

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

        <FormInput 
        label="Confirm Password"
        type="password" 
        required 
        onChange={handleChange} 
        name="confirmPassword" 
        value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>


    </div>
  )
}

export default SignUpForm
