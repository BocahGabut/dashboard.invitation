import axios from "axios";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { directLogin, rootApi } from "../../../Context/config-app";
import { convertDateToString } from "../../../Services/utils";

import Cookies from "js-cookie";

import FormDay from "./form-day";
import FormEventDay from "./form-event-day";

import { toast } from 'react-toastify';

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const FormStep3 = ({ propsData, setLoadInvitation, countPost, setCountPost }) => {
    const [addEvents, setaddEvents] = useState(false)
    const [addDays, setaddDays] = useState(false)
    const [dataEvent, setDataEvent] = useState({})

    const [dataDays, setDataDays] = useState({})
    const [eventDays, setEventDays] = useState(true)
    const [selectParent, setSelectParent] = useState('');

    const handleSwitchDay = (id) => {
        axios({
            method: 'POST',
            url: `${rootApi}/api/events/switch`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
            data: {
                _eid: id
            }
        }).then(response => {
            const result = response.data
            setCountPost(countPost + 1)
            if (result.status.indexOf('*OK*') != '-1') {
                setLoadInvitation(countPost)
            }
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 401) {
                directLogin(err.response.status)
            }
        })
    }

    const handleEditEvent = (data) => {
        setaddEvents(true)
        setDataEvent(data)
    }

    const handleNewEvent = () => {
        setaddEvents(true)
        setDataEvent({})
    }

    const handleNewDays = (sameDay, idParent) => {
        setaddDays(true)
        setSelectParent(idParent)
        setEventDays((sameDay === 0) ? false : true)
        setDataDays({})
    }

    const handleEditDays = (sameDay, idParent, data) => {
        setaddDays(true)
        setSelectParent(idParent)
        setEventDays((sameDay === 0) ? false : true)
        setDataDays(data)
    }

    const deleteDays = (id) => {
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'POST',
                    url: `${rootApi}/api/events/delete-days`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
                    },
                    data: {
                        _eid: id,
                        invitation: Cookies.get('relix-prefix')
                    }
                }).then(response => {
                    const result = response.data
                    setCountPost(countPost + 1)
                    if (result.status.indexOf('*OK*') != '-1') {
                        setLoadInvitation(countPost)
                    }
                }).catch((err) => {
                    console.log(err)
                    if (err.response.status === 401) {
                        directLogin(err.response.status)
                    }
                })
            }
        })
    }

    const deleteEvents = (id) => {
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'POST',
                    url: `${rootApi}/api/events/delete-events`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
                    },
                    data: {
                        _eid: id,
                        invitation: Cookies.get('relix-prefix')
                    }
                }).then(response => {
                    const result = response.data
                    if (result.status.indexOf('*OK*') != '-1') {
                        setCountPost(countPost + 1)
                        setLoadInvitation(countPost)
                    } else if (result.status.indexOf('*FLD*') != '-1') {
                        return toast.error('Tidak dapat dihapus, minimal ada 1 acara.', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    } else if (result.status.indexOf('*MENT*') != '-1') {
                        return toast.error('Acara utama tidak boleh dihapus.', {
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
                    console.log(err)
                    if (err.response.status === 401) {
                        directLogin(err.response.status)
                    }
                })
            }
        })
    }

    return (
        <>
            <div>
                <div className="row mt-6">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h2>Tentukan Rangkaian Acara</h2>
                            <span>
                                Informasi ini akan sangat membantu tamu. Jika masih belum pasti nanti masih bisa diubah kok.
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12 mt-6">
                        {
                            propsData.map((events, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <div className="row no-gutters">
                                                <div className="col d-flex flex-column justify-content-center">
                                                    <h5 style={{ fontSize: 14 }} className="">{convertDateToString(events.date)}</h5>
                                                    <p style={{ fontSize: 12, margin: 0 }} className="text-muted">
                                                        {events.description}
                                                    </p>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="py-4">
                                                        <button className="btn btn-outline-info btn-sm mr-3" onClick={() => handleEditEvent(events)}>
                                                            <IconsI icons='fa-regular fa-edit' />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteEvents(events.id)}>
                                                            <IconsI icons='fa-regular fa-trash' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-light text-reset" style={{ padding: '1.25rem' }}>
                                                <div className="row">
                                                    {
                                                        events.details.map((details, index_details) => {
                                                            return (
                                                                <div className="col-xl-6 mb-4" key={index_details}>
                                                                    <div className={`card h-100 ${(details.type === 1) ? 'border-success' : ''}`} style={{ borderWidth: `${(details.type === 1) ? '1px' : ''}` }}>
                                                                        <div className="card-body">
                                                                            <div className="row no-gutters">
                                                                                <div className="col">
                                                                                    <h5 className={`d-flex align-items-center ${(details.type === 1) ? 'mt-3' : ''}`}>
                                                                                        {details.name}
                                                                                        {
                                                                                            (details.status === 1) ?
                                                                                                <span className="badge rounded-pill badge-outline-success ml-2" style={{ fontSize: 10 }}>
                                                                                                    <IconsI icons='fa fa-fw fa-eye' /> Ditampilkan
                                                                                                </span>
                                                                                                :
                                                                                                <span className="badge rounded-pill badge-outline-dark ml-2" style={{ fontSize: 10 }}>
                                                                                                    <IconsI icons='fa fa-fw fa-eye-slash' /> Tidak Ditampilkan
                                                                                                </span>
                                                                                        }
                                                                                    </h5>
                                                                                    <p className="text-muted">
                                                                                        {details.description}
                                                                                    </p>
                                                                                    {
                                                                                        (details.type === 1)
                                                                                            ?
                                                                                            <span className="badge badge-soft-success position-absolute" style={{ top: "-1rem", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                                                                                                <IconsI icons='fa fa-fw fa-star' />
                                                                                                Acara Utama
                                                                                            </span>
                                                                                            : ''
                                                                                    }
                                                                                </div>
                                                                                <div className="col-auto">
                                                                                    <div className="">
                                                                                        <button className={`btn btn-outline-info btn-sm ${(details.type === 1) ? '' : 'mr-3'}`} onClick={() => handleEditDays(events.same_address, events.id, details)}>
                                                                                            <IconsI icons='fa-regular fa-edit' />
                                                                                        </button>
                                                                                        {
                                                                                            (details.type === 1) ? '' :
                                                                                                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteDays(details.id)}>
                                                                                                    <IconsI icons='fa-regular fa-trash' />
                                                                                                </button>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row no-gutters mt-3">
                                                                                <div className="col-1">
                                                                                    <IconsI icons='far fa-clock fa-fw' />
                                                                                </div>
                                                                                <div className="col">{details.time_start} - {details.time_end}</div>
                                                                            </div>
                                                                            <div className="row no-gutters">
                                                                                {
                                                                                    (events.same_address === 0)
                                                                                        ?
                                                                                        (details.address !== null || details.building_name !== null || details.city !== null) ?
                                                                                            <div className="col-md-12 mt-4 d-flex">
                                                                                                <IconsI icons='fa-regular fa-map-pin mr-3' />
                                                                                                <p className="m-0" style={{ fontSize: 11 }}>
                                                                                                    <strong>
                                                                                                        {details.building_name}
                                                                                                    </strong>
                                                                                                    <br />
                                                                                                    <span className="text-muted">
                                                                                                        {details.address}
                                                                                                    </span>
                                                                                                    <br />
                                                                                                    <span className="text-muted">
                                                                                                        {details.city}
                                                                                                    </span>
                                                                                                </p>
                                                                                            </div>
                                                                                            :
                                                                                            <div className="col-md-12 mt-4 d-flex">
                                                                                                <IconsI icons='fa-regular fa-map-pin mr-3' />
                                                                                                <p className="text-info m-0" style={{ cursor: 'pointer' }} onClick={() => handleEditDays(events.same_address, events.id, details)}>
                                                                                                    <em>Lokasi belum ditentukan</em>
                                                                                                </p>
                                                                                            </div>
                                                                                        : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div className="col-md-12 mt-4">
                                                        <button className="btn btn-outline-info" onClick={() => handleNewDays(events.same_address, events.id)}>
                                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                                            Tambah Acara
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row p-3">
                                                <div className="col-md-12">
                                                    <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="switchIs_inherit_location_1" defaultChecked={(events.same_address === 1) ? true : false} onChange={() => handleSwitchDay(events.id)} />
                                                        <label className="form-check-label" htmlFor="switchIs_inherit_location_1" style={{ display: 'flex', flexDirection: 'column' }}>
                                                            Lokasi sama dalam satu hari
                                                            <small style={{ fontSize: 9.5, marginTop: -10 }}>
                                                                Jika lokasi berbeda, maka perlu memasukkan detil lokasi di tiap rangkaian acara
                                                            </small>
                                                        </label>
                                                    </div>
                                                </div>
                                                {
                                                    (events.same_address === 1)
                                                        ?
                                                        (events.address !== null || events.building_name !== null || events.city !== null) ?
                                                            <div className="col-md-12 mt-4 d-flex">
                                                                <IconsI icons='fa-regular fa-map-pin mr-3' />
                                                                <p className="m-0" style={{ fontSize: 11 }}>
                                                                    <strong>
                                                                        {events.building_name}
                                                                    </strong>
                                                                    <br />
                                                                    <span className="text-muted">
                                                                        {events.address}
                                                                    </span>
                                                                    <br />
                                                                    <span className="text-muted">
                                                                        {events.city}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            :
                                                            <div className="col-md-12 mt-4 d-flex">
                                                                <IconsI icons='fa-regular fa-map-pin mr-3' />
                                                                <p className="text-info m-0" style={{ cursor: 'pointer' }} onClick={() => handleEditEvent(events)}>
                                                                    <em>Lokasi belum ditentukan</em>
                                                                </p>
                                                            </div>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button className="btn btn-outline-info mt-5" type="button" onClick={(e) => handleNewEvent()}>
                            <IconsI icons='fa-regular fa-plus mr-3' />
                            Tambah Hari
                        </button>
                    </div>
                </div>
            </div>
            {
                (addEvents) ? <FormEventDay dataEvent={dataEvent} setaddEvents={setaddEvents} addEvents={addEvents} setLoadInvitation={setLoadInvitation} countPost={countPost} setCountPost={setCountPost} /> : ''
            }
            {
                (addDays) ? <FormDay dataEvent={dataDays} setaddEvents={setaddDays} parentId={selectParent} addEvents={addDays} eventDays={eventDays} setLoadInvitation={setLoadInvitation} countPost={countPost} setCountPost={setCountPost} /> : ''
            }
        </>
    )
}

export default FormStep3