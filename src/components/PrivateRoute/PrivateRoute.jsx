import React from "react";
import { useUser } from "../../context/userContext";

const PrivateRoute=({rolelist,children})=>{
    const {userData} =useUser();

    if (rolelist.includes(userData.rol_usuario , userData.autenticado_usuario, userData.estado_usuario)){
        return children;
    }

    return (
        <>
        <div>
            no esta autorizado
        </div>
        </>
    )
};
export default PrivateRoute;