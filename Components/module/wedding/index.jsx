import React, { useRef, useState } from "react";

import FormStep1 from "./formStep-1";
import FormStep2 from "./formStep-2";
import FormStep3 from "./formStep-3";
import FormStep4 from "./formStep-4";
import FormStep5 from "./formStep-5";
import FormStep6 from "./formStep-6";

import { toast, ToastContainer } from 'react-toastify';

import axios from "axios";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';
import { rootApi } from "../../../Context/config-app";

const Wedding = ({ setLoadInvitation, propsData }) => {
    const [formStep, setFormStep] = useState(3)
    const [progress, setProgress] = useState(0)

    const [countPost, setCountPost] = useState(0)

    //form step 1
    const judul = useRef('')
    const [dates, setDates] = useState(propsData.tanggal)

    //form step 2
    const female_name = useRef('')
    const female_bio = useRef('')
    const female_instagram = useRef('')
    const male_name = useRef('')
    const male_bio = useRef('')
    const male_instagram = useRef('')

    const handleSaveStep1 = () => {
        axios({
            method: 'POST',
            url: `${rootApi}/api/invitation`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
            data: {
                _judul: judul.current.value,
                _dates: dates,
                _type: 1,
                _id:(Cookies.get('relix-prefix')) ? Cookies.get('relix-prefix') : ''
            }
        }).then(response => {
            const result = response.data
            setCountPost(countPost+1)
            if (result.status.indexOf('*OK*') != '-1') {
                setLoadInvitation(countPost)
                Cookies.set('relix-prefix', result.data,{ secure: true,expires: 1 });
            }
        }).catch((err) => console.log(err))
    }

    const handleSaveStep2 = () => {
        axios({
            method: 'POST',
            url: `${rootApi}/api/invitation/couple`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
            data: {
                male: {
                    male_name:male_name.current.value,
                    male_bio:male_bio.current.value,
                    male_instagram:male_instagram.current.value,
                },
                female: {
                    female_name:female_name.current.value,
                    female_bio:female_bio.current.value,
                    female_instagram:female_instagram.current.value,
                },
                _id:(Cookies.get('relix-prefix')) ? Cookies.get('relix-prefix') : ''
            }
        }).then(response => {
            const result = response.data
            setCountPost(countPost+1)
            if (result.status.indexOf('*OK*') != '-1') {
                setLoadInvitation(countPost)
            }
        }).catch((err) => console.log(err))
    }

    const validationForm = () => {
        if (judul.current.value === '')
            return toast.error('Judul undangan tidak boleh kosong', {
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

    const handleFormStep = () => {
        validationForm()
        switch (formStep) {
            case 1:
            return handleSaveStep1(), setFormStep(2), setProgress(20)
            case 2:
                return handleSaveStep2(), setFormStep(3), setProgress(40)
            case 3:
                return setFormStep(4), setProgress(60)
            case 4:
                return setFormStep(5), setProgress(80)
            case 5:
                return setFormStep(6), setProgress(100)
        }
    }

    const handleFormPrevious = () => {
        switch (formStep) {
            case 2:
                return setFormStep(1), setProgress(0)
            case 3:
                return setFormStep(2), setProgress(20)
            case 4:
                return setFormStep(3), setProgress(40)
            case 5:
                return setFormStep(4), setProgress(60)
            case 6:
                return setFormStep(5), setProgress(80)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="col-sm-10 col-md-10 col-lg-9 col-xl-8">
                <div className="my-3">
                    <div className="card no-shadow">
                        <div className="card-body p-4">
                            <div id="custom-progress-bar" className="proces progress-nav mb-4">
                                <div className="progress" style={{ height: 1, top: '70%' }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <ul className="nav nav-pills progress-bar-tab custom-nav" role="tablist">
                                    <li className="nav-item d-flex flex-column align-items-center" role="presentation">
                                        Mulai
                                        <button disabled={(formStep === 1) ? false : true} className={`nav-link rounded-pill ${(formStep === 1) ? 'active' : ''}`} data-progressbar="custom-progress-bar" id="pills-gen-info-tab" data-bs-toggle="pill" data-bs-target="#pills-gen-info" type="button" role="tab" aria-controls="pills-gen-info" aria-selected="true">1</button>
                                    </li>
                                    <li className="nav-item d-flex flex-column align-items-center" role="presentation">
                                        Pasangan
                                        <button disabled={(formStep === 2) ? false : true} className={`nav-link rounded-pill ${(formStep === 2) ? 'active' : ''}`} data-progressbar="custom-progress-bar" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#pills-success" type="button" role="tab" aria-controls="pills-success" aria-selected="false">2</button>
                                    </li>
                                    <li className="nav-item d-flex flex-column align-items-center" role="presentation">
                                        Acara
                                        <button disabled={(formStep === 3) ? false : true} className={`nav-link rounded-pill ${(formStep === 3) ? 'active' : ''}`} data-progressbar="custom-progress-bar" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#pills-success" type="button" role="tab" aria-controls="pills-success" aria-selected="false">3</button>
                                    </li>
                                    <li className="nav-item d-flex flex-column align-items-center" role="presentation">
                                        Tema
                                        <button disabled={(formStep === 4) ? false : true} className={`nav-link rounded-pill ${(formStep === 4) ? 'active' : ''}`} data-progressbar="custom-progress-bar" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#pills-success" type="button" role="tab" aria-controls="pills-success" aria-selected="false">4</button>
                                    </li>
                                    <li className="nav-item d-flex flex-column align-items-center" role="presentation">
                                        Bagikan
                                        <button disabled={(formStep === 5) ? false : true} className={`nav-link rounded-pill ${(formStep === 5) ? 'active' : ''}`} data-progressbar="custom-progress-bar" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#pills-success" type="button" role="tab" aria-controls="pills-success" aria-selected="false">5</button>
                                    </li>
                                    <li className="nav-item d-flex flex-column align-items-center" role="presentation">
                                        Paket
                                        <button disabled={(formStep === 6) ? false : true} className={`nav-link rounded-pill ${(formStep === 6) ? 'active' : ''}`} data-progressbar="custom-progress-bar" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#pills-success" type="button" role="tab" aria-controls="pills-success" aria-selected="false">6</button>
                                    </li>
                                </ul>
                                <div className="d-md-none text-right position-absolute" style={{ top: 5 }}>
                                    <strong className="text-primary">{formStep}</strong>
                                    <small className="text-muted"> / 6</small>
                                </div>
                            </div>
                            <div className="tab-content py-3">
                                <div className={`tab-pane fade show ${(formStep === 1) ? 'active' : ''}`} style={{ display: `${(formStep === 1) ? 'block' : 'none'}` }} id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                                    <FormStep1 judul={judul} setDates={setDates} propsData={propsData} />
                                </div>
                                <div className={`tab-pane fade show ${(formStep === 2) ? 'active' : ''}`} style={{ display: `${(formStep === 2) ? 'block' : 'none'}` }} id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                                    <FormStep2 propsData={propsData.couple} female_name={female_name} female_bio={female_bio} female_instagram={female_instagram} male_name={male_name} male_bio={male_bio} male_instagram={male_instagram} />
                                </div>
                                <div className={`tab-pane fade show ${(formStep === 3) ? 'active' : ''}`} style={{ display: `${(formStep === 3) ? 'block' : 'none'}` }} id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                                    <FormStep3 propsData={propsData.events} />
                                </div>
                                <div className={`tab-pane fade show ${(formStep === 4) ? 'active' : ''}`} style={{ display: `${(formStep === 4) ? 'block' : 'none'}` }} id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                                    <FormStep4 />
                                </div>
                                <div className={`tab-pane fade show ${(formStep === 5) ? 'active' : ''}`} style={{ display: `${(formStep === 5) ? 'block' : 'none'}` }} id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                                    <FormStep5 />
                                </div>
                                <div className={`tab-pane fade show ${(formStep === 6) ? 'active' : ''}`} style={{ display: `${(formStep === 6) ? 'block' : 'none'}` }} id="pills-gen-info" role="tabpanel" aria-labelledby="pills-gen-info-tab">
                                    <FormStep6 />
                                </div>
                            </div>
                            <div className="col-md-12 mt-7 d-flex">
                                {
                                    (formStep > 1) ?
                                        <button className="btn btn-outline-dark mr-3" type="button" onClick={(e) => handleFormPrevious()}>
                                            Back
                                        </button>
                                        : ''
                                }
                                <button className="btn btn-soft-secondary form-control" type="button" onClick={(e) => handleFormStep()}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wedding