import { Pagination } from "@mui/material";

function PaginationAdmin({page, count, onChange}) {
    return ( 
        <>
            <Pagination 
                count={count} 
                color="primary"
                page={page}
                onChange={onChange}
            />
        </>
     );
}

export default PaginationAdmin;