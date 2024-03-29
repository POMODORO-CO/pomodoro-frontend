import React, { useEffect } from 'react'

import "../../../index.css";
import Navbar from '../../../components/Navbar/Navbar'
import PrivateRoute from '../../../components/PrivateRoute/PrivateRoute';
import { useUser } from '../../../context/userContext';
import LiderConsulta from './Users/LiderConsulta';
import EstudianteConsulta from './Users/EstudianteConsulta';
import AdministradorConsulta from './Users/AdministradorConsulta';

function Consulta() {

    const { userData } = useUser();
    
    const estado = false;
    if (userData.rol_usuario === "LIDER" && userData.estado_usuario === "AUTORIZADO") {
        return (
            <>
                <Navbar />
                
                <div className='consulta text-center'>
                <h1 className='text-3xl font-bold pt-1'>CONSULTA DE PROYECTOS</h1>
                </div>
                <PrivateRoute rolelist={["LIDER"]}>
                    <LiderConsulta />
                </PrivateRoute>
            </>
        )
    } else if (userData.rol_usuario === "ESTUDIANTE" && userData.estado_usuario === "AUTORIZADO") {
        return (
            <>
                <Navbar />
                <div className='text-center'>
                    <h1 className='text-3xl font-bold pt-1'>CONSULTA PROYECTOS INSCRITOS</h1>
                </div>
                <PrivateRoute rolelist={["ESTUDIANTE"]}>
                    <EstudianteConsulta />
                </PrivateRoute>
            </>
        )
    } else if (userData.rol_usuario === "ADMINISTRADOR" && userData.estado_usuario === "AUTORIZADO") {
        return (
            <>
                <Navbar />
                <div className='text-center'>
                    <h1 className='text-3xl font-bold pt-1'>CONSULTA PROYECTOS INSCRITOS</h1>
                </div>
                <PrivateRoute rolelist={["ADMINISTRADOR"]}>
                    <AdministradorConsulta/>
                </PrivateRoute>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div>
                Usuario sin permisos
                
            </div>
        </>
    )
}

export default Consulta;