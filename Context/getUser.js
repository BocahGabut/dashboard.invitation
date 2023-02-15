import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

import { directLogin, rootApi } from "./config-app";

const getUser = () => {
    return axios({
        method: 'GET',
        url: `${rootApi}/api/auth/get-account`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
        }
    }).then(response => {
        return response.data;
    })
        .catch(error => {
            directLogin(error.response.status)
        });
}

export const sendCompleteAccount = (fullName, countryCode, handphone, profile) => {
    const formData = new FormData();
    formData.append('_fullName', fullName);
    formData.append('_handPhone', parseInt(handphone));
    formData.append('_countryCode', countryCode);
    formData.append('_profile', profile);

    axios({
        method: 'POST',
        url: `${rootApi}/api/auth/complete-account`,
        headers: {
            'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
        },
        data: formData
    }).then(response => {
        const result = response.data;
        if (result.indexOf('*OK*') != '-1') {
            return Router.push('/verification-number')
        }
    }).catch((err) => directLogin(err.response.status))
}

export { getUser };

