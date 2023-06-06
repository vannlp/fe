import { Autocomplete, Box, Button, CircularProgress, FormControlLabel, FormGroup, FormLabel, Grid, Modal, Paper, Switch, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BasicTable from "../../components/Table/BasicTable";
import { toast } from "react-toastify";
import PermissonApi from "../../apis/Permisson";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';

const schema = yup.object().shape({
    // code: yup.required('Code không được bỏ trống'),
    // name: yup.string().required('Name không được bỏ trống'),
})



function ListRolePermission({style, code, token, user}) {
    const [loadingIn, setLoadingIn] = useState(true);
    const [styleState, setStyState] = useState({
        ...style,
        width: 1000,
        bgcolor: '#eee',
        maxHeight: 500,
        overflowY: 'scroll',
    });
    const [list, setList] = useState([]);
    const { control,register, handleSubmit, setError, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const [listAdd, setListAdd] = useState([]);
    // const [value, setValue] = useState("");


    const start = async () => {
        await handleList();
        await getListAdd();

        setLoadingIn(false)
    }

    const handleList = async () => {
        try {
            let params = {
                limit: 7, 
                role_code: code
            };
            let res = await PermissonApi.listPermissionByRole({token, params})
            let data = res.data.data;
            setList(data);
        } catch (error) {
            let message = error.response.data.message;
            toast.error(message);
        }
    }
    const getListAdd = async (params = {}) => {
        try {
            params = {
                ...params,
                limit: 10,
                hide_with_role: code
            }

            let res = await PermissonApi.listAdmin({token, params})
            let data = res.data.data;
            setListAdd(data);
        } catch (error) {
            let message = error.response.data.message;
            toast.error(message);
        }
    }

    const onSubmit = async (data) => {
        try {
            
            let listPermission = data.listPermission.map((item, index) => {
                return item.id;
            });
            let dataRes = {
                'role_id': user.role_id,
                'listPermission': listPermission
            };

            let res = await PermissonApi.addRolePermission({token: token, data: dataRes});

            toast.success(res.data.message);
        } catch (error) {
            let message = error.response.data.message;
            toast.error(message);
        }
    }

    const onChangeAuto = async (event) => {
        // console.log(value);
        let value = event.target.value;
        // onChange(event.target.value);
        console.log(123);
        await getListAdd({
            search: value,
        });
    }

    const onChangeSwitch = (event, id) => {
        let checked = event.target.checked;
        console.log(checked, id);
    }

    const debounceSearch  = debounce(onChangeAuto, 500);

    useEffect(() => {
        // console.log(code);
        start();
    }, [])


    // Render JSX
    if(loadingIn) {
        return (
            <Box sx={{textAlign: "center", padding: "30px 0"}}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return (
        <Paper sx={styleState}>
            <Typography variant="h6" sx={{marginBottom: "10px", textTransform: "uppercase"}}>Phân quyền {code}</Typography>
            <form  method="post" onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "15px"}}>
                <Grid container>
                    <Grid xs={10}>
                        <Controller
                            control={control}
                            name="listPermission"
                            render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={listAdd}
                                disableSearch={true}
                                getOptionLabel={(option) => (option.length === 0 ? option : `${option.code} - ${option.name}`)}
                                // inputValue={value}
                                onInputChange={(event) => debounceSearch(event)}
                                renderInput={(params) => <TextField {...params} label="Tìm kiếm quyền" placeholder="Tìm kiếm quyền" />}
                                // {...field}
                                onChange={(event, data) => {
                                    onChange(data);
                                }}
                            />
                            )}
                        />
                    </Grid>

                    <Grid xs={2}>
                        <Button type="submit"
                            sx={{
                                height: "100%",
                                // width: "100%",
                                marginLeft: "10px"
                            }}
                        variant="contained" color="primary">Thêm</Button>
                    </Grid>
                </Grid>
            </form>

            <BasicTable tableHead={["id", "Id quyền", 'Tên quyền', 'Kích hoạt']} 
            // pagination={pagination}
            // onChangePagination={onChangePagination}
            >
                <>
                {list.map((item, index) => (
                    <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="td" scope="row">
                            {item.id}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.permission_id}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {item.permission_name}
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {/* <Typography color={item.is_active == 1 ? "green": "red"}>
                                {item.is_active == 1 ? 'Đang kích hoạt': "Dừng kích hoạt"}
                            </Typography> */}
                            <Switch
                                checked={item.is_active == 1 ? true : false}
                                onChange={(event) => onChangeSwitch(event, item.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
                </>
            </BasicTable> 
        </Paper>
    )
    
}

export default ListRolePermission;