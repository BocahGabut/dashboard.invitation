import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../Components/Layout";

const IconsI = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })

const CustomFields = () => {
    const [jenisItem, setjenisItem] = useState('Text')
    const [toDoList, setToDoList] = useState([])
    const [dataInput, setDataInput] = useState({name:'',jenis:'',pilihan:''})

    const handleSave = () => {

    }

    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card no-shadow border-border">
                            <div className="card-body py-4 px-4">
                                <div className="row">
                                    <div className="col-md-12 mb-5">
                                        <h5 style={{ fontSize: 17.3, fontWeight: 600, margin: 0, color: '#000' }}>
                                            Data Tambahan
                                        </h5>
                                        <p className="text-muted mt-2">Kamu bisa menambahkan beberapa data yang diinginkan sesuai kebutuhan misalnya nomor meja, keterangan tambahan, dan sebagainya. Selain itu, data ini bisa menjadi isian formulir pada grup maupun RSVP.</p>
                                    </div>
                                    <div>
                                        <div className="card mb-3" style={{ padding: 0 }}>
                                            <div className="row no-gutters">
                                                <div className="col-auto" style={{ paddingLeft: 0 }}>
                                                    <div className="card-body bg-light h-100">
                                                        <IconsI icons='fa fa-lg fa-i-cursor fa-fw text-muted' />
                                                    </div>
                                                </div>
                                                <div className="col" style={{ padding: 0 }}>
                                                    <div className="card-body p-2">
                                                        <div>
                                                            <small className="text-muted">meja</small>
                                                        </div>
                                                        <h6 className="m-0">
                                                            Meja
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="p-3 px-6">
                                                        <button className="btn btn-outline-info btn-sm mr-3">
                                                            <IconsI icons='fa-regular fa-edit' />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm">
                                                            <IconsI icons='fa-regular fa-trash' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3" style={{ padding: 0 }}>
                                            <div className="row no-gutters">
                                                <div className="col-auto" style={{ paddingLeft: 0 }}>
                                                    <div className="card-body bg-light h-100">
                                                        <IconsI icons='fa fa-lg fa-sort-numeric-down fa-fw text-muted' />
                                                    </div>
                                                </div>
                                                <div className="col" style={{ padding: 0 }}>
                                                    <div className="card-body p-2">
                                                        <div>
                                                            <small className="text-muted">meja</small>
                                                        </div>
                                                        <h6 className="m-0">
                                                            Meja
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="p-3 px-6">
                                                        <button className="btn btn-outline-info btn-sm mr-3">
                                                            <IconsI icons='fa-regular fa-edit' />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm">
                                                            <IconsI icons='fa-regular fa-trash' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3" style={{ padding: 0 }}>
                                            <div className="row no-gutters">
                                                <div className="col-auto" style={{ paddingLeft: 0 }}>
                                                    <div className="card-body bg-light h-100">
                                                        <IconsI icons='fa fa-lg fa-list fa-fw text-muted' />
                                                    </div>
                                                </div>
                                                <div className="col" style={{ padding: 0 }}>
                                                    <div className="card-body p-2">
                                                        <div>
                                                            <small className="text-muted">meja</small>
                                                        </div>
                                                        <h6 className="m-0">
                                                            Meja
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="p-3 px-6">
                                                        <button className="btn btn-outline-info btn-sm mr-3">
                                                            <IconsI icons='fa-regular fa-edit' />
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm">
                                                            <IconsI icons='fa-regular fa-trash' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-5 pl-6">
                                        <button className="btn btn-outline-dark btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modal_add" onClick={(e) => setDataInput({name:'',jenis:'',pilihan:''})}>
                                            <IconsI icons='fa-regular fa-plus mr-3' />
                                            Tambah Data
                                        </button>
                                    </div>
                                    <div className="col-md-12 mt-15">
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
                <div id="modal_add" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myModalLabel">Tambah Data</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div>
                                            <label>
                                                Nama Kolom
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <input value={dataInput.name} name="name" onChange={(e) => setDataInput({...dataInput,[e.target.name]:e.target.value})} type="text" className="form-control" />
                                            <small className="text-muted">
                                                Contoh: Nomor Meja, Pintu Masuk, Catatan
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div>
                                            <label>
                                                Jenis
                                            </label>
                                            <div style={{ display: 'flex', gap: 20 }}>
                                                <div className="form-check">
                                                    <input name="jenis"
                                                    checked={(jenisItem === 'Text') ? true : false}
                                                    onChange={(e) => {setjenisItem(e.target.value),setDataInput({...dataInput,[e.target.name]:e.target.value})}} value="Text" className="form-check-input" type="radio" id="Text" />
                                                    <label className="form-check-label" htmlFor="Text">
                                                        Text
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input name="jenis"
                                                    checked={(jenisItem === 'Number') ? true : false}
                                                    onChange={(e) => {setjenisItem(e.target.value),setDataInput({...dataInput,[e.target.name]:e.target.value})}} value="Number" className="form-check-input" type="radio" id="Number" />
                                                    <label className="form-check-label" htmlFor="Number">
                                                        Number
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input name="jenis"
                                                    checked={(jenisItem === 'Dropdown') ? true : false}
                                                    onChange={(e) => {setjenisItem(e.target.value),setDataInput({...dataInput,[e.target.name]:e.target.value})}} value="Dropdown" className="form-check-input" type="radio" id="Dropdown" />
                                                    <label className="form-check-label" htmlFor="Dropdown">
                                                        Dropdown
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <div className={`collapse ${(jenisItem !== 'Dropdown') ? '' : 'show'}`} id="collapseWithicon">
                                            <label>Pilihan</label>
                                            <textarea value={dataInput.pilihan} name="pilihan" onChange={(e) => setDataInput({...dataInput,[e.target.name]:e.target.value})} rows="4" className="form-control" />
                                            <small className="text-muted">
                                                Buat daftar pilihan yang dipisahkan tiap baris.
                                            </small>
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
            </Layout>
        </>
    )
}

export default CustomFields