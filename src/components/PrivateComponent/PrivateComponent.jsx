import { useUser } from "../../context/userContext";
import React from "react";

const PrivateComponent=({rolelist,children})=>{
    const {useData}=useUser();

    if(rolelist.includes(useData.rol_usuario)){
        return children;
    }
    return (
        <>
        </>
    )
};
export default PrivateComponent;