function Auth({children, permission_code}) {
    const permissions = useSelector(state => state.auth.permissions);
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    if (!token) {
        return <></>
    }
    let checkPermission = false;
    if(permissions){
        permissions.forEach(element => {
            if(element.permission_code === permission_code) {
                checkPermission = true;
            }
        });
    }
    if(!checkPermission ) {
        if(user) {
            if(user.role_code != 'SUPERADMIN') {
                return <></>
            }
        }
    }

    return <>{children}</>
}

export default Auth;