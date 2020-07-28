
export const dev_middleware = () => {
    let dev = localStorage.getItem('auth.dev');
    if (dev !== '1' && window.location.pathname === '/dev') {
        window.location.pathname = "/";
    }
}