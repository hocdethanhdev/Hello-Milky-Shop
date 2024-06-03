import React, {useEffect} from "react";
import { apiLoginEmail } from "../apis/authService";
import { useParams } from "react-router-dom";

const LoginEmail = () => {
    const { email } = useParams();

    useEffect(() => {
        const fetchToken = async () => {
            let response = await apiLoginEmail(email);
            console.log(response);
        }
        fetchToken();
    }, []);

    return (
        <div>LoginEmail</div>
    )
}

export default LoginEmail;