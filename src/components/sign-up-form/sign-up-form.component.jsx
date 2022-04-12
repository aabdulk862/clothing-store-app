import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
const defaultFormFields= {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword}= formFields;

    console.log(formFields);
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
                alert('passwords do not match')
                return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await creatUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            }
            console.error('something went wrong :( ',error);
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value })
    }

    return(
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <label ></label>
                <FormInput label= 'Display Name' required type="text"  onChange = {handleChange} name = "displayName" value = {displayName} />

                <label ></label>
                <FormInput label= 'Email' required type="email" onChange = {handleChange} name = "email" value={email} />

                <label ></label>
                <FormInput label= 'Password' required type="password" onChange = {handleChange} name = "password" value={password} />

                <label >Confirm Password</label>
                <FormInput label= 'Confirm Password' required type="password" onChange = {handleChange} name = "confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;