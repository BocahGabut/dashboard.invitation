import Link from "next/link";
import React from "react";
import NavbarLeft from "./NavbarLeft";
import NavbarTop from "./NavbarTop";

import BackTop from './Utils/BackTop';
import Footer from './Utils/Footer';

const Layout = ({children,activeSidebar}) => {
    const collapseMenu = () => {
        window.document.body.classList.remove('vertical-sidebar-enable')
    }

    return (
        <>
            <div className="layout-wrapper">
                <NavbarTop />
                <NavbarLeft activeSidebar={activeSidebar} />
                <div className="vertical-overlay" onClick={(e) => collapseMenu()} />
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-box d-flex align-items-center" style={{ gap:'1rem' }}>
                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                            <input className="form-check-input" type="checkbox" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Publikasikan website" role="switch" id="flexSwitchCheckChecked" />
                                        </div>
                                        <Link href='testingwedding.wedew.id' target="_blank" className="text-info">
                                            testingwedding.wedew.id
                                        </Link>
                                        <Link href='package' className="badge rounded-pill badge-outline-info">Starter Package</Link>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BackTop />
                <Footer />
            </div>
        </>
    )
}

export default Layout