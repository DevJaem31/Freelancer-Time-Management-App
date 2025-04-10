import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function FormComponent({
	label,
	type = 'text',
	placeholder = '',
	value,
	onChange,
	name,
	options = [],
	checked,
	...props
}) {
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = type === 'password';
	const inputType = isPassword && showPassword ? 'text' : type;

	return (
		<div className='form-component-container mb-4 w-full'>
			{label && (
				<label className='block text-base md:text-lg font-semibold tracking-wider md:tracking-none mb-1'>
					{label}
				</label>
			)}

			{type === 'textarea' ? (
				<textarea
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className='w-full border border-gray-500  rounded-md p-2 outline-none'
					{...props}
				/>
			) : type === 'select' ? (
				<select
					name={name}
					value={value}
					onChange={onChange}
					className='w-full border border-gray-500 rounded-md p-2 outline-none text-gray-400'
					{...props}
				>
					<option
						className='text-gray-650 bg-gray-600'
						value=''
						disabled
					>
						Select {label}
					</option>
					{options.map((opt) => (
						<option
							key={opt.value}
							value={opt.value}
							className='text-white bg-gray-600'
						>
							{opt.label}
						</option>
					))}
				</select>
			) : type === 'radio' ? (
				<div className='flex gap-4'>
					{options.map((opt) => (
						<label
							key={opt.value}
							className='flex items-center gap-2 outline-none'
						>
							<input
								type='radio'
								name={name}
								value={opt.value}
								checked={value === opt.value}
								onChange={onChange}
								{...props}
							/>
							{opt.label}
						</label>
					))}
				</div>
			) : type === 'checkbox' ? (
				<label className='flex items-center gap-2 outline-none'>
					<input
						type='checkbox'
						name={name}
						checked={checked}
						onChange={onChange}
						{...props}
					/>
					{placeholder || label}
				</label>
			) : isPassword ? (
				<div className='relative'>
					<input
						type={inputType}
						name={name}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						className='w-full border border-gray-500 rounded-md p-2 pr-10 outline-none'
						{...props}
					/>
					<button
						type='button'
						onClick={() => setShowPassword((prev) => !prev)}
						className='absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400'
						tabIndex={-1}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
			) : (
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className='w-full border border-gray-500  rounded-md p-2 outline-none'
					{...props}
				/>
			)}
		</div>
	);
}

export default FormComponent;
