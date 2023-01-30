import axios from "axios"
import Cookies from "js-cookie"
import { rootApi } from "./config-app"

const sendOtp = (number) => {
    axios({
        url: `${rootApi}/api/auth/verification-number`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
        },
        data: {
            number:number
        }
    }).then(response => {
        return response.data
    }).catch((err) => console.log(err))
}

export default sendOtp