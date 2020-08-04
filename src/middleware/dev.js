
export const dev_middleware = () => {
    let dev = sessionStorage.getItem('auth.dev');
    if (dev !== '1' && window.location.pathname === '/dev') {
        window.location.pathname = "/";
    }
}