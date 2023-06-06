import { Avatar, Button, Fab, FormGroup, TextField } from "@mui/material";
import {Favorite, Lock} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Auth from "../../apis/Auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const navigate = useNavigate();

    // const handleCustomValidation = () => {
    //     setError('email', {
    //         'type': {
    //             required: "This is required",
    //             email: "This is Email"
    //         },
    //     });

    //     setError('password', {
    //         'type': {
    //             required: "This is required",
    //         },
    //     });
    // }

    const onSubmit = async (data) => {
        try {
            let res = await Auth.login(data);
            let dataRes = res.data.authorisation;
            dispatch(setToken(dataRes.token));
            dispatch(setUser(dataRes.user));


            toast.success("Đăng nhập thành công");
        } catch (error) {
            toast.error("Vui lòng kiểm tra lại tài khoản và mật khẩu");
        }
    };

    const handleAuth = () => {
        if(!token) return;
        else return navigate('/');
    }

    useEffect(() => {
        handleAuth();
    },[token])

    return ( 
    <>
        <header className="auth-header">
            <div className="auth-header-logo">
                <Avatar sx={{ bgcolor: "#e91e63" }}>
                    <Lock />
                </Avatar>
            </div>

            <div className="auth-header-title">
                <h3>Đăng nhập</h3>
            </div>
        </header>

        <main className="auth-main">
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup style={{marginTop: "5px"}} >
                    <TextField 
                        {...register("email", { required: true, minLength: 12 })} 
                        fullWidth label="Email" type="email" 
                        variant="outlined" 
                        error={Boolean(errors.email)}
                        helperText={errors.email && (
                            <span>
                              {errors.email.message}
                            </span>
                        )}
                    />
                </FormGroup>
                <FormGroup style={{marginTop: "15px"}}>
                    <TextField 
                        error={Boolean(errors.password)}
                        helperText={errors.password && (
                            <span>
                              {errors.password.message}
                            </span>
                        )}
                        {...register("password", { required: true })} fullWidth label="Mật khẩu" type="password" variant="outlined" 
                    />
                </FormGroup>
                <FormGroup style={{marginTop: "15px"}}>
                    <Button variant="contained" type="submit" color="primary">Đăng nhập</Button>
                </FormGroup>
            </form>
        </main>
    </>
     );
}

export default Login;