import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../../Components/Layout";
import InputDateRange from "../../Components/Utils/inputDateRange";

const IconsI = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })

const Events = () => {
    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card flex-md-row">
                            <Image className="card-img h-auto" style={{ objectFit: 'cover', width: 240 }} src='/images/bkg-map-entry.svg' width={240} height={240} alt="preview map" />
                            <div className="card-body">
                                <div className="row no-gutters">
                                    <div className="col d-flex align-items-center">
                                        <h5 className="">Jum, 20 Jan 2023</h5>
                                    </div>
                                    <div className="col-auto">
                                        <div className="py-4">
                                            <button className="btn btn-outline-info btn-sm mr-3">
                                                <IconsI icons='fa-regular fa-edit' />
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm">
                                                <IconsI icons='fa-regular fa-trash' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-light text-reset" style={{ padding: '1.25rem' }}>
                                    <div className="row">
                                        <div className="col-xl-6 mb-4">
                                            <div className="card h-100 ">
                                                <div className="card-body">
                                                    <div className="row no-gutters">
                                                        <div className="col">
                                                            <h5 className="d-flex align-items-center">
                                                                Akad Nikah
                                                                <span className="badge rounded-pill badge-outline-success ml-2">
                                                                    Ditampilkan
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="">
                                                                <button className="btn btn-outline-info btn-sm mr-3">
                                                                    <IconsI icons='fa-regular fa-edit' />
                                                                </button>
                                                                <button className="btn btn-outline-danger btn-sm">
                                                                    <IconsI icons='fa-regular fa-trash' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row no-gutters mt-6">
                                                        <div className="col-auto mr-2">
                                                            <IconsI icons='far fa-clock fa-fw' />
                                                        </div>
                                                        <div className="col">08:00 - end</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 mb-4">
                                            <div className="card h-100 border-success" style={{ borderWidth: 1 }}>
                                                <div className="card-body">
                                                    <div className="row no-gutters">
                                                        <div className="col">
                                                            <h5 className="d-flex align-items-center mt-2">
                                                                Akad Nikah
                                                                <span className="badge rounded-pill badge-outline-success ml-2">
                                                                    Ditampilkan
                                                                </span>
                                                            </h5>
                                                            <span className="badge badge-soft-success position-absolute" style={{ top: "-1rem", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                                                                <IconsI icons='fa fa-fw fa-star' />
                                                                Acara Utama
                                                            </span>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="">
                                                                <button className="btn btn-outline-info btn-sm">
                                                                    <IconsI icons='fa-regular fa-edit' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row no-gutters mt-6">
                                                        <div className="col-auto mr-2">
                                                            <IconsI icons='far fa-clock fa-fw' />
                                                        </div>
                                                        <div className="col">08:00 - end</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-info mt-5">
                                        <IconsI icons='fa-regular fa-plus mr-3' />
                                        Tambah Acara
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <div className="col-md-12 mt-5">
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" role="switch" id="switchIs_inherit_location" />
                                            <label className="form-check-label" htmlFor="switchIs_inherit_location" style={{ display: 'flex', flexDirection: 'column' }}>
                                                Lokasi sama dalam satu hari
                                                <small style={{ fontSize: 9.5, marginTop: -10 }}>
                                                    Jika lokasi berbeda, maka perlu memasukkan detil lokasi di tiap rangkaian acara
                                                </small>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters mt-3">
                                    <div className="col-auto mr-2">
                                        <IconsI icons='fa-solid fa-map-pin' />
                                    </div>
                                    <div className="col">
                                        <p>
                                            <strong>Jakarta Islamic Centre</strong>
                                            <br />
                                            <span className="text-muted">Jalan Kramat Jaya Raya 1, Tugu Utara, Kecamatan Koja</span>
                                            <br />
                                            <span className="text-muted">Kota Jakarta Utara</span>
                                            <br />
                                            <small>
                                                <Link href="https://maps.google.com/?cid=4494825223353044055" className="" target="_blank">
                                                    <IconsI icons='fa-duotone fa-map-location-dot mr-3' />
                                                    Lihat Peta
                                                </Link>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-4">
                        <div className="card">
                            <div className="card-body n">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Link href='/settings' className="btn btn-light mr-3">
                                            Kembali
                                        </Link>
                                        <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modal_add">
                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                            Tambah Hari
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <div className="modal fade" id="modal_add" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="myModalLabel">Tambah Acara</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div>
                                        <label>
                                            Tanggal
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <InputDateRange onFocus={(e) => { }} />
                                    </div>
                                </div>
                                <div className="col-md-12 mt-5">
                                    <div>
                                        <label>
                                            Deskripsi
                                        </label>
                                        <textarea rows="3" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-8 mb-4" />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchIs_inherit_location_1" />
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
                                    <Image className="card-img w-100 h-auto" style={{ objectFit: 'cover', width: 240 }} src='/images/bkg-map-entry.svg' width={240} height={240} alt="preview map" />
                                </div>
                                <div className="col-md-6 mt-5">
                                    <div>
                                        <label>
                                            Nama Gedung/Lokasi
                                        </label>
                                        <input type='text' className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6 mt-5">
                                    <div>
                                        <label>
                                            Kota
                                        </label>
                                        <input type='text' className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12 mt-5">
                                    <div>
                                        <label>
                                            Alamat
                                        </label>
                                        <textarea rows="3" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleSave()}>Simpan</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Events