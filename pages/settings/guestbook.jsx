import dynamic from "next/dynamic";
import React from "react";
import Layout from "../../Components/Layout";

import Link from "next/link";
import FormImage from '../../Components/form-image';
import PremiumFeature from "../../Components/Utils/premium-feature";

const IconsI = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })

const GuestBook = () => {
    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card no-shadow border-border">
                            <div className="card-body py-4 px-6">
                                <div className="row">
                                    <div className="col-md-12 mb-5">
                                        <h5 style={{ fontSize: 17.3, fontWeight: 600, margin: 0, color: '#000' }}>
                                            Check-in
                                        </h5>
                                    </div>
                                    <div className="col-md-12 mt-5">
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div>
                                                            <label>
                                                                Tampilkan Data di App Penerima Tamu
                                                            </label>
                                                            <br />
                                                            <small className="text-muted">Atur form yang ditampilkan ketika melakukan check-in</small>
                                                            <div className="alert mt-4" style={{ border: '1px dashed rgb(204, 204, 204)' }}>
                                                                <small className="text-muted">Tambahkan form dengan memilih isian di bawah.</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-2" style={{ gap: 20, display: 'flex', flexWrap: 'wrap' }}>
                                                        <button className="btn btn-light btn-sm">
                                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                                            No. Handphone
                                                        </button>
                                                        <button className="btn btn-light btn-sm">
                                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                                            Email
                                                        </button>
                                                        <button className="btn btn-light btn-sm">
                                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                                            Meja
                                                        </button>
                                                        <button className="btn btn-light btn-sm">
                                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                                            Jumlah Orang
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md">
                                                <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="switchGuestbook_can_only_checkin_once" />
                                                    <label htmlFor="switchGuestbook_can_only_checkin_once">Batasi tamu check-in/check-out hanya 1 kali</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-15" />
                                <div className="row mt-4">
                                    <div className="col-md-12 mb-5">
                                        <h5 style={{ fontSize: 17.3, fontWeight: 600, margin: 0, color: '#000' }}>
                                            Layar Sapa
                                        </h5>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md">
                                                <div>
                                                    <label>Gambar Latar Belakang</label>
                                                    <FormImage taget_id="00fgg-012fh" width={350} height={225} />
                                                    <small className="text-muted">Ukuran: 1400 x 900 px</small>
                                                </div>
                                            </div>
                                            <div className="col-md position-relative">
                                                <PremiumFeature />
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchIs_greeting_screen_video" />
                                                            <label htmlFor="switchIs_greeting_screen_video">Gunakan Video sebagai Latar</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div>
                                                            <label>
                                                                Video Latar
                                                            </label>
                                                            <input type="file" name="" className="form-control" />
                                                            <small className="text-muted">Maks: 25 MB. Format: mp4</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-4">
                                                        <div>
                                                            <label>
                                                                Sapaan
                                                            </label>
                                                            <input type="text" name="" className="form-control" placeholder="Welcome" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-4">
                                                        <div>
                                                            <label>
                                                                Tampilan Data Tamu
                                                            </label>
                                                            <div className="d-flex" style={{ flexDirection:'column' }}>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" id="data-tamu-1" />
                                                                    <label className="form-check-label" htmlFor="data-tamu-1">
                                                                        Name
                                                                    </label>
                                                                </div>
                                                                <div className="form-check mt-2">
                                                                    <input className="form-check-input" type="checkbox" id="data-tamu-2" />
                                                                    <label className="form-check-label" htmlFor="data-tamu-2">
                                                                        Invitation Code
                                                                    </label>
                                                                </div>
                                                                <div className="form-check mt-2">
                                                                    <input className="form-check-input" type="checkbox" id="data-tamu-3" />
                                                                    <label className="form-check-label" htmlFor="data-tamu-3">
                                                                        Group
                                                                    </label>
                                                                </div>
                                                                <div className="form-check mt-2">
                                                                    <input className="form-check-input" type="checkbox" id="data-tamu-4" />
                                                                    <label className="form-check-label" htmlFor="data-tamu-4">
                                                                        Meja
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-10 mb-6">
                                        <Link href='/settings' className="btn btn-light mr-3">
                                            Kembali
                                        </Link>
                                        <button className="btn btn-outline-info">
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default GuestBook