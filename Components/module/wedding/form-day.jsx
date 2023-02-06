import dynamic from "next/dynamic";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { directLogin, rootApi } from "../../../Context/config-app";
import Maps from "../../maps";
import timeZone from "../../Utils/timezone";

const Select = dynamic(() => import('react-select'), { ssr: false })

const FormDay = ({ setaddEvents, addEvents, setLoadInvitation, countPost, setCountPost, dataEvent,eventDays,parentId }) => {
    const [show, setShow] = useState(addEvents)

    const status = (dataEvent.status === 1) ? true : false

    const [mainEvent, setMainEvent] = useState((dataEvent.name) ? ((dataEvent.type === 1) ? true : false) : false);
    const [statusEvent, setStatusEvent] = useState((dataEvent.name) ? status : true);
    const [eventName, setEventName] = useState((dataEvent.name) ? dataEvent.name : '');
    const [startTime, setStartTime] = useState((dataEvent.time_start) ? dataEvent.time_start : '');
    const [endTime, setEndTime] = useState((dataEvent.time_end) ? dataEvent.time_end : '');
    const [timeZoneSelected, setTimeZoneSelected] = useState((dataEvent.time_zone) ? dataEvent.time_zone : '');
    const [description, setDescription] = useState((dataEvent.description) ? dataEvent.description : '');
    const [showMap, setShowMap] = useState((dataEvent.show_map) ? ((dataEvent.show_map === 1) ? true : false) : false);

    const [defaultSelect, setDefaultSelect] = useState((dataEvent.name) ? timeZone.filter(obj => obj.value === dataEvent.time_zone)[0] : '')

    const [location, setLocation] = useState((dataEvent.building_name) ? dataEvent.building_name : '');
    const [city, setCity] = useState((dataEvent.city) ? dataEvent.city : '');
    const [alamat, setAlamat] = useState((dataEvent.address) ? dataEvent.address : '');
    const [mapPoint, setMapPoint] = useState((dataEvent.map) ? ((dataEvent.map === null) ? {} : JSON.parse(dataEvent.map)) : '');

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setaddEvents(false)

            const elements = document.querySelectorAll('div[style="position: absolute; left: 0px; top: -2px; height: 1px; overflow: hidden; visibility: hidden; width: 1px;"]');
            for (let i = 0; i < elements.length; i++) {
                elements[i].remove();
            }

            const poc = document.querySelectorAll('.pac-container.pac-logo')
            for (let p = 0; p < poc.length; p++) {
                poc[p].remove();
            }
        }, 250);
    }

    const handleClickMaps = (event) => {
        let lat,lng

        lat = event.latLng.lat()
        lng = event.latLng.lng()

        setMapPoint({lat:lat,lng:lng})
    }

    const handleMap = (place) => {
        const addressComponents = place.address_components
        let city,lat,lng

        for (let i = 0; i < addressComponents.length; i++){
            if (addressComponents[i].types.includes("administrative_area_level_2")) {
                city = addressComponents[i].long_name;
            }
        }

        lat = place.geometry.location.lat()
        lng = place.geometry.location.lng()

        setMapPoint({lat:lat,lng:lng})
        setLocation(place.name)
        setAlamat(place.formatted_address)
        setCity(city)
    }

    const form = [
        [eventName, val => val !== '', 'Nama acara tidak boleh kosong'],
        [startTime, val => val !== '', 'Silahkan Pilih waktu acara'],
        [endTime, val => val !== '', 'Silahkan Pilih waktu acara'],
        [timeZoneSelected, val => val !== '', 'Silahkan Pilih zona waktu untuk acara anda'],
    ]

    const handleSubmit = () => {
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
            const trx = {
                id:(dataEvent.id) ? (dataEvent.id) : '#',
                parent:parentId,
                description:description,
                address:alamat,
                city: location,
                name: eventName,
                location: location,
                map: mapPoint,
                showMap: showMap,
                time_zone: timeZoneSelected,
                time_start: startTime,
                time_end: endTime,
                type: mainEvent,
                status: statusEvent,
                invitation:Cookies.get('relix-prefix')
            }
            axios({
                method: 'POST',
                url: `${rootApi}/api/events/create`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
                },
                data: trx
            }).then(response => {
                const result = response.data
                setCountPost(countPost+1)
                if (result.status.indexOf('*OK*') != '-1') {
                    setLoadInvitation(countPost)
                    // refreshToken()
                    handleClose()
                }
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    directLogin(err.response.status)
                }
            })
        }
    }

    return (
        <>
            <Modal
                animation={false}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{(dataEvent.id) ? 'Edit Acara' : 'Tambah Acara'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 mt-4">
                            <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success" style={{ display: 'flex', alignItems: 'center' }}>
                                <input className="form-check-input" type="checkbox" role="switch" id="switchIs_primary" disabled={(dataEvent.type === 1) ? true : false } checked={mainEvent} onChange={(e) => setMainEvent(!mainEvent)} />
                                <label className="form-check-label" htmlFor="switchIs_primary" style={{ display: 'flex', flexDirection: 'column' }}>
                                    Acara Utama
                                    <small style={{ fontSize: 10.5, marginTop: -10 }}>
                                        Yang ditampilkan untuk countdown dan e-invitation
                                    </small>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 mt-4">
                            <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success" style={{ display: 'flex', alignItems: 'center' }}>
                                <input className="form-check-input" type="checkbox" role="switch" id="switchIs_visible" checked={statusEvent} onChange={(e) => setStatusEvent(!statusEvent)} />
                                <label className="form-check-label" htmlFor="switchIs_visible" style={{ display: 'flex', flexDirection: 'column' }}>
                                    Tampilkan
                                    <small style={{ fontSize: 10.5, marginTop: -10 }}>
                                        Menampilkan acara ini untuk umum
                                    </small>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 mt-4">
                            <label>
                                Nama Acara <span className="text-danger">*</span>
                            </label>
                            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="form-control" />
                            <span className="text-muted" style={{ fontSize: 10 }}>
                                Contoh: Akad Nikah, Pemberkatan, Resepsi, Unduh Mantu
                            </span>
                        </div>
                        <div className="col-md-6 mt-4">
                            <label>
                                Waktu <span className="text-danger">*</span>
                            </label>
                            <div className="row">
                                <div className="col-5">
                                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-2">
                                    <div className="d-flex w-100 h-100 align-items-center">
                                        <hr style={{ width: '100%', height: 3 }} />
                                    </div>
                                </div>
                                <div className="col-5">
                                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-4">
                            <label>
                                Zona Waktu <span className="text-danger">*</span>
                            </label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isLoading={false}
                                isClearable={false}
                                defaultValue={defaultSelect}
                                isRtl={false}
                                isSearchable={true}
                                name="fonts"
                                onChange={(e) => { setTimeZoneSelected(e.value) }}
                                options={timeZone}
                                isOptionDisabled={(option) => option.isdisabled}
                            />
                        </div>
                        <div className="col-md-12 mt-4">
                            <label>
                                Deskripsi
                            </label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" rows={3} />
                        </div>
                    </div>
                    {
                        (eventDays) ? '' :
                            <>
                                <hr className="mt-4 mb-4" />
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input onChange={(e) => setShowMap(!showMap)} className="form-check-input" type="checkbox" role="switch" id="switchIs_map_shown" />
                                            <label className="form-check-label" htmlFor="switchIs_map_shown" style={{ display: 'flex', flexDirection: 'column' }}>
                                                Tampilkan Peta
                                                <small style={{ fontSize: 9.5, marginTop: -10 }}>
                                                    Berupa link untuk menuju ke titik lokasi
                                                </small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <Maps getPlaces={handleMap} onClick={handleClickMaps} defaultCenter={mapPoint} />
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <label>
                                            Nama Gedung/Lokasi
                                        </label>
                                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-6 mt-4">
                                        <label>
                                            Kota
                                        </label>
                                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <label>
                                            Alamat
                                        </label>
                                        <textarea rows={3} value={alamat} onChange={(e) => setAlamat(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                            </>
                    }
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'flex-start' }}>
                    <button className="btn btn-outline-info mr-3" onClick={(e) => handleSubmit()}>
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

export default FormDay