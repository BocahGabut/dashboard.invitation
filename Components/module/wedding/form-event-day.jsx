import React, { useRef, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import InputDateRange from "../../Utils/inputDateRange";

import Cookies from "js-cookie";
import { rootApi } from "../../../Context/config-app";

// const Maps = dynamic(() => import('../../maps'), { ssr: false })
import axios from "axios";
import Maps from "../../maps";

const FormEventDay = ({ setaddEvents, addEvents, setLoadInvitation, countPost, setCountPost, dataEvent }) => {
    const [show, setShow] = useState(addEvents);
    const [dates, setDates] = useState()
    const [sameDay, setSameDay] = useState((dataEvent.same_address) ? ((dataEvent.same_address === 1) ? true : false) : false)

    const [location, setLocation] = useState((dataEvent.building_name) ? (dataEvent.building_name) : '');
    const [city, setCity] = useState((dataEvent.city) ? (dataEvent.city) : '');
    const [alamat, setAlamat] = useState((dataEvent.address) ? (dataEvent.address) : '');
    const [mapPoint, setMapPoint] = useState((dataEvent.map) ? (dataEvent.map) : '');

    const [showMap, setShowMap] = useState((dataEvent.show_map) ? ((dataEvent.show_map === 1) ? true : false) : false);

    //form
    const description = useRef('')
    const addressInput = useRef('')
    const cityInput = useRef('')
    const locationInput = useRef('')

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

    const handleSubmit = () => {
        const trx = {
            id:(dataEvent.id) ? (dataEvent.id) : '#',
            date: dates,
            description:description.current.value,
            address:addressInput.current.value,
            city: cityInput.current.value,
            location: locationInput.current.value,
            map: mapPoint,
            showMap: showMap,
            sameDay: sameDay,
            invitation:Cookies.get('relix-prefix')
        }
        axios({
            method: 'POST',
            url: `${rootApi}/api/events/days`,
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
                    <Modal.Title>{ (dataEvent.id) ? 'Edit Acara' : 'Tambah Acara' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <label>
                                Tanggal <span className="text-danger">*</span>
                            </label>
                            <InputDateRange defaultValue={(dataEvent.date) ? dataEvent.date : ''} dates={(e) => setDates(e)} onFocus={(e) => { }} />
                        </div>
                        <div className="col-md-12 mt-4">
                            <label>
                                Deskripsi
                            </label>
                            <textarea ref={description} defaultValue={dataEvent.description} className="form-control" rows={3} />
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
                    <div className="row" style={{ display:`${(!sameDay) ? 'none' : 'flex'}` }}>
                        <div className="col-md-12">
                            <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                <input onChange={(e) => setShowMap(!showMap)} className="form-check-input" type="checkbox" checked={showMap} role="switch" id="switchIs_map_shown" />
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
                            <input type="text" ref={locationInput} value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-6 mt-4">
                            <label>
                                Kota
                            </label>
                            <input type="text" ref={cityInput} value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-md-12 mt-4">
                            <label>
                                Alamat
                            </label>
                            <textarea rows={3} ref={addressInput} value={alamat} onChange={(e) => setAlamat(e.target.value)} className="form-control" />
                        </div>
                    </div>
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

export default FormEventDay