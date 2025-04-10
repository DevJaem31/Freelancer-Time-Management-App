import React, { useState } from 'react';
import Logo from '/icons/logo-512px.png';
import { toast } from 'react-hot-toast';
import './signup-page.css';
import FormComponent from '../../../components/reusable-components/form-component';
import { googleIcon } from '../../../assets/icons/icons';
import { GoogleLogin } from '@react-oauth/google';
import { createAccount } from '../../../services/user-services';

function SignupPage() {
	const [userData, setUserData] = useState({
		username: '',
		fullName: '',
		email: '',
		role: 'client',
		password: '',
		confirmPassword: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleGoogleSuccess = async (response) => {
		try {
			const googleUser = response.credential;

			const decoded = JSON.parse(atob(googleUser.split('.')[1]));
			const user = {
				email: decoded.email,
				fullName: decoded.name,
				username: decoded.email.split('@')[0],
				role: 'client',
				googleSignUp: true,
			};

			console.log(user);

			await createAccount(user);

			toast.success('Successfully Logged In!');
		} catch (error) {
			console.error(error);
		}
	};

	const handleGoogleError = (error) => {
		toast.error('Google login failed, please try again.');
		console.error(error);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (userData.password !== userData.confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		try {
			console.log('Form data being sent:', userData);
			await createAccount(userData);

			toast.success('Account created successfully!');
		} catch (error) {
			toast.error('Failed to create account, please try again.');
			throw error;
		}
	};
	return (
		<div className='sign-up-container w-full h-full flex justify-center items-center'>
			<div className='form-card-container bg-white/10 p-8 mx-auto my-0 md:my-15 backdrop-blur-md md:border border-white/20 md:rounded-xl shadow-lg p-6 w-[35%]'>
				<div className='form-header-container mb-5 flex flex-col items-center gap-1 md:gap-2'>
					<img
						src={Logo}
						alt='FreelanceFlow Logo'
						className='form-header-logo h-15 w-15 md:h-20 md:w-20'
					/>
					<h1 className='form-header-title text-lg font-semibold md:text-2xl'>
						Create Your Account
					</h1>
				</div>

				<form
					onSubmit={handleFormSubmit}
					className='flex flex-col items-center gap-4'
				>
					<FormComponent
						type='text'
						label='Username'
						name='username'
						value={userData.username}
						onChange={handleInputChange}
						placeholder='e.g. johndoe123'
					/>

					<FormComponent
						type='text'
						label='Full Name'
						name='fullName'
						value={userData.fullName}
						onChange={handleInputChange}
						placeholder='e.g. John Doe'
					/>

					<FormComponent
						type='email'
						label='Email'
						name='email'
						value={userData.email}
						onChange={handleInputChange}
						placeholder='e.g. example.johndoe@mail.com'
					/>

					<FormComponent
						type='select'
						label='Role'
						name='role'
						options={[
							{ label: 'Client', value: 'client' },
							{ label: 'Freelancer', value: 'freelancer' },
						]}
						value={userData.role}
						onChange={handleInputChange}
					/>

					<FormComponent
						type='password'
						label='Password'
						placeholder='Enter a strong password'
						name='password'
						value={userData.password}
						onChange={handleInputChange}
					/>

					<FormComponent
						type='password'
						label='Confirm Password'
						placeholder='Re-enter password'
						name='confirmPassword'
						value={userData.confirmPassword}
						onChange={handleInputChange}
					/>

					<button
						type='submit'
						className='w-full md:text-lg text-base bg-[var(--card-accent-color)] md:py-2 py-1 rounded-md hover:bg-[var(--card-background-color)] transition-all duration-200 ease-in-out cursor-pointer'
					>
						Sign Up
					</button>
				</form>

				<div className='flex items-center my-6'>
					<div className='flex-grow border-t border-gray-300'></div>
					<span className='mx-4 text-sm text-gray-500'>OR</span>
					<div className='flex-grow border-t border-gray-300'></div>
				</div>

				<div className='google-container flex justify-center items-center w-full'>
					<GoogleLogin
						onSuccess={handleGoogleSuccess}
						onError={handleGoogleError}
						useOneTap
						className='w-full justify-self-center self-center'
						render={({ onClick }) => (
							<button
								type='button'
								onClick={onClick}
								className='w-full md:text-lg text-base bg-[var(--card-accent-color)] py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[var(--card-background-color)] transition-all duration-200 ease-in-out cursor-pointer'
							>
								<img
									src={googleIcon}
									alt='Google'
									className='aspect-square md:mr-5 md:h-5 h-4'
								/>
								<span>Continue with Google</span>
							</button>
						)}
					/>
				</div>

				<div className='already-has-account-container flex flex-row gap-2 justify-center items-center mt-5'>
					<p className='already-has-account-text md:text-sm text-xs'>Already Have an Account?</p>
					<a
						href='/login'
						className='md:text-sm text-xs hover:text-gray-500'
					>
						LogIn
					</a>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;
