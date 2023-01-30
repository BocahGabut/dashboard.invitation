// import Cookies from "js-cookie";
// import { NextResponse } from "next/server";
// const PUBLIC_FILE = /\.(.*)$/;

// const middleware = (req,res) => {
//     const response = new NextResponse()
//     if (!response.cookies.get('auth-prefix')) {
//         if (!request.nextUrl.pathname.includes("/login")) {
//             const url = req.nextUrl.clone();
//             url.pathname = `/login`;
//             return NextResponse.redirect(url);
//         }
//     } else {
//         //set a cookie
//         response.cookies.set('auth-prefix', 'scret')

//         //get all the details of a cookie
//         const { value } = response.cookies.get('auth-prefix')
//         console.log(value)
//     }

// }

const middleware = (req, res) => {
    // const token = Cookies.get('auth-prefix')
    // if (!token) {
    //     const shouldHandleLocale =
    //         !PUBLIC_FILE.test(req.nextUrl.pathname) &&
    //         !req.nextUrl.pathname.includes("/login") &&
    //         !req.nextUrl.pathname.includes("/register")

    //     if (shouldHandleLocale) {
    //         const url = req.nextUrl.clone();
    //         url.pathname = (!req.nextUrl.pathname.includes("/login")) ? `/login` : `/register`;
    //         return NextResponse.redirect(url);
    //     }
    // }else {
    //     console.log(token)
    //     const url = req.nextUrl.clone();
    //     url.pathname = (!req.nextUrl.pathname.includes("/")) ? `/` : req.nextUrl.pathname;
    //     return NextResponse.redirect(url);
    // }
    // console.log(token)
}

export { middleware };

