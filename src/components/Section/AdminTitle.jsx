import { Button, Grid, Paper, Typography } from "@mui/material";

function AdminTitle({title = "", children}) {
    return ( 
        <Paper elevation={3} sx={{padding: "15px 10px"}}>
            <Grid
                container 
                gap="10px 0"
            >
                <Grid item xs={12}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={12} style={{textAlign: "right"}}>
                    {children}
                </Grid>
            </Grid>
        </Paper>

     );
}

export default AdminTitle;