import React, { useEffect } from 'react'
import { useNavigate } from "react-router";
import { useMutation } from '@apollo/client';

import NavbarLandingPage from '../../components/NavbarLandingPage/NavbarLandingPage';
import useFormData from '../../components/UseForm/useForm.js'
import { LOGIN } from '../../graphql/Auth/mutationsAuth';
import { useAuth } from '../../context/authContext';
import imagenes from '../../assets/img/imagenes';


const Login = () => {

    const {setToken}=useAuth();

    const navigate= useNavigate();

    const {form, formData, updateFormData}=useFormData();

    const [login, {
        data:mutationData,
        loading:mutationLoading,
        error: mutationError
                                }]=useMutation(LOGIN);

    const submitForm=(e)=>{
        e.preventDefault();
        login({
            variables:formData,
        });
    };

    useEffect(()=>{
        if(mutationData){
          if(mutationData.login.token){
            setToken(mutationData.login.token);
            navigate('/private/Home');
          }
        };
        
      },[mutationData, navigate, setToken])


    if(mutationLoading){return(<div className='min-h-screen flex justify-center items-center bg-gray-500'>
        <div className='bg-yellow-400 rounded-full flex min-w-max p-2'> 
            <img src={imagenes.imag1} alt="Logo empresa" className='md:p-1 h-20 w-20 animate-pulse'/>
            <p className='md:p-7 animate-pulse text-2xl font-bold'>Cargando Login...just wait</p>
        </div>
        </div>)}


    if(mutationError){       
        return(
            <div>
                error de la mutacion:
            </div>
        )
    }
    return (
        <div>
            <NavbarLandingPage />
            <div className='min-h-screen grid place-content-center bg-gray-500'>
                <div className="w-full max-w-xs m-6">

                    <form onChange={updateFormData} onSubmit={submitForm} ref={form} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <img className="w-20 h-20 rounded-full mx-auto m-5" src="https://images.pexels.com/photos/2589649/pexels-photo-2589649.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile" />
                            <label className="block text-gray-500 text-sm font-bold py-1" htmlFor="username">
                                Correo electrónico
                            </label>
                            <input name='emailUsuario' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo electrónico" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input name='passwordUsuario' className="shadow appearance-none border border-blue-900 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*******" />
                            <p className="text-yellow-400 text-xs italic p-1">Por favor ingrese su contraseña.</p>
                            <button className="bg-gray-500 hover:bg-yellow-400 text-white font-bold w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline" type='submit'>
                                Ingresar
                            </button>
                        </div>
                        <div>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2">Recordar contraseña</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between my-3">
                            <a className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-blue-800" href="/Registro">
                                Registrarse
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login

