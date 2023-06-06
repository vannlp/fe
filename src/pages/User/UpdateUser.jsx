import { Box, Button, CircularProgress, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import AdminTitle from "../../components/Section/AdminTitle";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { setLoadingGlobal } from "../../features/interface/interfaceSlice";
import RoleApi from "../../apis/Role";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import UserApi from "../../apis/User";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const schema = yup.object().shape({
    name: yup.string().required('Name không được bỏ trống'),
    email: yup.string().email().required('Email không được bỏ trống'),
    // password: yup.string().min(6).required('Password không được bỏ trống')
})
function UpdateUser() {
    const { register, handleSubmit, setError, setValue, formState: { errors }, reset, control } = useForm({
        resolver: yupResolver(schema)
    });
    const [listRoles, setListRoles] = useState([]);
    const dispatch = useDispatch();
    const {token} = useAuth('LISTUSER');
    const {id} = useParams();
    const [loading, setLoading] = useState(true);


    const getListRoleApi = async (params = {}) => {
        try {
            if(!params) {
                params = {};
            }

            let res = await RoleApi.listAdmin({params: params, token: token});
            let data = res.data;
            setListRoles(data.data);
            // setPagination(data.meta.pagination);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const initData = async () => {
        setLoading(true);
        // dispatch(setLoadingGlobal(true));
        await getListRoleApi();
        await getUserById(id);
        // dispatch(setLoadingGlobal(false));
        setLoading(false);
    }
    const onSubmit = async (data) => {
        try {
            // console.log(data);
            dispatch(setLoadingGlobal(true));
            let res = await UserApi.edit({token, id, data});
            let message = res.data.message;
            toast.success(message);
            dispatch(setLoadingGlobal(false));
        } catch (error) {
            dispatch(setLoadingGlobal(false));
            toast.error(error.response.data.message);
        }
    }
    const getUserById = async (id) => {
        try {
            let res = await UserApi.getById({token, id});
            let data = res.data.data;
            setValue('name', data.name);
            setValue('email', data.email);
            setValue('role_id', data.role_id);
            setValue('phone', data.phone);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        initData();
    },[]);

    // Render JSX
    if(loading) {
        return (
            <Box sx={{textAlign: "center", padding: "30px 0"}}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return ( 
    <main className="admin-main">
        <AdminTitle title="Cập nhập người dùng">
            {/* <Button onClick={() => handleOpen('addModal')} variant="contained" color="primary">Thêm mới</Button> */}
        </AdminTitle>

        <Paper elevation={3} sx={{padding: "15px 10px"}}>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup  sx={{margin: "5px 0"}}>
                    <FormLabel>Họ tên</FormLabel>
                    <TextField 
                        {...register("name")}
                        type="text" size="small" placeholder="Nhập tên" />
                </FormGroup>
                <FormGroup  sx={{margin: "5px 0"}}>
                    <FormLabel>Email</FormLabel>
                    <TextField 
                        {...register("email")}
                        aria-readonly
                        type="email" size="small" placeholder="Nhập email" />
                </FormGroup>
                <FormGroup  sx={{margin: "5px 0"}}>
                    <FormLabel>Role</FormLabel>
                    <FormControl variant="filled" sx={{ m: 1,margin: "5px 0" }}>
                        <InputLabel id="role_select">Role</InputLabel>
                        <Controller
                            control={control}
                            name="role_id"
                            render={({ field: {onChange, value} }) => {
                                // console.log(value);
                                return(
                                    <Select 
                                        labelId="role_select"
                                        id="role_select"
                                        value={value}
                                        onChange={onChange}
                                    >
                                        {listRoles.map((item, index) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                )
                            }}
                        />
                        
                    </FormControl>
                </FormGroup>

                <FormGroup sx={{margin: "5px 0"}}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <TextField 
                        {...register("phone")}
                        type="text" size="small" placeholder="Nhập phone" />
                </FormGroup>

                <FormGroup sx={{margin: "5px 0"}}>
                    <Button variant="contained" type="submit">Cập nhập</Button>
                </FormGroup>
            </form>
        </Paper>
    </main>
    );
}

export default UpdateUser;