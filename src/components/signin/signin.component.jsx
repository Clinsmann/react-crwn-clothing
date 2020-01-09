import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux//user/user.actions';
import './signin.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [userCredentials, setUserCredentials] =
		useState({ email: '', password: '' });

	const { email, password } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		emailSignInStart(email, password);
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className='sign-in'>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={ handleSubmit }>
				<FormInput
					type='text'
					name='email'
					label='Email'
					value={ email }
					handleChange={ handleChange } />

				<FormInput
					type='password'
					name='password'
					label='Password'
					value={ password }
					handleChange={ handleChange } />

				<div className='buttons'>
					<CustomButton type='submit' style={ { marginRight: '20px' } }>
						Sign in
					</CustomButton>
					<CustomButton
						type="button"
						onClick={ googleSignInStart }
						isGoogleSignIn>
						Sign in With Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
	googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
