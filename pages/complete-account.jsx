import Head from "next/head";
import React, { useEffect, useState } from "react";
import FormImage from "../Components/form-image";
import Layout from "../Components/Layout";

import dynamic from "next/dynamic";
import country from '../Components/Utils/country';
import { getUser } from "../Context/getUser";
const Select = dynamic(() => import('react-select'), { ssr: false })

import { sendCompleteAccount } from "../Context/getUser";

const CompleteAccount = () => {
    const [selectCountry, setSelectCountry] = useState([])
    const [loading, setLoading] = useState(true)

    const [defaultProfile, setdefaultProfile] = useState('')
    const [defaultSelect, setDefaultSelect] = useState({})

    const [fullName, setFullName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [profile, setProfile] = useState("")
    const [handphone, setHandphone] = useState(undefined)
    const [countryCode, setCountryCode] = useState("")

    const [messageError, setMessageError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser()
                setFullName(data.name)
                setEmail(data.email)
                setHandphone(data.no_handphone)
                setdefaultProfile((data.profile === 'default') ? 'none' : data.profile)

                const country_code = country.filter(obj => obj.dial_code === data.phone_code)[0]
                setCountryCode(data.phone_code)
                setSelectCountry(country.map((cntry) => ({ value: cntry.code, label: cntry.dial_code })))
                setLoading(false)
                setDefaultSelect({value:country_code.code,label:country_code.dial_code})
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [loading]);

    const handleNextStep = () => {
        if (fullName === '') return setMessageError('Full name is required...')
        if (handphone === null) return setMessageError('No.Handphone is required...')
        if (countryCode === '') return setMessageError('Select your country code')

        sendCompleteAccount(fullName,countryCode,handphone,profile)
    }

    return (
        <>
            <Layout fullNavbarTop={true} fullFooter={true}>
                <Head>
                    <title>Complete Account</title>
                </Head>
                {
                    (loading) ? '' :
                    <>
                        <div className="py-15">
                            <div className="row justify-content-center">
                                <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4">
                                    <div className="my-3">
                                        <form id="form-validate">
                                            <div className="card no-shadow">
                                                <div className="card-body">
                                                    <h1 className="h3">Register</h1>
                                                    <p>Complete account for next</p>
                                                    <div className="border border-dashed mb-3 mt-2" />
                                                    {
                                                        (messageError === '') ? '' :
                                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                            {messageError}
                                                            <button onClick={(e) => setMessageError('')} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>
                                                    }
                                                    <div className="mt-2">
                                                        <label>Photo Profile</label>
                                                        <FormImage callBack={setProfile} defaultValue={defaultProfile} fileAccept="image/jpeg,image/png" taget_id="00128da00AKD" />
                                                    </div>
                                                    <div className="mt-5">
                                                        <label>Full Name <span className="text-danger">*</span></label>
                                                        <input type="text" name="fullname" required value={fullName||""} onChange={(e) => setFullName(e.target.value)} className="form-control" />
                                                    </div>
                                                    <div className="mt-5">
                                                        <label>Email <span className="text-danger">*</span></label>
                                                        <input type="text" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email||""} readOnly style={{ background: 'transparent', border: 'none',paddingLeft:9 }} required className="form-control" />
                                                    </div>
                                                    <div className="mt-5">
                                                        <label>
                                                            No. Handphone
                                                            <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="position-relative d-flex">
                                                            <div style={{ width: 170 }}>
                                                                <Select
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    isDisabled={false}
                                                                    isLoading={false}
                                                                    isClearable={false}
                                                                    isRtl={false}
                                                                    isSearchable={true}
                                                                    name="fonts"
                                                                    value={defaultSelect}
                                                                    onChange={(e) => { setCountryCode(e.label) }}
                                                                    options={selectCountry}
                                                                />
                                                            </div>
                                                            <input name="handphone" value={handphone||""} onChange={(e) => setHandphone(e.target.value)} required style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }} type="number" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-5">
                                                        <button type="button" className="btn btn-soft-info form-control" onClick={(e) => handleNextStep()}>
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </Layout>
        </>
    )
}

export default CompleteAccount