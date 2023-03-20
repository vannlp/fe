import { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect, Route } from "react-router-dom";

function VanRoute({path, component, middleware, children, ...rest }) {
    const permissions = useSelector(state => state.auth.permissions);
    const token = useSelector(state => state.auth.token);

    useEffect(()=>{
        if(middleware) {
            if(!token) redirect('/login');
            let checkPermission = false;
            permissions.forEach(element => {
                if(element.code === middleware) {
                    checkPermission = true;
                }
            });

            if(!checkPermission) {
                redirect('/')
            }
        } 
    }, [])


    return ( 
        <>
        <Route  path={path} component={component} {...rest}>
            {children}
        </Route>
        </>
     );
}

export default VanRoute;