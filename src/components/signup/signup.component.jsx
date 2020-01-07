import React from 'react';
import { connect } from 'react-redux';
import './signup.styles.scss';
import FormInput from '../form-input/form-input.component';
import { signUpStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';

class SignUp extends React.Component {
	constructor () {
		super();
		this.state = {
			email: '',
			password: '',
			displayName: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) return alert("password don't match");
		const { signUpStart } = this.props;
		signUpStart({ email, password, displayName });
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className='sign-up'>
				<h2 className='title'>I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form onSubmit={ this.handleSubmit } className='sign-up-form'>
					<FormInput
						required
						type='text'
						name='displayName'
						label='Display Name'
						value={ displayName }
						handleChange={ this.handleChange } />
					<FormInput
						required
						type='text'
						name='email'
						label='Email'
						value={ email }
						handleChange={ this.handleChange } />
					<FormInput
						required
						type='password'
						name='password'
						label='Password'
						value={ password }
						handleChange={ this.handleChange } />
					<FormInput
						required
						type='password'
						name='confirmPassword'
						label='Confirm Password'
						value={ confirmPassword }
						handleChange={ this.handleChange } />
					<CustomButton type='submit'>SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
