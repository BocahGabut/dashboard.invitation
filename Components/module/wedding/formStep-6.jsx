import axios from "axios";
import React, { useEffect, useState } from "react";
import { directLogin, rootApi } from "../../../Context/config-app";

import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Image from "next/image";
import Modal from 'react-bootstrap/Modal';

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const FormStep6 = ({ propsData,selectPackage,setSelectPackage }) => {
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false)

    const [packages, setPackages] = useState([])
    const [packagePreview, setPackagePreview] = useState({})

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${rootApi}/api/packages`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
        }).then(response => {
            const result = response.data
            setPackages(result.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                directLogin(err.response.status)
            }
        })
    }, []);

    return (
        <>
            <form id="0b2c308432d8ff94f2510e81f47f06f3">
                <div>
                    <div className="row mt-6">
                        <div className="col-md-12 mb-8">
                            <div className="text-center">
                                <h2>Pilih Paket</h2>
                                <span>
                                    Kami menawarkan paket dengan harga spesial. Kamu dapat mengubahnya atau membeli tambahan kapan pun sesuai kebutuhan.
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12 mt-4 mb-4">
                            <div className="row">
                                {
                                    packages.map((packag, index) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-6 col-xl-4 mb-4" key={index} style={{ cursor: 'pointer' }} onClick={() => setSelectPackage(packag.id)}>
                                                <div className={`card ${(selectPackage === packag.id) ? 'border-success' : 'border-0'} no-shadow theme-item`} style={{ borderWidth: (selectPackage === packag.id) ? 1 : 0 }}>
                                                    <div className="card-body">
                                                        <div className="position-relative" style={{ height: 80 }}>
                                                            {
                                                                (packag.icons === 'demo') ?
                                                                    <Image src='/images/package-1.png' width={80} height={80} alt="desktop preview" />
                                                                    : ''
                                                            }
                                                        </div>
                                                        <div className="mt-4 pl-3">
                                                            <h5 className="m-0"><strong>{packag.name}</strong> Package</h5>
                                                            {
                                                                (packag.price === '0')
                                                                    ?
                                                                    <div className="text-info" style={{ fontWeight: 600 }}>
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
                                                            <div className="row">
                                                                {
                                                                    packag.details.filter(obj => obj.status === 1).map((det, indexDet) => {
                                                                        return (
                                                                            <div className="col-md-12 mt-3" key={indexDet}>
                                                                                <IconsI icons={det.icons} />
                                                                                <span className="ml-3">
                                                                                    {det.name}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div className="col-md-12 mt-4">
                                                                    <button className="btn btn-light" type="button" onClick={() => { setPackagePreview(packag), setOpenModal(true) }}>
                                                                        Detail Paket
                                                                    </button>
                                                                </div>
                                                            </div>
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
                size="md"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="position-relative" style={{ height: 190 }}>
                                {
                                    (packagePreview.icons === 'demo') ?
                                        <Image src='/images/package-1.png' width={180} height={180} alt="desktop preview" />
                                        : ''
                                }
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <h5 className="m-0" style={{ fontSize: 20 }}><strong>{packagePreview.name}</strong> Package</h5>
                            <p className="text-muted">{packagePreview.description}</p>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row">
                                {
                                    (packagePreview.details) ? packagePreview.details.map((det, indexDet) => {
                                        return (
                                            <div className="col-md-12 mt-3" key={indexDet}>
                                                <IconsI icons={det.icons} />
                                                <span className="ml-3">
                                                    {det.name}
                                                </span>
                                            </div>
                                        )
                                    }) : ''
                                }
                            </div>
                        </div>
                        <div className="col-md-12 mt-8">
                            {
                                (packagePreview.price === '0')
                                    ?
                                    <div className="text-info" style={{ fontWeight: 600, fontSize: 18 }}>
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
                        <div className="col-md-12 mt-3">
                            <button type="button" className="btn btn-soft-secondary form-control" onClick={() => {setSelectPackage(packagePreview.id),handleClose()}}>
                                Pilih
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FormStep6