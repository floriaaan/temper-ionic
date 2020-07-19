import { useHistory } from "react-router-dom";
export const auth_middleware = () => {
    let logged = localStorage.getItem('auth.logged');
    const history = useHistory();
    if (logged !== '1') {
        history.push('/');
    }
}