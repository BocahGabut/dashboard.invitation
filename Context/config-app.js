export const rootApi = 'https://buywedding.cloud'
// export const rootApi = 'http://127.0.0.1:8000'

import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

export const directLogin = (response) => {
    if (response === 401 && Router.pathname !== '/login') {
        Cookies.remove("auth-prefix");
        Router.push('/login')
    }
}

export const refreshToken = () => {
    return axios({
        method: 'POST',
        url: `${rootApi}/api/token`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
        }
    }).then(response => {
        const result = response.data
        Cookies.set('auth-prefix', result.token,{ secure: true,expires: 1 })
    }).catch((err) => console.log(err))
}

export const getInvitation = () => {
    return axios({
        method: 'GET',
        url: `${rootApi}/api/invitation`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
        }
    }).then(response => {
        const result = response.data

        return result
    }).catch((err) => console.log(err))
}