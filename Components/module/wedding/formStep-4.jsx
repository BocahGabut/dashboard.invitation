import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Image from "next/image";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { directLogin, rootApi } from "../../../Context/config-app";

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const FormStep4 = ({ propsData, setCountPost, setLoadInvitation, countPost }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

    const [templates, setTemplates] = useState([]);
    const [templatePreview, setTemplatePreview] = useState({});

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${rootApi}/api/templates`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
        }).then(response => {
            const result = response.data
            setTemplates(result.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                directLogin(err.response.status)
            }
        })
    }, []);

    const selectTemplate = () => {
        axios({
            method: 'POST',
            url: `${rootApi}/api/templates`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
            data: {
                _id: templatePreview.id,
                _invitation: Cookies.get('relix-prefix')
            }
        }).then(response => {
            const result = response.data
            if (result.status.indexOf('*OK*') != '-1') {
                setCountPost(countPost + 1)
                setLoadInvitation(countPost)
                return toast.success('Thema berhasil di pilih.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                directLogin(err.response.status)
            }
        })
    }

    return (
        <>
            <form id="0b2c308432d8ff94f2510e81f47f06f3">
                <div>
                    <div className="row mt-6">
                        <div className="col-md-12 mb-8">
                            <div className="text-center">
                                <h2>Pilih Tema</h2>
                                <span>
                                    Berbagai pilihan tema sudah kami sediakan secara gratis. Masih belum sesuai? Kami menyediakan berbagai tema premium setelah akun kamu aktif.
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {
                                    templates.map((template, index) => {
                                        return (
                                            <div className="col-6 col-sm-6 col-md-4 col-xl-3 mb-4" key={index} style={{ cursor: 'pointer' }} onClick={() => { setTemplatePreview(template), setOpenModal(true) }}>
                                                <div className={`card ${(propsData.theme_id === template.id) ? 'border-success' : 'border-0'} no-shadow theme-item`} style={{ borderWidth: (propsData.theme_id === template.id) ? 1 : 0 }}>
                                                    <div className="card-body">
                                                        <div className="position-relative">
                                                            <div className="theme-item-preview-desktop position-absolute shadow">
                                                                {
                                                                    (template.img_desktop === 'demo') ?
                                                                        <Image src='/images/theme/thumb_1654864_200_200_0_646_crop.jpg' width={250} height={250} alt="desktop preview" />
                                                                        : ''
                                                                }
                                                            </div>
                                                            <div className="theme-item-preview-mobile position-absolute shadow">
                                                                {
                                                                    (template.img_mobile === 'demo') ?
                                                                        <Image src='/images/theme/thumb_1654863_200_600_0_2446_crop.jpg' width={250} height={250} alt="desktop preview" />
                                                                        : ''
                                                                }
                                                            </div>
                                                            {
                                                                (propsData.theme_id === template.id) ?
                                                                    <span className="badge badge-soft-success position-absolute" style={{ top: "-1rem", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                                                                        <IconsI icons='fa fa-fw fa-check' />
                                                                        Tema Aktif
                                                                    </span>
                                                                    : ''
                                                            }
                                                        </div>
                                                        <div className="mt-4 pl-3">
                                                            <h5 className="m-0">{template.name}</h5>
                                                            {
                                                                (template.price === '0')
                                                                    ?
                                                                    <div className="text-info">
                                                                        Gratis
                                                                    </div>
                                                                    :
                                                                    <div className="text-danger d-md-flex md-flex-column">
                                                                        {/* <del className="text-muted mr-3">
                                                                            <small>Rp 100.000</small>
                                                                        </del> */}
                                                                        Rp 50.000
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </form>
            <Modal
                show={openModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 bg-light h-100 position-relative p-3 p-lg-4 d-flex justify-content-center scrollbar" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                            <Image style={{ width: '100%', height: '100%' }} src='/images/theme/61fe64cdbb454583928053.png' width={850} height={850} alt="full preview" />
                        </div>
                        <div className="col-md-6">
                            <Modal.Header closeButton >
                                <Modal.Title>{templatePreview.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Image style={{ width: 32, height: 32 }} src='/images/logo-placeholder.jpg' className="mr-3" width={150} height={150} alt="full preview" />
                                        by <strong>{templatePreview.publish}</strong>
                                    </div>
                                    <hr className="mt-4 mb-4" />
                                    {
                                        (templatePreview.price === '0')
                                            ?
                                            <div className={`h5 ${(templatePreview.id === propsData.theme_id) ? 'text-success' : 'text-info'}`}>
                                                Gratis
                                            </div>
                                            :
                                            <>
                                                {/* <div className="text-muted">
                                                    <del className="text-muted mr-3">
                                                        <small>Rp 100.000</small>
                                                    </del>
                                                </div> */}
                                                <div className="h5 mb-2 text-primary" style={{ fontWeight: 700 }}>
                                                    Rp 50.000
                                                </div>
                                            </>
                                    }

                                    <button className={`btn ${(templatePreview.id === propsData.theme_id) ? 'btn-outline-success' : 'btn-info'} btn-block`} disabled={(templatePreview.id === propsData.theme_id) ? true : false} onClick={() => selectTemplate()}>
                                        <IconsI icons='fa fa-fw fa-check' />
                                        {
                                            (templatePreview.id === propsData.theme_id) ? 'Tema Aktif' : 'Pakai Tema'
                                        }
                                    </button>
                                </div>
                            </Modal.Body>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FormStep4