import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavbarLeft from "./NavbarLeft";
import NavbarTop from "./NavbarTop";

import BackTop from './Utils/BackTop';
import Footer from './Utils/Footer';

import Cookies from "js-cookie";
import Router from "next/router";
import { getUser } from "../Context/getUser";

const Layout = ({children,activeSidebar,fullNavbarTop,fullFooter,loadInvitation}) => {
    const [loading, setLoading] = useState(true);

    const collapseMenu = () => {
        window.document.body.classList.remove('vertical-sidebar-enable')
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!Cookies.get('auth-prefix')) {
                Router.push('/login')
            } else {
                try {
                    const data = await getUser();
                    if (data.status === 1 && Router.pathname !== '/complete-account') {
                        return Router.push('/complete-account')
                    }if (data.status === 2 && Router.pathname !== '/verification-number') {
                        return Router.push('/verification-number')
                    }if (data.status === 3 && Router.pathname !== '/start') {
                        return Router.push('/start')
                    } else {
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [loading]);

    return (
        <>
            {
                (loading) ? '' :
                    <div className={`layout-wrapper`}>
                        <NavbarTop fullNavbarTop={fullNavbarTop} loadInvitation={loadInvitation} />
                        {
                            (fullNavbarTop) ? '' :
                            <NavbarLeft activeSidebar={activeSidebar} />
                        }
                        <div className="vertical-overlay" onClick={(e) => collapseMenu()} />
                        <div className="main-content" style={{ marginLeft:`${(fullNavbarTop) ? 0 : 250}` }}>
                            <div className="page-content">
                                <div className="container-fluid">
                                    <div className="row">
                                        {
                                            (fullNavbarTop) ? '' :
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
                                        }
                                        <div className="col-md-12">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            (fullNavbarTop) ? '' :
                            <BackTop />
                        }
                        <Footer fullFooter={fullFooter} />
                    </div>
            }
        </>
    )
}

export default Layout