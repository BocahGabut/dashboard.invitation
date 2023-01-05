import dynamic from "next/dynamic";
import React from "react";
import Layout from "../Components/Layout";

const IconsI = dynamic(() => import('../Components/Utils/Icons'), { ssr: false })
const DataTableComponent = dynamic(() => import('../Components/DataTableComponent'), { ssr: false })

const Guest = () => {
    return (
        <>
            <Layout activeSidebar='guest'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card no-shadow border-border">
                            <div className="card-body py-4 px-6">
                                <div className="row">
                                    <div className="col-md-12 d-md-flex">
                                        <button type="button" className="btn mt-3 btn-info bg-gradient waves-effect waves-light mr-3">
                                            <IconsI icons='fa-solid fa-plus mr-3' />
                                            Tambah
                                        </button>
                                        <div className="btn-group mr-3" role="group">
                                            <button type="button" className="btn mt-3 btn-outline-dark">
                                                <IconsI icons='fa-duotone fa-upload mr-3' />
                                                Import
                                            </button>
                                            <button type="button" className="btn mt-3 btn-outline-dark">
                                                <IconsI icons='fa-duotone fa-download mr-3' />
                                                Ekspor
                                            </button>
                                        </div>
                                        <div className="dropdown">
                                            <button type="button" className="btn mt-3 btn-outline-dark dropdown-toggle" id="menu_more" data-bs-toggle="dropdown" aria-expanded="false">
                                                <IconsI icons='fa-duotone fa-ellipsis-stroke-vertical mr-3' />
                                                Lainnya
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="menu_more">
                                                <button className="dropdown-item">
                                                    Tambah Tamu Kosong...
                                                </button>
                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item">
                                                    Kirim WhatsApp...
                                                </button>
                                                <button className="dropdown-item">
                                                    Kirim Email...
                                                </button>
                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item d-flex align-items-center justify-content-between">
                                                    Tamu Diarsipkan
                                                    <span className="badge badge-soft-dark">0</span>
                                                </button>
                                                <div className="dropdown-divider" />
                                                <button className="dropdown-item">
                                                    Arsipkan
                                                </button>
                                                <button className="dropdown-item text-danger">
                                                    Hapus
                                                </button>
                                                <button className="dropdown-item text-danger">
                                                    Hapus Semua Tamu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-5">
                                        <DataTableComponent />
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

export default Guest