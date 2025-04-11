import React from 'react';
import './login-page.css';
import Logo from '/icons/logo-512px.png';
import { useNavigate } from 'react-router-dom';
import { googleIcon } from '../../../assets/icons/icons';
import { GoogleLogin } from '@react-oauth/google';
import FormComponent from '../../../components/reusable-components/form-component';

function LoginPage() {
	const navigate = useNavigate();
	return (
		<div className='login-page-container w-full h-full justify-center items-center'>
			<div className='login-form-card bg-white/10 p-8 mx-auto my-0 md:my-15 backdrop-blur-md md:border border-white/20 md:rounded-xl shadow-lg md:p-6 w-[35%]'>
				<div className='login-form-header mb-5 flex flex-col items-center gap-1 md:gap-2 relative '>
					<button
						onClick={() => navigate('/')}
						className='absolute top-0 left-0 p-2 cursor-pointer hover:opacity-80'
						aria-label='Go back'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-9 h-9 text-white'
						>
							<circle
								cx='12'
								cy='12'
								r='11'
								stroke='currentColor'
								strokeWidth='1'
								fill='transparent'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M13 16l-4-4 4-4'
							/>
						</svg>
					</button>

					<img
						src={Logo}
						alt='FreelanceFlow Logo'
						className='form-header-logo h-15 w-15 md:h-20 md:w-20'
					/>

					<h1 className='form-header-title text-lg font-semibold md:text-2xl'>Welcome Back!</h1>
				</div>

				<form
					onSubmit={''}
					className='flex flex-col items-center gap-4'
				>
					<FormComponent
						type='email'
						label='Email'
						placeholder='e.g. example.johndoe@mail.com'
					/>

					<FormComponent
						type='password'
						label='Password'
						placeholder='Enter password'
						name='password'
					/>

					<button
						type='submit'
						className='w-full md:text-lg text-base bg-[var(--card-accent-color)] md:py-2 py-1 rounded-md hover:bg-[var(--card-background-color)] transition-all duration-200 ease-in-out cursor-pointer'
					>
						Sign In
					</button>
				</form>

				<div className='flex items-center my-6'>
					<div className='flex-grow border-t border-gray-300'></div>
					<span className='mx-4 text-sm text-gray-500'>OR</span>
					<div className='flex-grow border-t border-gray-300'></div>
				</div>

				<div className='google-container flex justify-center items-center w-full'>
					<GoogleLogin
						// onSuccess={handleGoogleSuccess}
						// onError={handleGoogleError}
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
					<p className='already-has-account-text md:text-sm text-xs'>Don't Have an Account?</p>
					<a
						href='/sign-up'
						className='md:text-sm text-xs hover:text-gray-500'
					>
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
