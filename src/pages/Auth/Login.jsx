import { Avatar, Button, Fab, FormGroup, TextField } from "@mui/material";
import {Favorite, Lock} from "@mui/icons-material";
function Login() {
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
            <form action="" method="post">
                <FormGroup style={{marginTop: "5px"}}>
                    <TextField fullWidth label="Email" variant="outlined" />
                </FormGroup>
                <FormGroup style={{marginTop: "15px"}}>
                    <TextField fullWidth label="Mật khẩu" variant="outlined" />
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