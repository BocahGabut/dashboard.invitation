import Link from "next/link";
import React from "react";
import FormImage from "../../Components/form-image";
import Layout from "../../Components/Layout";

const Couple = () => {
    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card no-shadow border-border">
                            <div className="card-body py-4 px-4">
                                <div className="row">
                                    <div className="col-md mb-10">
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <h5 style={{ fontSize: 22.3, fontWeight: 400, margin: 0, color: '#000' }} className="card-title">
                                                    Calon Pengantin Wanita
                                                </h5>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Foto</label>
                                                    <FormImage taget_id='QAaNJQWsRY' />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Nama</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Bio</label>
                                                    <textarea type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Instagram</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">@</span>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="row">
                                            <div className="col-md-12 mb-4">
                                                <h5 style={{ fontSize: 22.3, fontWeight: 400, margin: 0, color: '#000' }} className="card-title">
                                                    Calon Pengantin Pria
                                                </h5>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Foto</label>
                                                    <FormImage taget_id='ItomBROnwo' />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Nama</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Bio</label>
                                                    <textarea type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-4">
                                                <div>
                                                    <label>Instagram</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">@</span>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-8 mb-4">
                                        <Link href='/settings' className="btn btn-light mr-3">
                                            Kembali
                                        </Link>
                                        <button className="btn btn-info">
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

export default Couple