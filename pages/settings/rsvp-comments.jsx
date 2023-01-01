import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import Layout from "../../Components/Layout";
import PremiumFeature from "../../Components/Utils/premium-feature";

const IconsI = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })

const RsvpComments = () => {
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
                                            RSVP
                                        </h5>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input checked className="form-check-input" type="checkbox" role="switch" id="switchRsvp_show_invitation_code_form" />
                                            <label htmlFor="switchRsvp_show_invitation_code_form">Tampilkan form invitation pada halaman depan (6 digit kode)</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchRsvp_show_invitation_only_confirmed_rsvp" />
                                            <label htmlFor="switchRsvp_show_invitation_only_confirmed_rsvp">Tampilkan e-invitation hanya untuk yang telah konfirmasi hadir</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div>
                                                            <label>
                                                                Pesan RSVP Hadir
                                                            </label>
                                                            <textarea rows="3" className="form-control" />
                                                            <small className="text-muted">Pesan yang tertampil jika tamu memilih untuk hadir</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div>
                                                            <label>
                                                                Isian Form Hadir
                                                            </label>
                                                            <br />
                                                            <small className="text-muted">Atur form yang ditampilkan jika tamu memilih untuk hadir</small>
                                                            <div className="alert mt-4" style={{ border: '1px dashed rgb(204, 204, 204)' }}>
                                                                <small className="text-muted">Tambahkan form dengan memilih isian di bawah.</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-3" style={{ gap: 20, display: 'flex', flexWrap: 'wrap' }}>
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
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div>
                                                            <label>
                                                                Pesan RSVP Tidak Hadir
                                                            </label>
                                                            <textarea rows="3" className="form-control" />
                                                            <small className="text-muted">Pesan yang tertampil jika tamu memilih untuk tidak hadir</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div>
                                                            <label>
                                                                Isian Form Tidak Hadir
                                                            </label>
                                                            <br />
                                                            <small className="text-muted">Atur form yang ditampilkan jika tamu memilih untuk tidak hadir.</small>
                                                            <ul className="list-group mt-4 mb-4">
                                                                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.6rem 1rem' }}>
                                                                    <div className="d-flex">
                                                                        <i className="ri-bill-line align-middle me-2"></i>
                                                                        No. Handphone
                                                                    </div>
                                                                    <div className="d-flex">
                                                                        <button className="btn btn-outline-info btn-sm mr-3">
                                                                            <IconsI icons='fa-regular fa-edit' />
                                                                        </button>
                                                                        <button className="btn btn-outline-danger btn-sm">
                                                                            <IconsI icons='fa-regular fa-trash' />
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-3" style={{ gap: 20, display: 'flex', flexWrap: 'wrap' }}>
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
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-5 mb-10">
                                        <div>
                                            <label>
                                                Maksimum Jumlah Orang
                                            </label>
                                            <input type='text' className="form-control" />
                                        </div>
                                    </div>
                                    <hr />
                                    <h5>Komentar</h5>
                                    <div className="position-relative mt-3">
                                        <PremiumFeature />
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="switchComments_allow_public" />
                                                    <label htmlFor="switchComments_allow_public">Perbolehkan komentar untuk umum (bukan tamu)</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                    <input className="form-check-input" type="checkbox" role="switch" id="switchComments_need_moderation" />
                                                    <label htmlFor="switchComments_need_moderation">Setiap komentar perlu moderasi sebelum ditampilkan</label>
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

export default RsvpComments