import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie } from "./lib/tokenHandlers";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, isShopRoute, isValidRedirectForRole, UserRole } from "./lib/auth-utils";
import jwt, { JwtPayload } from 'jsonwebtoken';








export async function proxy(request:NextRequest){
    const pathname = request.nextUrl.pathname;
     const search = request.nextUrl.search;

    const hasTokenRefreshedParam = request.nextUrl.searchParams.has("tokenRefreshed");

    if(hasTokenRefreshedParam){
        const url = request.nextUrl.clone();
        url.searchParams.delete("tokenRefreshed");
        return NextResponse.redirect(url);
    }


    const accessToken = (await getCookie("accessToken")) || null;
    let userRole: UserRole | null = null;
    console.log(accessToken);
    

    if(accessToken) {
        try{
            const verifyToken:JwtPayload | string = jwt.verify(
                accessToken,
                process.env.JWT_SECRET as string
            );

            if(typeof verifyToken === "string"){
                await deleteCookie("accessToken");
                await deleteCookie("refreshToken");

                if(pathname !== "/login"){
                    return NextResponse.redirect(new URL("/login", request.url));
                }
                return NextResponse.next();
            }

            userRole = verifyToken.role as UserRole;
        } catch(error){
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");

            if(!isAuthRoute(pathname)){
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("redirect",pathname);
                return NextResponse.redirect(loginUrl);
            }
            return NextResponse.next();
        }
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    if(accessToken && userRole && isAuth){
        const redirectPath = request.nextUrl.searchParams.get("redirect");

  if (
    redirectPath &&
    isValidRedirectForRole(redirectPath, userRole)
  ) {
    return NextResponse.redirect(
      new URL(redirectPath, request.url)
    );
  }

  return NextResponse.redirect(
    new URL(getDefaultDashboardRoute(userRole), request.url));

    }

     if (!accessToken && isShopRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  
    if(routeOwner === null){
        if (pathname.startsWith("/product") && !accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
        return NextResponse.next();
    }

    if(!accessToken){
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if(routeOwner === "COMMON"){
        return NextResponse.next();
    }


    if(routeOwner === "ADMIN" || routeOwner === "VENDOR" || routeOwner === "CUSTOMER"){
        if(routeOwner === "ADMIN" && userRole === "SUPER_ADMIN"){
            return NextResponse.next();
        }

        if(userRole !== routeOwner){
    const defaultRoute = getDefaultDashboardRoute(userRole as UserRole);
      return NextResponse.redirect(new URL(defaultRoute, request.url));
        }
    }
    return NextResponse.next();
}



export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}