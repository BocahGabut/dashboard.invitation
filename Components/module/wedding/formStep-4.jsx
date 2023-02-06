import React, { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import Modal from 'react-bootstrap/Modal';

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const FormStep4 = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

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
                                <div className="col-6 col-sm-6 col-md-4 col-xl-3 mb-4" style={{ cursor: 'pointer' }} onClick={() => setOpenModal(true)}>
                                    {/* <div className="card border-0 no-shadow theme-item"> */}
                                    <div className="card border-success no-shadow theme-item" style={{ borderWidth: 1 }}>
                                        <div className="card-body">
                                            <div className="position-relative">
                                                <div className="theme-item-preview-desktop position-absolute shadow">
                                                    <Image src='/images/theme/thumb_1654864_200_200_0_646_crop.jpg' width={250} height={250} alt="desktop preview" />
                                                </div>
                                                <div className="theme-item-preview-mobile position-absolute shadow">
                                                    <Image src='/images/theme/thumb_1654863_200_600_0_2446_crop.jpg' width={250} height={250} alt="desktop preview" />
                                                </div>
                                                <span className="badge badge-soft-success position-absolute" style={{ top: "-1rem", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                                                    <IconsI icons='fa fa-fw fa-check' />
                                                    Tema Aktif
                                                </span>
                                            </div>
                                            <div className="mt-4 pl-3">
                                                <h5 className="m-0">Axana Florist</h5>
                                                {/* <div className="text-danger d-md-flex md-flex-column">
                                                    <del className="text-muted mr-3">
                                                        <small>Rp 100.000</small>
                                                    </del>
                                                    Rp 50.000
                                                </div> */}
                                                <div className="text-info">
                                                    Gratis
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                {/* <Modal.Header closeButton>
                    <Modal.Title>Minimal Brush Blue</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 bg-light h-100 position-relative p-3 p-lg-4 d-flex justify-content-center scrollbar" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                            <Image style={{ width: '100%', height: '100%' }} src='/images/theme/61fe64cdbb454583928053.png' width={850} height={850} alt="full preview" />
                        </div>
                        <div className="col-md-6">
                            <Modal.Header closeButton >
                                <Modal.Title>Minimal Brush Blue</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Image style={{ width: 32, height: 32 }} src='/images/logo-placeholder.jpg' className="mr-3" width={150} height={150} alt="full preview" />
                                        by <strong>Invedo Team</strong>
                                    </div>
                                    <hr className="mt-4 mb-4" />
                                    {/* <div className="text-muted">
                                        <del className="text-muted mr-3">
                                            <small>Rp 100.000</small>
                                        </del>
                                    </div>
                                    <div className="h5 mb-2 text-primary" style={{ fontWeight:700 }}>
                                        Rp 50.000
                                    </div> */}
                                    <div className="h5 text-success">
                                        Gratis
                                    </div>
                                    <button className="btn btn-outline-success btn-block" disabled>
                                        <IconsI icons='fa fa-fw fa-check' /> Tema Aktif
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