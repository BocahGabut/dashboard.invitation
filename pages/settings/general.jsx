import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import FormImage from "../../Components/form-image";
import Layout from "../../Components/Layout";

const General = () => {

    const [subDomain, setSubDomain] = useState('');
    const [judul, setJudul] = useState('');
    const [description, setDescription] = useState('');
    const [favicon, setFavicon] = useState('')

    return (
        <>
            <Head>
                <title>Pengaturan Umum - Invedo</title>
            </Head>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-lg">
                        <div className="card no-shadow border-border" >
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm">
                                        <div>
                                            <label>
                                                Alamat Website
                                            </label>
                                            <div className="input-group">
                                                <input onChange={(e) => setSubDomain(e.target.value)} value={subDomain} type="text" className="form-control" style={{ textAlign: 'right' }} />
                                                <span className="input-group-text" style={{ backgroundColor: '#fff', fontWeight: 700 }}>.invedo.id</span>
                                            </div>
                                            <p className="text-muted m-0" style={{ fontSize: 11 }}>Catatan: Mengubah subdomain akan mempengaruhi link undangan yang telah disebar.</p>
                                        </div>
                                        <div className="mt-4">
                                            <label>
                                                Judul <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required name="judul" className="form-control" />
                                        </div>
                                        <div className="mt-4">
                                            <label>
                                                Description
                                            </label>
                                            <textarea rows={3} value={judul} onChange={(e) => setDescription(e.target.value)} required name="judul" className="form-control" />
                                        </div>
                                        <div className="mt-4">
                                            <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                <input className="form-check-input" type="checkbox" role="switch" id="switchIs_published" />
                                                <label className="form-check-label" htmlFor="switchIs_published" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    Publikasikan Website
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                <input className="form-check-input" type="checkbox" role="switch" id="switchIs_noindex" />
                                                <label className="form-check-label" htmlFor="switchIs_noindex" style={{ display: 'flex', flexDirection: 'column' }}>
                                                    Sembunyikan website dari mesin pencarian
                                                    <small style={{ fontSize: 9.5, marginTop: -10 }}>
                                                        Seperti Google, Yahoo!, Bing, dll.
                                                    </small>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="position-relative">
                                            <div>
                                                <label>Favicon</label>
                                                <FormImage width={45} height={45} callBack={setFavicon} fileAccept="image/jpeg,image/png" taget_id="00128ja9JkJ9" />
                                                <p className="text-muted m-0" style={{ fontSize: 11 }}>Ikon website. Ukuran: 128 x 128 px. Maks 1 MB</p>
                                            </div>
                                            <div className="mt-4">
                                                <label>Gambar Cover</label>
                                                <FormImage width={400} height={210} callBack={setFavicon} fileAccept="image/jpeg,image/png" taget_id="991217ji2HIS8" />
                                                <p className="text-muted m-0" style={{ fontSize: 11 }}>Gambar untuk berbagi di internet. Ukuran: 1200 x 630 px. Maks 3 MB</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm text-center">
                                        <div className="card no-shadow mt-6">
                                            <div className="card-body bg-light">
                                                <p className="text-muted">Atur website agar terlihat baik jika dibagikan.</p>
                                                <Image src='/images/website-preview.png' width={350} height={450} alt="preview website" className="img-fluid my-3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-12">
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

export default General