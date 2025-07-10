
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
    const { createUser, updateUser, setUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state || '/'
    const axiosSecure = useAxiosSecure()

    
    const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit = async (data) => {
  const { name, email, photo, password } = data;
  
  try {
    // 1. Firebase auth
    const userCredential = await createUser(email, password);
    
    // 2. Update Firebase profile
    await updateUser({ displayName: name, photoURL: photo });

    // 3. Save to MongoDB
    await axiosSecure.post('/register-user', {
      name,
      email,      
      photoURL: photo
    });

    // 4. Success flow (keep your existing UI code)
    Swal.fire({
      title: 'Registration Successful', 
      timer: 1400,
      icon: 'success'
    });
    
    setUser({ 
      ...userCredential.user, 
      displayName: name, 
      photoURL: photo 
    });
    
    navigate(from);

  } catch (error) {
    Swal.fire({
      title: 'Registration Failed',
      text: error.response?.data?.error || error.message,
      icon: 'error'
    });
  }
};

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