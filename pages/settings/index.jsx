import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { protocol, rootApi } from "../../Context/config-app";

const IconsI = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })

const Settings = () => {
    const [dataInvitation, setDataInvitation] = useState({})

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${rootApi}/api/invitation/${Cookies.get('relix-prefix')}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('auth-prefix')}`,
            },
        }).then(response => {
            const result = response.data
            console.log(result.data)
            setDataInvitation(result.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                directLogin(err.response.status)
            }
        })
    }, []);
    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-lg">
                        <div className="card no-shadow border-border" style={{ height: '90%' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1 style={{ fontWeight: 600 }}>{ dataInvitation.judul }</h1>
                                    </div>
                                    <div className="col-md-12">
                                        <p>
                                            {
                                                (dataInvitation.description === null) ?
                                                    <em>Tambahkan deskripsi...</em>
                                                    :
                                                    dataInvitation.description
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <Link href={`${protocol}/${dataInvitation.url}.buywedding.site`} className="btn btn-light mr-4">
                                            <Image src='/images/logo-icon.svg' className="mr-2" width={16} height={16} alt="logo icons" />
                                            { dataInvitation.url }.invedo.id
                                        </Link>
                                        <Link href="/settings/general" className="text-info">
                                            <IconsI icons='fa-regular fa-pen mr-4' />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg">
                        <div className="card no-shadow border-border">
                            <div className="card-body">
                                <ul className="list-group">
                                    <Link href='/' className="list-group-item d-flex align-items-center justify-content-between">
                                        <div>
                                            <IconsI icons='fa-solid fa-cubes mr-3' />
                                            Paket & Tambahan
                                        </div>
                                        <span className="badge rounded-pill badge-soft-dark">
                                            {
                                                (dataInvitation.packages) ? dataInvitation.packages.name : ''
                                            } Package
                                        </span>
                                    </Link>
                                    <Link href='/' className="list-group-item">
                                        <IconsI icons='fa-solid fa-cubes mr-3' />
                                        Tagihan
                                    </Link>
                                    <Link href='/' className="list-group-item">
                                        <IconsI icons='fa-solid fa-cubes mr-3' />
                                        Pengguna
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-1">
                        <div className="card no-shadow border-border">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/website'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wloilxuq.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">Ubah Tampilan</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/events'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/kbtmbyzy.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">Rangkaian Acara</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/couple'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/rjzlnunf.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">Calon Pengantin</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/invitation'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/qhgmphtg.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">E-Invitation</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/qrcode'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/fqrjldna.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">QR Code</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/custom-fields'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jvucoldz.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">Data Tambahan</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/rsvp-comments'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/soseozvi.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">RSVP & Komentar</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='/settings/guestbook'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/bgwzirmj.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">Penerima Tamu</h6>
                                        </Link>
                                    </div>
                                    <div className="col-6 col-md-3 col-xl-2 mb-3 border-border text-center mt-3">
                                        <Link href='#' data-bs-toggle="modal" data-bs-target="#modal_add">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/cnbtojmk.json"
                                                trigger="hover"
                                                style={{ width: 100, height: 100 }}>
                                            </lord-icon>
                                            <h6 className="text-info">Notifikasi</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal_add" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myModalLabel">Notification</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>
                                            Notifikasi Email
                                        </label>
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchNotifications[email_guest_group]" />
                                            <label htmlFor="switchNotifications[email_guest_group]">Tamu baru terdaftar di grup melalui formulir</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchNotifications[email_guest_comment]" />
                                            <label htmlFor="switchNotifications[email_guest_comment]">Tamu memberikan komentar</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchNotifications[email_donation]" />
                                            <label htmlFor="switchNotifications[email_donation]">Tamu mengirimkan donasi</label>
                                        </div>
                                    </div>
                                    <hr className="mt-7" />
                                    <div className="col-md-12 mt-3">
                                        <label>
                                            Notifikasi Push (Mobile App)
                                        </label>
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchNotifications[mobile_guest_group]" />
                                            <label htmlFor="switchNotifications[mobile_guest_group]">Tamu baru terdaftar di grup melalui formulir</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchNotifications[mobile_guest_comment]" />
                                            <label htmlFor="switchNotifications[mobile_guest_comment]">Tamu memberikan komentar</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchNotifications[mobile_donation]" />
                                            <label htmlFor="switchNotifications[mobile_donation]">Tamu mengirimkan donasi</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Simpan</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Settings