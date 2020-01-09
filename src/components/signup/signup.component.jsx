import React, { useState } from 'react';
import { connect } from 'react-redux';
import './signup.styles.scss';
import FormInput from '../form-input/form-input.component';
import { signUpStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';

const SignUp = ({ signUpStart }) => {
	const [userCredentials, setUserCredentials] = useState({
		email: '',
		password: '',
		displayName: '',
		confirmPassword: ''
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		if (password !== confirmPassword) return alert("password don't match");
		signUpStart({ email, password, displayName });
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className='sign-up'>
			<h2 className='title'>I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={ handleSubmit } className='sign-up-form'>
				<FormInput
					required
					type='text'
					name='displayName'
					label='Display Name'
					value={ displayName }
					handleChange={ handleChange } />
				<FormInput
					required
					type='text'
					name='email'
					label='Email'
					value={ email }
					handleChange={ handleChange } />
				<FormInput
					required
					type='password'
					name='password'
					label='Password'
					value={ password }
					handleChange={ handleChange } />
				<FormInput
					required
					type='password'
					name='confirmPassword'
					label='Confirm Password'
					value={ confirmPassword }
					handleChange={ handleChange } />
				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
