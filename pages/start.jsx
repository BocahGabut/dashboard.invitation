import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

import Wedding from "../Components/module/wedding";

import Cookies from "js-cookie";
import { rootApi } from "../Context/config-app";

const Start = () => {
    const [typeInvitation, setTypeInvitation] = useState('')
    const [loadInvitation, setLoadInvitation] = useState('')

    const [propsData, setPropsData] = useState({})

    function renderSwitch() {
        switch (typeInvitation) {
            case 'wedding':
                return <Wedding setLoadInvitation={setLoadInvitation} propsData={propsData} />
        }
    }

    useEffect(() => {
        if (Cookies.get('relix-prefix')) {
            axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
                },
                url:`${rootApi}/api/invitation/${Cookies.get('relix-prefix')}`
            }).then(response => {
                const result = response.data
                setPropsData(result.data)
                switch (result.data.type) {
                    case 1:
                        if(typeInvitation !== 'wedding') setTypeInvitation('wedding')
                        break
                }
            }).catch((err) => console.log(err))
        }
    }, [loadInvitation]);

    return (
        <>
            <Head>
                <title>Mulai - Invedo</title>
            </Head>
            <Layout fullNavbarTop={true} fullFooter={true} loadInvitation={loadInvitation}>
                <div className="py-2">
                    <div className="row justify-content-center">
                        {
                            (typeInvitation === '') ?
                            <div className="col-sm-10 col-md-10 col-lg-9 col-xl-7">
                                <div className="my-3">
                                    <div className="card no-shadow">
                                        <div className="card-body p-4">
                                            <div className="row">
                                                <div className="col-6 col-md-4 col-xl-3 mb-3 border-border text-center mt-3" onClick={(e) => setTypeInvitation('wedding')}>
                                                    <div style={{ cursor:'pointer' }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/rjzlnunf.json"
                                                            trigger="hover"
                                                            style={{ width: 100, height: 100 }}>
                                                        </lord-icon>
                                                        <h6 className="text-info">Pernikahan</h6>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-md-4 col-xl-3 mb-3 border-border text-center mt-3" onClick={(e) => setTypeInvitation('khitanan')}>
                                                    <div style={{ cursor:'pointer' }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/mfqgdxxm.json"
                                                            trigger="hover"
                                                            style={{ width: 100, height: 100 }}>
                                                        </lord-icon>
                                                        <h6 className="text-info">Khitanan</h6>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-md-4 col-xl-3 mb-3 border-border text-center mt-3" onClick={(e) => setTypeInvitation('seminar')}>
                                                    <div style={{ cursor:'pointer' }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/fpipqhrr.json"
                                                            trigger="hover"
                                                            style={{ width: 100, height: 100 }}>
                                                        </lord-icon>
                                                        <h6 className="text-info">Seminar</h6>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-md-4 col-xl-3 mb-3 border-border text-center mt-3" onClick={(e) => setTypeInvitation('syukuran')}>
                                                    <div style={{ cursor:'pointer' }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wvmphzds.json"
                                                            trigger="hover"
                                                            style={{ width: 100, height: 100 }}>
                                                        </lord-icon>
                                                        <h6 className="text-info">Syukuran</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                :
                            renderSwitch()
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Start