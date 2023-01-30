import React, { useState } from "react";

import Modal from 'react-bootstrap/Modal';
import InputDateRange from "../../Utils/inputDateRange";

import Maps from "../../maps";

const FormEventDay = ({ setaddEvents, propsData }) => {
    const [show, setShow] = useState(true);
    const [dates, setDates] = useState()
    const [sameDay, setSameDay] = useState(false)

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setaddEvents(false)
        },200)
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Acara</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <label>
                                Tanggal <span className="text-danger">*</span>
                            </label>
                            <InputDateRange defaultValue={(propsData) ? propsData.tanggal : ''} dates={(e) => setDates(e)} onFocus={(e) => { }} />
                        </div>
                        <div className="col-md-12 mt-4">
                            <label>
                                Deskripsi
                            </label>
                            <textarea className="form-control" rows={3} />
                        </div>
                    </div>
                    <hr className="mt-8 mb-4" />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                <input className="form-check-input" type="checkbox" role="switch" id="switchIs_inherit_location_1" checked={sameDay} onChange={(e) => setSameDay(!sameDay)} />
                                <label className="form-check-label" htmlFor="switchIs_inherit_location_1" style={{ display: 'flex', flexDirection: 'column' }}>
                                    Lokasi sama dalam satu hari
                                    <small style={{ fontSize: 9.5, marginTop: -10 }}>
                                        Jika lokasi berbeda, maka perlu memasukkan detil lokasi di tiap rangkaian acara
                                    </small>
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4 mb-4" />
                    {
                        (!sameDay) ? '' :
                            <>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchIs_map_shown" />
                                            <label className="form-check-label" htmlFor="switchIs_map_shown" style={{ display: 'flex', flexDirection: 'column' }}>
                                                Tampilkan Peta
                                                <small style={{ fontSize: 9.5, marginTop: -10 }}>
                                                    Berupa link untuk menuju ke titik lokasi
                                                </small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <Maps />
                                    </div>
                                </div>
                            </>
                    }
                </Modal.Body>
                <Modal.Footer style={{ justifyContent:'flex-start' }}>
                    <button className="btn btn-outline-info mr-3">
                        Simpan
                    </button>
                    <button className="btn btn-light" onClick={(e) => handleClose()}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default FormEventDay