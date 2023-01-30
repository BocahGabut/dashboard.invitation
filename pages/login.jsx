import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

import Footer from "../Components/Footer";
import { rootApi } from "../Context/config-app";

import Cookies from "js-cookie";
import Head from "next/head";
import Router from "next/router";

import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const randomString = (length) => Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');

    const email = useRef('')
    const password = useRef('')

    const form = [
        [email.current.value, val => val !== '', 'Email tidak boleh kosong'],
        [password.current.value, val => val !== '', 'Password tidak boleh kosong'],
    ]

    useEffect(() => {
        if (!Cookies.get('auth-prefix')) {
        } else {
            Router.push('/')
        }
        window.addEventListener('message', function(event) {
            if (event.data.status === 'success') {
                Cookies.set('auth-prefix', event.data.prefix_classname,{ secure: true,expires: 1 });
                Cookies.set('relix-prefix', event.data.invitation,{ secure: true,expires: 1 });
                Router.push('/');
            }
        });
    }, []);

    const hanldeAuthGoogle = () => {
        return window.open(`${rootApi+'/api/auth?credential='}${btoa(btoa('google')+'.'+btoa(randomString(45)))}`,'popUpWindow','height=650,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    }

    const handleAuth = () => {
        const isFormValid = form.every(([input, validationRule]) => validationRule(input))

        if (!isFormValid) {
            const errorMessage = form.find(([input, validationRule]) => !validationRule(input))[2];
            return toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            axios({
                method: 'POST',
                url: `${rootApi}/api/login`,
                data: {
                    _email: btoa(email.current.value),
                    _password: btoa(password.current.value),
                }
            }).then(response => {
                const result = response.data
                if (result.status === 'failed') {
                    switch (result.data) {
                        case '*FLD*':
                            return toast.error('Email or Password not valid.', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })
                        case '*TRD*':
                            return toast.error('You register with Google or Facebook, Please login with another.', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })
                    }
                } else {
                    Cookies.set('auth-prefix', result.data, { secure: true, expires: 1 });
                    Cookies.set('relix-prefix', result.invitation, { secure: true, expires: 1 });
                    Router.push('/');
                }
            }).catch((err) => console.log(err))
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <section className="" style={{ backgroundSize:'cover',backgroundPosition:'center',backgroundImage:'url("/images/circle-striped.svg"),linear-gradient(135deg, #486ef0 0%, #3ca6f9 100%)' }}>
            <ToastContainer />
                <div className="container py-15">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4">
                            <div className="my-3 text-center">
                                <Link href='/'>
                                    <Image src='/images/logo-inverse.svg' width={200} height={80} alt="logo" />
                                </Link>
                            </div>
                            <div className="card no-shadow">
                                <div className="card-body">
                                    <h1 className="h3">Login</h1>
                                    <div className="border border-dashed mb-3 mt-2" />
                                    <div className="mt-2">
                                        <label>Email</label>
                                        <input ref={email} type="email" className="form-control" />
                                    </div>
                                    <div className="mt-5">
                                        <label className="d-flex justify-content-between">
                                            Password
                                            <Link href='/'>Lupa password?</Link>
                                        </label>
                                        <input ref={password} type="password" className="form-control" />
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn-soft-info form-control" type="button" onClick={(e) => handleAuth()}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <span>Or</span>
                                    </div>
                                    <div className="mt-4 mb-5">
                                        <button className="btn btn-outline-dark form-control" onClick={() => hanldeAuthGoogle()} style={{ display:'flex',justifyContent:'center',gap:10 }}>
                                            Login with Google
                                        </button>
                                        <button className="btn btn-outline-dark form-control mt-3" style={{ display:'flex',justifyContent:'center',gap:10 }}>
                                            Login with Facebook
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 text-center text-white">
                                <span>Belum punya akun?</span>
                                <div className="mb-2 mt-6">
                                    <Link href='/register' className="btn btn-outline-light btn-block form-control">
                                        Daftar Sekarang
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Login