
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { createUser, updateUser, setUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state || '/'

    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { name, email, photo, password } = data
        createUser(email, password)
            .then(userCredential => {
                const user = userCredential.user
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        Swal.fire({
                            title: 'Registration Successful',
                            timer: '1400',
                            icon: 'success'
                        })
                        setUser({ ...user, displayName: name, photoURL: photo })
                        navigate(from)
                    })
            })
            .catch(error => {
                Swal.fire({
                    title: `failed to register ${error.message}`,
                    timer: '1400',
                    icon: 'success'
                })
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm select-shadow" style={{ perspective: '1000px' }}>
            <div className="card-body bg-gray-100/10 shadow-xl">
                <h1 className="text-5xl font-bold">Register now!</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                <fieldset className="fieldset">
                        
                        <label className="label">Name</label>
                        <input {...register("name", { required: true })} name='name' type="text" className="input input-shadow w-full" placeholder="Name" />
                        {errors?.name && <span className='text-red-700'>you must fill Your Name</span>}
                        
                        <label className="label">Email</label>
                        <input {...register("email", { required: true })} name='email' type="email" className="input input-shadow w-full" placeholder="Email" />
                        {errors?.email && <span className='text-red-700'>you must fill Email</span>}

                        <label className="label">Photo URL</label>
                        <input {...register("photo", { required: true })} name='photo' type="text" className="input input-shadow w-full" placeholder="Photo URL" />
                        {errors?.photo && <span className='text-red-700'>you must fill your photo url</span>}

                        <label className="label">Password</label>

                        <input 
                        {...register('password', {
                            required: 'you must fill your password',
                            minLength: {
                                value: 6,
                                message: 'Password must be more than 6 characters'
                            },
                            validate: {
                                hasUpperCase: value => /[A-Z]/.test(value) || 'Password must contain an uppercase letter',
                                hasLowerCase: value => /[a-z]/.test(value) || 'Password must contain a lowercase letter'
                            }
                        })} 
                        name='password' type="password" className="input input-shadow w-full" placeholder="Password" />
                        {errors?.password && <span className='text-red-700'>{errors?.password?.message}</span>}


                        <button className="btn bg-green-950 text-white border-2 border-green-950 hover:bg-white hover:text-green-950 text-lg mt-4 w-full">Register</button>
                        </fieldset>
                    </form>
                    <p>Already have an account? Please <Link className='text-red-500 underline font-semibold' to='/login' state={location.state}>Login Now</Link></p>

            </div>
        </div>
    );
};

export default Register;