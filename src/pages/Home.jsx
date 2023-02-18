import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../features/test/testSlice";

function Home() {
    const valueTest = useSelector(state => state.test.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeValue("adjgkjdskg"))
    }, [])
    return ( 
        <div>
            <h2>Home</h2>
            {valueTest}

            <Button variant="contained">Hello World</Button>
        </div>
     );
}

export default Home;