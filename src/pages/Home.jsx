import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Test from "../apis/test";
import { changeValue } from "../features/test/testSlice";
import useAuth from "../hooks/useAuth";

function Home() {
    // const valueTest = useSelector(state => state.test.value);
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const {token, user} = useAuth();
    const permissions = useSelector(state => state.auth.permissions);

    const testApi = async () => {
        let res = await Test.getTest();
        console.log(res);
    }


    useEffect(() => {
        // console.log(permissions);
    }, [])
    return ( 
        <div 
        style={{display:"flex", alignItems:"flex-end", height: "1000px"}}
        
        >

            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/IMG_logo_%282017%29.svg/330px-IMG_logo_%282017%29.svg.png"
                 alt=""
                loading="lazy"
            />
        </div>
     );
}

export default Home;