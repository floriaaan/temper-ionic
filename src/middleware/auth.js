let auth_routes = ["/register", "/login", "/forgot"];

export const auth_middleware = () => {
  let logged = sessionStorage.getItem("auth.logged");
  if (logged !== "1" && !auth_routes.includes(window.location.pathname)) {
    window.location.pathname = "/login";
  }
};