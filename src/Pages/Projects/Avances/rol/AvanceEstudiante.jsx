import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import * as FaIcons from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../../../../components/Navbar/Navbar";
import PrivateRoute from "../../../../components/PrivateRoute/PrivateRoute";
import { AVANCES_PROJECTO } from '../../../../graphql/advances/queriesAdvances'
import imagenes from "../../../../assets/img/imagenes";
import { useUser } from "../../../../context/userContext";

const AvanceEstudiante = () => {
    const { _id } = useParams();
    const proyecto = String(_id);
    const { userData } = useUser();
    const {
        data: dataAvances,
        loading: loadingAvances,
        error: errorAvances } = useQuery(AVANCES_PROJECTO, { variables: { proyecto } })

    useEffect(() => {
        if (dataAvances) {
            toast.success('Datos actualizados', { toastId: 'error', });
        }
    }, [dataAvances])

    useEffect(() => {
        if (errorAvances) {
            return (
                <div> Error consultando Usuario</div>
            )
        }
    }, [errorAvances])
    if (loadingAvances) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gray-500'>
                <div className='bg-yellow-400 rounded-full flex min-w-max p-2'>
                    <img src={imagenes.imag1} alt="Logo empresa" className='md:p-1 h-20 w-20 animate-pulse' />
                    <p className='md:p-7 animate-pulse text-2xl font-bold'>Cargando Login...just wait</p>
                </div>
            </div>
        )
    };

    return (
        <>
            <PrivateRoute rolelist={["ESTUDIANTE"]}>
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
                <Navbar />
                <div className="flex items-center flex-col text-middle">
                    <h1>{`Avances proyecto ${_id}`}</h1>

                    <div className="box pt-6">
                        <div className="box-wrapper">

                            <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                                <button className="outline-none focus:outline-none"><svg className=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                                <input type="search" name="" id="" placeholder="Buscar.." x-model="q" className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent" />
                                <div className="select">
                                    <select name="" id="" x-model="image_type" className="text-sm outline-none focus:outline-none bg-transparent">
                                        <option defaultValue="all" defaultValue>Todo</option>
                                        <option defaultValue="photo">ID</option>
                                        <option defaultValue="illustration">Nombre del proyecto</option>
                                        <option defaultValue="vector">Líder</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="-my-1 overflow-x-auto sm:-mx-6 lg:-mx-2 py-4">

                        <div className="py-2 align-middle inline-block min-w-auto sm:px-6 lg:px-12">
                        <NavLink to={`/private/Proyecto/Avances/add/${_id}`} className="mx-3 py-2 px-6 text-blue-900 font-bold rounded-full bg-yellow-400 shadow-lg block md:inline-block">
                                añadir avance
                            </NavLink>
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                                <table className="min-w-auto divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>

                                            <th scope="col" className="px-15 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                                Nombre Estudiante
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                                Descripción Avance
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fecha Avance
                                            </th>
                                            <th scope="col" className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Observaciones
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">

                                        {dataAvances &&
                                            dataAvances.AvancesOneProject.map((u, index) => {
                                                return (
                                                    <tr key={index}>

                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                {u.usuario_avance.nombre_usuario + " " + u.usuario_avance.apellido_usuario}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                {u.descripcion_avance}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                {u.fecha_avance.split("T")[0]}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">

                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                {u.observaciones_avance}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">

                                                            {u.usuario_avance._id === userData._id ?
                                                                <div>
                                                                    <NavLink to={`/private/Proyecto/Avances/descripcion/${u._id}`} data-tip="React-tooltip">
                                                                        <FaIcons.FaRegFileAlt size={25} />
                                                                        <ReactTooltip place="top" type="info" effect="solid">
                                                                            <span>Modificar Descripción del avance</span>
                                                                        </ReactTooltip>
                                                                    </NavLink>

                                                                </div>

                                                                :
                                                                <>
                                                                    <div>
                                                                        <button data-tip data-for="cosas">
                                                                            .
                                                                            <ReactTooltip id="cosas" place="top" type="info" effect="solid">
                                                                                <span>Otro usuario hizo el avanze</span>
                                                                            </ReactTooltip>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>



                            </div>
                            
                        </div>
                    </div>
                </div>
            </PrivateRoute>
        </>
    )
}
export default AvanceEstudiante;