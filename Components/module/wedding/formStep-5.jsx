import dynamic from "next/dynamic";
import React from "react";

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const FormStep5 = ({ subDomain, publish, setSubDomain, setPublish }) => {

    return (
        <>
            <form id="0b2c308432d8ff94f2510e81f47f06f3">
                <div>
                    <div className="row mt-6">
                        <div className="col-md-12 mb-8">
                            <div className="text-center">
                                <h2>Website Sudah Siap</h2>
                                <span>
                                    Pilih alamat yang diinginkan dan pastinya juga mudah diingat.
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div>
                                <label>
                                    Alamat Website
                                </label>
                                <div className="input-group">
                                    <input onChange={(e) => setSubDomain(e.target.value)} value={subDomain} type="text" className="form-control" style={{ textAlign:'right' }} />
                                    <span className="input-group-text" style={{ backgroundColor:'#fff',fontWeight:700 }}>.invedo.id</span>
                                </div>
                                <p className="text-muted m-0" style={{ fontSize: 11 }}>Buat nama domain yang unik.</p>
                            </div>
                        </div>
                        <div className="col-md-12 mt-7">
                            <div>
                                <label>
                                    Publikasikan Kapan?
                                </label>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="publish-now" className="form-publish">
                                            <input checked={(publish === 'now') ? true : false} type="radio" id="publish-now" name="is_publish" onChange={(e) => setPublish('now')} />
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto text-center">
                                                    <IconsI icons='fa fa-check fa-fw fa-lg' />
                                                </div>
                                                <div className="col ml-3">
                                                    <h6 className="m-0">Publikasikan Sekarang</h6>
                                                    <p className="text-muted m-0"><small>Website akan langsung aktif dan dapat dilihat</small></p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="publish-later" className="form-publish">
                                            <input checked={(publish === 'later') ? true : false} type="radio" id="publish-later" name="is_publish" onChange={(e) => setPublish('later')} />
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto text-center">
                                                    <IconsI icons='far fa-clock fa-fw fa-lg' />
                                                </div>
                                                <div className="col ml-3">
                                                    <h6 className="m-0">Publikasikan Nanti</h6>
                                                    <p className="text-muted m-0"><small>Menampilkan halaman Coming Soon</small></p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormStep5