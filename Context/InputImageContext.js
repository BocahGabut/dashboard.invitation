import axios from "axios";

import Cookies from "js-cookie";
import { directLogin, rootApi } from "./config-app";

export const getSticker = (keyword,offset) => {
    return axios({
        method: 'POST',
        url: `${rootApi}/api/sticker`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
        },
        data: {
            _key: keyword,
            _offset: offset,
        }
    }).then(response => {
        const result = response.data
        return result
    }).catch((err) => {
        if (err.response.status === 401) {
            directLogin(err.response.status)
        }
        console.log(err)
    })
}