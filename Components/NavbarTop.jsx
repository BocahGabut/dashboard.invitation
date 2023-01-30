import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { getInvitation } from "../Context/config-app";
import { getUser } from "../Context/getUser";

const IconsI = dynamic(() => import('./Utils/Icons'), { ssr: false })

const NavbarTop = ({ fullNavbarTop,loadInvitation }) => {
    const [accountData, setAccountData] = useState({})
    const [invitation, setInvitation] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser();
                setAccountData(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getInvitationData = async () => {
            try {
                const data = await getInvitation()
                setInvitation(data.data)
            } catch (error) {
                console.log(error)
            }
        }

        getInvitationData()
    }, [loadInvitation]);

    const logout = () => {
        Cookies.remove("auth-prefix");
        Cookies.remove("relix-prefix");
        Router.push('/login')
    }
    return (
        <>
            <header id="page-topbar" style={{ left: `${(fullNavbarTop) ? 0 : 250}` }}>
                {/* layout-width */}
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex align-items-center">
                            <div className="navbar-brand-box horizontal-logo">
                                <Link href="/" className="logo logo-dark">
                                    <span className="logo-lg" style={{ position: 'relative', top: 10 }}>
                                        <Image src="/images/logo.svg" alt="Logo" height="60" width={185} />
                                    </span>
                                </Link>

                                <Link href="/" className="logo logo-light">
                                    <span className="logo-lg" style={{ position: 'relative', top: 10 }}>
                                        <Image src="/images/logo.svg" alt="Logo" height="60" width={185} />
                                    </span>
                                </Link>
                            </div>

                            {/* <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                                id="topnav-hamburger-icon">
                                <div className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button> */}
                            {
                                (fullNavbarTop) ?
                                    <span className="logo-lg" style={{ position: 'relative' }}>
                                        <Image src="/images/logo.svg" alt="Logo" height={30} width={130} />
                                    </span>
                                    : ''
                            }
                        </div>
                        <div className="d-flex align-items-center">
                            {
                                (invitation.length < 1) ? '' :
                                <div className="dropdown topbar-head-dropdown ms-1 header-item">
                                    {/* <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="bx bx-category-alt fs-22"></i>
                                            </button> */}
                                    <button type="button" className="btn text-muted font-weight-bold" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            (Cookies.get('relix-prefix')) ? invitation.filter(obj => obj.id === Cookies.get('relix-prefix'))[0].judul : ''
                                        }
                                        <IconsI icons='fa fa-caret-down fa-fw ml-2' />
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end" data-popper-placement="bottom-end">
                                        <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0 fw-semibold fs-15"> Ganti Acara </h6>
                                                </div>
                                                <div className="col-auto">
                                                    <button className="btn btn-sm btn-soft-info">
                                                        <IconsI icons='fa-regular fa-plus mr-3' />
                                                        Buat Baru
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <div className="row g-0 scrollbar" style={{ maxHeight: 250 }}>
                                                {
                                                    invitation.map((inv,index) => {
                                                        return (
                                                            <div className="col-md-12" key={index}>
                                                                <a className="dropdown-icon-item" href="#!">
                                                                    <Image width={80} height={80} src="/images/logo.svg" alt="Github" />
                                                                    <span>{inv.judul}</span>
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="d-flex align-items-center">
                                        {
                                            (accountData.profile === 'default') ?
                                                <Image className="rounded-circle header-profile-user" width={50} height={50} src='/images/user-placeholder-committee.png' alt="Header Avatar" />
                                                :
                                                <img src={accountData.profile} className="rounded-circle header-profile-user" width={50} height={50} alt="Header Avatar" />
                                        }
                                        <span className="text-start ms-xl-2">
                                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{accountData.name}</span>
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <h6 className="dropdown-header">Welcome {accountData.name}!</h6>
                                    <Link className="dropdown-item" href="/profile">
                                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle">Profile</span>
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <div className="dropdown-item" onClick={(e) => logout()}>
                                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle" data-key="t-logout">Logout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavbarTop