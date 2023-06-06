import { CircularProgress } from "@mui/material";
import "./Loading.scss";


function Loading() {
    return ( 
        <div className="loading">
            <CircularProgress />
        </div>
     );
}

export default Loading;