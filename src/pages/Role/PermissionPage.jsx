import { Breadcrumbs, Button, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Modal, Paper, Switch, TableCell, TableRow, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminTitle from "../../components/Section/AdminTitle";
import BasicTable from "../../components/Table/BasicTable";
import RoleApi from "../../apis/Role";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import PermissonApi from "../../apis/Permisson";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    code: yup.string().required('Code không được bỏ trống'),
    name: yup.string().required('Name không được bỏ trống'),
})


function PermissionPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [modal, setModal] = useState({
        'addModal': false
    });

    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });


    const {token, user} = useAuth('LISTPERMISSION');

    const start = async () => {
        setLoading(true);
        await getListPermisson();
        setLoading(false);
    }

    const getListPermisson = async (params = null) => {
        try {
            let paramsN = {
                'limit': 10
            };
            if(params){
                paramsN = {
                    ...paramsN,
                    ...params
                }
            }
            let res = await PermissonApi.listAdmin({token: token, params: paramsN});
            let data = res.data;
            setData(data.data);
            setPagination(data.meta.pagination);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const onSubmit = async (data) => {
        try {
            let res = await PermissonApi.add({token, data});
            
            let message = res.data.message;
            toast.success(message);

            reset()
        } catch (error) {
            let res = error.response
            console.log(res.data);
        }
    };

    const onChangePagination = async (event, page) => {
        let params = {
            'page': page
        };
        await getListPermisson(params);
    }

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


    useEffect(() => {
        start();
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
            <AdminTitle title="Quyền">
                <Button onClick={() => handleOpen('addModal')} variant="contained" color="primary">Thêm mới</Button>
            </AdminTitle>

                
            <BasicTable tableHead={["id", "code", 'name', 'Kích hoạt', 'Nhóm quyền']} pagination={pagination} onChangePagination={onChangePagination}>
                <>
                {data.map((item, index) => (
                    <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="td" scope="row">
                            {item.id}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.code}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            <Typography color={item.is_active == 1 ? "green": "red"}>
                                {item.is_active == 1 ? 'Đang kích hoạt': "Dừng kích hoạt"}
                            </Typography>
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.group_permission_name ?? null}
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
                        <FormGroup sx={{margin: "5px 0"}}>
                            <FormLabel>Code</FormLabel>
                            <TextField 
                                {...register("code")}
                                error={Boolean(errors?.code)}
                                helperText={errors?.code?.message}
                                type="text" size="small" placeholder="Nhập mã" />
                        </FormGroup>

                        <FormGroup sx={{margin: "5px 0"}}>
                            <FormLabel>Name</FormLabel>
                            <TextField 
                                {...register("name")}
                                error={Boolean(errors?.code)}
                                helperText={errors?.code?.message}
                                type="text" size="small" placeholder="Nhập tên"
                            />
                        </FormGroup>
                        <FormGroup sx={{margin: "5px 0"}}>
                            <FormLabel>Mô tả</FormLabel>
                            {/* <TextField 
                                {...register("description")}
                                error={Boolean(errors?.description)}
                                helperText={errors?.description?.message}
                                type="" size="small" placeholder="Nhập mô tả"
                            /> */}
                            <TextareaAutosize
                             aria-label="minimum height" minRows={10} placeholder="Nhập nội dung"
                             {...register("description")}
                             className="text-area"
                             />
                        </FormGroup>

                        <FormGroup sx={{margin: "5px 0"}}>
                            <FormControlLabel control={<Switch defaultChecked {...register("is_active")} />} label="Kích hoạt" />
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

export default PermissionPage;