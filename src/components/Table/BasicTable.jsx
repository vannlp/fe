import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import { Box, Pagination, TablePagination, Typography } from '@mui/material';
import PaginationAdmin from '../Pagination/PaginationAdmin';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#36454f",
    color: "#fff",
    textTransform: 'uppercase' 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function BasicTable({tableHead = [], children, pagination = null, onChangePagination}) {
  const [page, setPage] = React.useState(1);
  const handleOnChange = (event, page) => {
    setPage(page);
    console.log(page);
  }

  return (
    <Paper sx={{display: "flex", flexDirection: "column", gap: "10px 0", background: "#fff", padding: "15px 10px"}}>
      <TableContainer component={Paper}>
        {/* <Typography variant="h5">Danh sách</Typography> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((item, index) => (
                  <StyledTableCell key={index}>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </TableContainer>
      
      {pagination && (
        <Pagination 
          count={pagination.total_pages ?? 1} 
          color="primary"
          page={pagination.current_page ?? 1}
          onChange={onChangePagination}
        />
      )}
    </Paper>
  );
}