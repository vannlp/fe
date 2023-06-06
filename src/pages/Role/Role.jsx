import { Breadcrumbs, Button, CircularProgress, FormControl, FormGroup, FormLabel, Grid, Modal, Paper, TableCell, TableRow, TextField, Typography, Link as LinkMui  } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminTitle from "../../components/Section/AdminTitle";
import BasicTable from "../../components/Table/BasicTable";
import RoleApi from "../../apis/Role";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import ListRolePermission from "./ListRolePermission";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    padding: "20px"
};


function Role() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [modal, setModal] = useState({
        'addModal': false,
        'listRolePermission': false
    });
    const [code, setCode] = useState(null);

    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();


    const {token, user} = useAuth('LISTROLE');

    const start = async () => {
        setLoading(true);
        await getListRole();
        setLoading(false);
    }

    const getListRole = async (params = null) => {
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
            let res = await RoleApi.listAdmin({token: token, params: paramsN});
            let data = res.data;
            setData(data.data);
            setPagination(data.meta.pagination);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const onSubmit = async (data) => {
        try {
            let res = await RoleApi.addRole({data, token});
            let message = res.data.message;
            toast.success(message);
            reset();
            handleClose('addModal')
            start();
        } catch (error) {
            
        }
    };

    const onChangePagination = async (event, page) => {
        let params = {
            'page': page
        };
        await getListRole(params);
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

    const handleLinkCode = (event, code) => {
        setCode(code);
        handleOpen('listRolePermission');
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
            <AdminTitle title="Phân quyền">
                <Button onClick={() => handleOpen('addModal')} variant="contained" color="primary">Thêm mới</Button>
            </AdminTitle>
                
            <BasicTable tableHead={["id", "code", 'name']} pagination={pagination} onChangePagination={onChangePagination}>
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
                            <LinkMui href="#" onClick={(event) => handleLinkCode(event, item.code)}>
                                {item.code}
                            </LinkMui>
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.name}
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
                                type="text" size="small" placeholder="Nhập mã" />
                        </FormGroup>

                        <FormGroup sx={{margin: "5px 0"}}>
                            <FormLabel>Name</FormLabel>
                            <TextField 
                                {...register("name")}
                                type="text" size="small" placeholder="Nhập tên"
                            />
                        </FormGroup>

                        <FormGroup sx={{margin: "5px 0"}}>
                            <Button variant="contained" type="submit">Thêm</Button>
                        </FormGroup>
                    </form>
                </Paper>
            </Modal>
            
            <Modal
                open={modal.listRolePermission}
                onClose={() => handleClose('listRolePermission')}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                sx={{
                    maxHeight: 500,
                    overflowY: "auto"
                }}
            >
                {modal.listRolePermission ?
                    <ListRolePermission
                        style={style}
                        code={code}
                        token={token}
                        user={user}
                    />:<></>
                }
            </Modal>

        </main>
     );
}

export default Role;