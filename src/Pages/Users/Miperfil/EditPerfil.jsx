import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../../../components/Navbar/Navbar'
import imagenes from '../../../assets/img/imagenes';
import { GET_USUARIO } from '../../../graphql/users/queries.js';
import { useUser } from '../../../context/userContext';
import useFormData from '../../../components/UseForm/useForm.js';
import { EDITAR_USUARIO } from "../../../graphql/users/mutations";
import { useAuth } from "../../../context/authContext";
import PrivateRoute from '../../../components/PrivateRoute/PrivateRoute';

function EditPerfil() {
    const { userData } = useUser();
    const _id = userData._id;
    const rolUsuario = userData.rol_usuario
    const {
        data: queryData,
        error: queryError,
        loading: queryLoading } = useQuery(GET_USUARIO, { variables: { _id, rolUsuario } })


    const [editarUsuario,
        { data: mutationData,
            loading: MutationLoading,
            error: mutationError }] = useMutation(EDITAR_USUARIO);

    const { setToken } = useAuth();
    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData();

    //

    const submitForm = (e) => {
        e.preventDefault();
        formData._id = userData._id;
        formData.rolUsuario = userData.rol_usuario;
        editarUsuario({
            variables: { ...formData }
        })
    };

    useEffect(() => {
        if (mutationData) {


            toast.info('Edicion completada', {
                toastId: 'mutation',
            });
            navigate('/private/MiPerfil');
        };
    }, [mutationData, setToken, navigate])

    useEffect(() => {
        if(queryData){
            toast.success('Datos actualizados', { toastId: 'error', });
        }
    }, [queryData]);

    //encaso de que halla un error ejecute esto
    useEffect(() => {
        if (queryError) {
            <div> Error consultando Usuario</div>
        }
    }, [queryError])

    if (queryLoading) return <div className='min-h-screen flex justify-center items-center bg-gray-500'>
        <div className='bg-yellow-400 rounded-full flex min-w-max p-2'>
            <img src={imagenes.imag1} alt="Logo empresa" className='md:p-1 h-20 w-20 animate-pulse' />
            <p className='md:p-7 animate-pulse text-2xl font-bold'>Cargando Login...just wait</p>
        </div>
    </div>;

    if (MutationLoading) {
        toast.info('Editando datos de usuario', {
            toastId: 'loading',
        });
    }
    if (mutationError) {
        toast.error('Error en edicion de datos', {
            toastId: 'error',
        });
    }

    return (
        <PrivateRoute rolelist={["ESTUDIANTE", "ADMINISTRADOR", "LIDER"]}>
            <div className='bg-gray-400 text-white min-h-screen'>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                />
                <Navbar />
                <div className='bg-gray-400 text-black'>
                    <section className='container mx-auto px-6'>
                        <div className='py-4 flex justify-between'>
                            <section className='flex flex-row justify-center'>
                                <img src={imagenes.imag1} alt="Logo empresa" className='py-3 px-3 h-20 w-20' />
                                <h1 className='px-2 text-xl text-center my-auto uppercase font-bold'>Pomodoro Projects</h1>
                            </section>
                        </div>
                        <section className='flex items-center'>
                            <section className='flex flex-col px-20 py-1'>
                                        <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitForm} onChange={updateFormData} ref={form}>
                                            <div>    
                                            <h1 className='bg-yellow-400 text-blue-900 font-semibold text-center py-1 rounded-full'>
                                            TU PERFIL</h1>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-blue-900 text-sm font-bold py-1" htmlFor="username">
                                                    Nombre
                                                </label>
                                                <input name='nombreUsuario' className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" defaultValue={queryData.Usuario.nombre_usuario} />
                                                <label className="block text-blue-900 text-sm font-bold mb-2" htmlFor="Apellido">
                                                    Apellido
                                                </label>
                                                <input name='apellidoUsuario' className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Apellido" type="text" defaultValue={queryData.Usuario.apellido_usuario} />
                                                <label className="block text-blue-900 text-sm font-bold mb-2" htmlFor="Documento">
                                                    Documento
                                                </label>
                                                <input name='documentoUsuario' className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="documento" type="number" defaultValue={queryData.Usuario.documento_usuario} />
                                                <label className="block text-blue-900 text-sm font-bold mb-2" htmlFor="grid-state">
                                                    Tipo de documento
                                                </label>
                                                <div className="relative py-1">
                                                    <select name="tipoDocumentoUsuario" className="block appearance-none w-full bg-white-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="tipo-documento">
                                                        <option>CEDULA_CIUDADANIA</option>
                                                        <option>TARJETA_IDENTIDAD</option>
                                                        <option>PASAPORTE</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                </div>
                                                <label className="block text-blue-900 text-sm font-bold mb-2" htmlFor="Correo">
                                                    Correo electrónico
                                                </label>
                                                <input name='emailUsuario' className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="correo" type="text" defaultValue={queryData.Usuario.email_usuario} />
                                                <button type='submit' className="content-center mx-3 py-2 px-6 text-white font-bold rounded-full bg-blue-900 shadow-lg">Confirmar información</button>
                                            </div>
                                        </form>
                            </section>
                                <section>
                                    <img className='object-fill h-80 w-auto' src={imagenes.imag8} alt="lock" />
                                </section>
                        </section>
                    </section>
                </div>
            </div>
        </PrivateRoute>
    )
}
export default EditPerfil;