
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { signInWithGoogle, signInUser } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state || '/'

    // signin with google
    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have successfully logged in with google",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .then(error => {
                console.log(error)
            })
    }

    //login with email and password

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, password } = data
        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have successfully logged in",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .catch(error => {
                Swal.fire({
                    title: `failed to login ${error.message}`,
                    timer: '1400',
                    icon: 'success'
                })
            })
    }
    return (


        <div className="card bg-base-100 w-full mx-auto max-w-sm select-shadow" style={{ perspective: '1000px' }}>
            <div className="card-body shadow-2xl bg-gray-100/10">
                <h1 className="text-5xl font-bold">Login now!</h1>

                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input {...register("email", { required: true })} name='email' type="email" className="input input-shadow w-full" placeholder="Email" />
                        {errors?.email && <span className='text-red-700'>Insert Your Email</span>}

                        <label className="label">Password</label>
                        <input {...register("password", { required: true })} name='password' type="password" className="input input-shadow w-full" placeholder="Email" />
                        {errors?.password && <span className='text-red-700'>Insert Your Password</span>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-green-950 text-white border-2 border-green-950 hover:bg-white hover:text-green-950 text-lg mt-4">Login</button>
                    </fieldset>
                </form>
                <button onClick={handleSignInWithGoogle} className="btn  text-black border-[#e5e5e5] bg-green-200 hover:bg-green-300">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Continue with Google
                </button>
                <p>Don't have an account? Please <Link className='text-red-500 underline font-semibold' to='/register' state={location.state}>Register Now</Link></p>
            </div>
        </div>

    );
};

export default Login;