import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useAuth(permission_code = null) {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const permissions = useSelector(state => state.auth.permissions);
    // console.log(permissions);
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    
        

        if(permission_code) {
            if(user && user.role_code != 'SUPERADMIN'){
                let checkPermission = false;
                if(permissions){
                    permissions.forEach(element => {
                        if(element.permission_code === permission_code) {
                            checkPermission = true;
                        }
                    });
                }
                if(!checkPermission) {
                    navigate('/')
                }
            }
        } 
    }, [])


    return {token, user, permissions};
}

export default useAuth;