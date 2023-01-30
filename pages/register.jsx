import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import Router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Components/Footer";
import country from '../Components/Utils/country';
import { rootApi } from "../Context/config-app";

const Select = dynamic(() => import('react-select'), { ssr: false })
const PasswordChecklist = dynamic(() => import('react-password-checklist'), { ssr: false })

const Register = () => {
    const [selectCountry, setSelectCountry] = useState([])
    const randomString = (length) => Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
    const [countryCode, setCountryCode] = useState('')

    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValid] = useState(false)

    const name = useRef('')
    const email = useRef('')
    const no_handphone = useRef('')
    const know_us = useRef('')

    const form = [
        [name.current.value, val => val !== '', 'Nama tidak boleh kosong'],
        [email.current.value, val => val !== '', 'Email tidak boleh kosong'],
        [email.current.value, val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val), 'Email address tidak valid'],
        [no_handphone.current.value, val => val !== '', 'No Handphone tidak boleh kosong'],
        [know_us.current.value, val => val !== '', 'Silahkan pilih salah satu option darimana tau kami'],
        [countryCode, val => val !== '', 'Silahkan pilih kode negara'],
        [password, val => val !== '', 'Password tidak boleh kosong'],
        [password, val => passwordValid, 'Password tidak valid'],
    ]

    useEffect(() => {
        setSelectCountry(country.map((cntry) => ({ value: cntry.code, label: cntry.dial_code })))
        window.addEventListener('message', function (event) {
            if (event.data.status === 'success') {
                Cookies.set('auth-prefix', event.data.prefix_classname, { secure: true, expires: 1 });
                Router.push('/');
            }
        });
    }, []);

    const hanldeAuthGoogle = () => {
        return window.open(`${rootApi + '/api/auth?credential='}${btoa(btoa('google') + '.' + btoa(randomString(45)))}`, 'popUpWindow', 'height=650,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    }

    const handleRegister = () => {
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
                url: `${rootApi}/api/register`,
                data: {
                    _name: name.current.value,
                    _email: email.current.value,
                    _no_handphone: no_handphone.current.value,
                    _know_us: know_us.current.value,
                    _password: password,
                    _country_code: countryCode,
                }
            }).then(response => {
                const result = response.data
                if (result.status === 'failed' && result.data === '*EML*') {
                    return toast.error('Email sudah terdaftar, Silahkan Login', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                } else {
                    Cookies.set('auth-prefix', result.prefix_classname, { secure: true, expires: 1 });
                    Router.push('/');
                }
            }).catch((err) => console.log(err))
        }
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <ToastContainer />
            <section className="" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url("/images/circle-striped.svg"),linear-gradient(135deg, #486ef0 0%, #3ca6f9 100%)' }}>
                <div className="container py-15">
                    <div className="row justify-content-center">
                        <div className="col-sm-9 col-md-7 col-lg-6 col-xl-5">
                            <div className="my-3 text-center">
                                <Link href='/'>
                                    <Image src='/images/logo-inverse.svg' width={200} height={80} alt="logo" />
                                </Link>
                            </div>
                            <div className="card no-shadow">
                                <div className="card-body">
                                    <h1 className="h3">Register</h1>
                                    <p>Have a digital wedding invitation in 5 minutes!</p>
                                    <div className="border border-dashed mb-3 mt-2" />
                                    <div className="mt-2">
                                        <label>Name</label>
                                        <input ref={name} type="text" className="form-control" />
                                    </div>
                                    <div className="mt-5">
                                        <label>Email</label>
                                        <input ref={email} type="email" className="form-control" />
                                    </div>
                                    <div className="mt-5">
                                        <label>
                                            No. Handphone
                                        </label>
                                        <div className="position-relative d-flex">
                                            <div style={{ width: 170 }}>
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    isClearable={false}
                                                    defaultValue={''}
                                                    isRtl={false}
                                                    isSearchable={true}
                                                    name="fonts"
                                                    onChange={(e) => { setCountryCode(e.label) }}
                                                    options={selectCountry}
                                                />
                                            </div>
                                            <input ref={no_handphone} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>
                                            Password
                                        </label>
                                        <input onChange={e => setPassword(e.target.value)} aria-autocomplete="list" type="password" className="form-control" />
                                    </div>
                                    <div className="mt-4 px-3 py-2">
                                        <PasswordChecklist
                                            rules={["minLength", "specialChar", "number", "capital"]}
                                            minLength={5}
                                            value={password}
                                            valueAgain={''}
                                            onChange={(isValid) => setPasswordValid(isValid)}
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label>
                                            How to Know Us?
                                        </label>
                                        <select ref={know_us} name="acquisition_source" defaultValue={''} className="form-control" id="">
                                            <option value="" disabled>- Pilih -</option>
                                            <option value="friend">Teman</option>
                                            <option value="vendor">Vendor</option>
                                            <option value="influencer">Influencer</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="tiktok">TikTok</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="search_engine">Google/Search Engine</option>
                                            <option value="ads">Iklan</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-muted" style={{ fontSize: 13 }}>
                                            <small>
                                                By registering, I agree
                                                <Link href='' target="_blank" className="text-info"> Terms and Conditions </Link>
                                                and
                                                <Link href='' target="_blank" className="text-info"> Privacy Policy</Link>
                                                .
                                            </small>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn-soft-info form-control" type="button" onClick={(e) => handleRegister()}>
                                            Get Now
                                        </button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <span>Or</span>
                                    </div>
                                    <div className="mt-4 mb-5">
                                        <button className="btn btn-outline-dark form-control" onClick={() => hanldeAuthGoogle()} style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                                            Register with Google
                                        </button>
                                        <button className="btn btn-outline-dark form-control mt-3" style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                                            Register with Facebook
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 text-center text-white">
                                <span>Already have an account?</span>
                                <div className="mb-2 mt-6">
                                    <Link href='/login' className="btn btn-outline-light btn-block form-control">
                                        Login
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

export default Register