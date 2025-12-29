export type UserRole = "SUPER_ADMIN" | "ADMIN" | "VENDOR" | "CUSTOMER";

export type RouteConfig ={
    exact:string[],
    patterns:RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes:RouteConfig = {
    exact:["/my-profile", "/settings", "/change-password"],
    patterns:[/^\/profile/, /^\/account/],
};


export const adminProtectedRoutes:RouteConfig ={
    exact:[],
    patterns:[/^\/dashboard\/admin/],
};


export const vendorProtectedRoutes:RouteConfig = {
    exact:["/dashboard/vendor"],
    patterns:[/^\/dashboard\/vendor/],
};



export const customerProtectedRoutes:RouteConfig ={
       exact:["/dashboard/customer", "/checkout"],
       patterns:[/^\/dashboard\/customer/, /^\/checkout/, /^\/payment-(success|failed)/, ],
};


export const  isAuthRoute = (pathname:string): boolean => {
    return authRoutes.some((route:string) => route === pathname);
};

export const isShopRoute = (pathname: string) => {
  return pathname === "/shop" || pathname === "/shop-page";
};


export const isRouteMatches = (pathname:string, routes:RouteConfig): boolean => {
    if(routes.exact.includes(pathname)){
        return true;
    }
   return routes.patterns.some((pattern:RegExp) => pattern.test(pathname));
};



export const getRouteOwner = (pathname:string):"SUPER_ADMIN" | "ADMIN" | "VENDOR" | "CUSTOMER" | "COMMON" | null => {
    if(isRouteMatches(pathname, adminProtectedRoutes)){
        return "ADMIN";
    }

    if(isRouteMatches(pathname, vendorProtectedRoutes)){
        return "VENDOR";
    }

    if(isRouteMatches(pathname, customerProtectedRoutes)){
        return "CUSTOMER";
    }

    if(isRouteMatches(pathname, commonProtectedRoutes)){
        return "COMMON";
    }

    return null;
};





export const getDefaultDashboardRoute = (role:UserRole): string => {
    switch(role){
        case "SUPER_ADMIN":
            return "/dashboard/admin";
        case "ADMIN":
            return "/dashboard/admin";
        case "VENDOR":
            return "/dashboard/vendor";
        case "CUSTOMER":
            return "/dashboard/customer";
        default:
            return "/";                
    }
};


export const isValidRedirectForRole = (redirectPath:string, role:UserRole): boolean => {
    

    const routeOwner = getRouteOwner(redirectPath);

    if(routeOwner === null  || routeOwner === "COMMON"){
        return true;
    }

    if(role === "SUPER_ADMIN" && routeOwner === "ADMIN"){
        return true;
    }

    if(routeOwner === role){
        return true;
    }

    return false;
}
