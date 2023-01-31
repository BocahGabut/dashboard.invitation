import Layout from "../Components/Layout";

import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { getUser } from "../Context/getUser";
import sendOtp from "../Context/sendOtp";
const IconsI = dynamic(() => import('../Components/Utils/Icons'), { ssr: false })

import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { rootApi } from "../Context/config-app";

const VerificationNumber = () => {
    const [accountData, setAccountData] = useState({})
    const [verifPage, setverifPage] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setAccountData(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleVerification = () => {
        const phoneNumber = accountData.phone_code + accountData.no_handphone
        sendOtp(phoneNumber)
        setverifPage(true)
    }

    const changeNumber = () => {
        axios({
            method: 'POST',
            url: `${rootApi}/api/auth/change-number`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            }
        }).then(response => {
            const result = response.data
        }).catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        const phoneNumber = accountData.phone_code + accountData.no_handphone
        axios({
            method: 'POST',
            url: `${rootApi}/api/auth/verification-otp`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
            data:{
                otp: verificationCode,
                number:phoneNumber
            }
        }).then(response => {
            const result = response.data
            if (result.indexOf('*OK*') != '-1') {
                Router.push('/start')
            }else {
                Swal.fire('Failed','Your code is not valid!!','error')
            }
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <Layout fullNavbarTop={true} fullFooter={true}>
                <Head>
                    <title>Verification Number</title>
                </Head>
                <div className="py-15">
                    <div className="row justify-content-center">
                        {
                            (!verifPage)
                                ?
                                <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6">
                                    <div className="my-3">
                                        <form id="form-validate">
                                            <div className="card no-shadow">
                                                <div className="card-body text-center px-7 d-flex flex-column align-items-center">
                                                    <h1 className="h2">Verifikasi Nomor Handphone</h1>
                                                    <Image src='/images/ebook-reader-outline.gif' height={150} width={150} alt="phone verification" />
                                                    <h5>{accountData.phone_code}{accountData.no_handphone}</h5>
                                                    <Link className="text-info mt-2 mb-3" href='/complete-account' onClick={(e) => changeNumber()}>Ganti dengan Nomor Lain</Link>
                                                    <p className="mt-6">
                                                        Demi menjaga keamanan, Kami ingin melakukan verifikasi ke nomor handphone kamu.
                                                        Yuk lakukan verifikasi sekarang sebelum melanjutkan ke dashboard.
                                                    </p>
                                                    <b>
                                                        <IconsI icons='fa-solid fa-circle-info mr-3' />
                                                        Kami akan mengirimkan kode verifikasi melalui WhatsApp
                                                    </b>
                                                    <button type="button" className="btn btn-info mt-4" onClick={(e) => handleVerification()}>
                                                        Verifikasi Sekarang
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                :
                                <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6">
                                    <div className="my-3">
                                        <form id="form-validate">
                                            <div className="card no-shadow">
                                                <div className="card-body text-center px-7 d-flex flex-column align-items-center">
                                                    <h1 className="h2">Verifikasi Nomor Handphone</h1>
                                                    <Image src='/images/ebook-reader-outline.gif' height={150} width={150} alt="phone verification" />
                                                    <div className="mt-6">
                                                        Kami telah mengirimkan pesan WhtsApp ke nomor <b>{accountData.phone_code}{accountData.no_handphone}</b>
                                                        <br />
                                                        Silahkan masukan kode verifikasi Anda.
                                                    </div>
                                                    <div className="mt-5 mb-5">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                                                            <button onClick={(e) => handleSubmit()} className="btn btn-soft-info" type="button">Verifikasi</button>
                                                        </div>
                                                    </div>
                                                    <span>
                                                        Tidak menerima kode? <span className="text-info" style={{ cursor:'pointer' }} onClick={(e) => handleVerification()}>Kirim Ulang</span>
                                                    </span>
                                                    <Link className="text-info mt-2 mb-3" href='/complete-account' onClick={(e) => changeNumber()}>Ganti dengan Nomor Lain</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default VerificationNumber