import { NextResponse } from "next/server";

const middleware = (req) => {
    // console.log('file middleware')
    const response = new NextResponse()

    //set a cookie
    response.cookies.set('auth', 'scret')

    //get all the details of a cookie
    const { value } = response.cookies.get('auth')

    // console.log(value)
}


export { middleware };

