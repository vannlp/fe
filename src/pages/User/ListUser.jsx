import { Box, Button, CircularProgress, FormControl, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Modal, Paper, Select, TableCell, TableRow, TextField, Typography } from "@mui/material";
import AdminTitle from "../../components/Section/AdminTitle";
import BasicTable from "../../components/Table/BasicTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserApi from "../../apis/User";
import useAuth from "../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import RoleApi from "../../apis/Role";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { setLoadingGlobal } from "../../features/interface/interfaceSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    padding: "20px"
};

const schema = yup.object().shape({
    name: yup.string().required('Name không được bỏ trống'),
    email: yup.string().email().required('Email không được bỏ trống'),
    password: yup.string().min(6).required('Password không được bỏ trống')
})

function ListUser() {
    const [listUsers, setListUser] = useState([]);
    const {token, user} = useAuth('LISTUSER');
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({
        'addModal': false,
    });
    const dispatch = useDispatch();
    const [listRoles, setListRoles] = useState([]);
    const { register, handleSubmit, setError, formState: { errors }, reset, control } = useForm({
        resolver: yupResolver(schema)
    });
    const [searchList, setSearchList] = useState({
        email: '',
        name: "",
        role_id: ""
    });


    const handleClose = (stateModalName) => {
        setModal({
            ...modal,
            [stateModalName]: false
        })
    }

    const handleOpen = (stateModalName) => {
        setModal({
            ...modal,
            [stateModalName]: true
        })
    }

    const initData = async () => {
        setLoading(true);
        let params = {limit: 10};
        await getListUserApi(params);
        await getListRoleApi();
        setLoading(false);
    }
    const onChangeSearchListRole = (event) => {
        setSearchList({
            ...searchList,
            role_id: event.target.value
        })
    }


    const getListUserApi = async (params) => {
        try {
            if(!params) {
                params = {};
            }
            params.limit = params.limit ?? 10; 

            let res = await UserApi.list({params: params, token: token});
            let data = res.data;
            setListUser(data.data);
            setPagination(data.meta.pagination);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

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

    const onChangePagination = async (event, page) => {
        let params = {
            'page': page,
            'limit': 10
        };
        await getListUserApi(params);
    }

    const onSubmit = async (data) => {
        try {
            dispatch(setLoadingGlobal(true));
            
            let res = await UserApi.create({token, data});

            let message = res.data.message;
            toast.success(message);
            dispatch(setLoadingGlobal(false));
            reset();
            let params = {limit: 10};
            await getListUserApi(params);
        } catch (error) {
            dispatch(setLoadingGlobal(false));
            toast.error(error.response.data.message);
        }
    };

    const onChickSearch = async () => {
        dispatch(setLoadingGlobal(true));
        await getListUserApi(searchList);
        dispatch(setLoadingGlobal(false));
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
            <AdminTitle title="Người dùng">
                <Button onClick={() => handleOpen('addModal')} variant="contained" color="primary">Thêm mới</Button>
            </AdminTitle>

            <Paper elevation={3} sx={{padding: "15px 10px"}}>
                <Grid
                    container 
                    gap="10px 10px"
                >
                    <Grid item xs={3}>
                        <FormGroup>
                            <TextField size="small" placeholder="Nhập tên" value={searchList.name} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={3}>
                        <FormGroup>
                            <TextField size="small" placeholder="Nhập email" value={searchList.email} />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={3}>
                        <FormGroup>
                            <FormControl  size="small">
                                <InputLabel id="role_select_search">Role</InputLabel>
                                <Select 
                                    labelId="role_select_search"
                                    id="role_select_search"
                                    label="Role"
                                    value={searchList.role_id}
                                    onChange={onChangeSearchListRole}
                                >
                                    {listRoles.map((item, index) => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                </Grid>

                <Grid container sx={{marginTop: "10px"}}>
                    <Grid item sx={12}>
                        <Button variant="contained" onClick={() => onChickSearch()}>Tìm kiếm</Button>
                    </Grid>
                </Grid>
            </Paper>

            <BasicTable tableHead={["id", "Họ và tên", 'Email', "Role"]} pagination={pagination} onChangePagination={onChangePagination}>
                <>
                {listUsers.map((item, index) => (
                    <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="td" scope="row">
                            {item.id}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            <Link to={`/nguoi-dung/${item.id}`}>{item.name}</Link>
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.email}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.role_name}
                        </TableCell>
                    </TableRow>
                ))}
                </>
            </BasicTable> 

            <Modal
                open={modal.addModal}
                onClose={() => handleClose('addModal')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
            
            >
                <Paper sx={style}>
                    <Typography variant="h6" sx={{marginBottom: "10px", textTransform: "uppercase"}}>Thêm mới</Typography>
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
                                type="email" size="small" placeholder="Nhập email" />
                        </FormGroup>
                        <FormGroup  sx={{margin: "5px 0"}}>
                            <FormLabel>Role</FormLabel>
                            <FormControl variant="filled" sx={{ m: 1,margin: "5px 0" }}>
                                <InputLabel id="role_select">Role</InputLabel>
                                <Controller
                                    control={control}
                                    name="role_id"
                                    render={({ field: {onChange, value} }) => (
                                        <Select 
                                            labelId="role_select"
                                            id="role_select"
                                            value={value}
                                            onChange={onChange}
                                        >
                                            {listRoles.map((item, index) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
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
                            <FormLabel>Password</FormLabel>
                            <TextField 
                                {...register("password")}
                                type="password" size="small" placeholder="Nhập Password" />
                        </FormGroup>

                        <FormGroup sx={{margin: "5px 0"}}>
                            <Button variant="contained" type="submit">Thêm</Button>
                        </FormGroup>
                    </form>
                </Paper>
            </Modal>
        </main>
     );
}

export default ListUser;