import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const IconsI = dynamic(() => import('./Utils/Icons'), { ssr: false })

const NavbarTop = () => {
    return (
        <>
            <header id="page-topbar">
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

                            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                                id="topnav-hamburger-icon">
                                <div className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="dropdown topbar-head-dropdown ms-1 header-item">
                                <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="bx bx-category-alt fs-22"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end" data-popper-placement="bottom-end">
                                    <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="m-0 fw-semibold fs-15"> Ganti Acara </h6>
                                            </div>
                                            <div className="col-auto">
                                                <a href="#!" className="btn btn-sm btn-soft-info">
                                                    <IconsI icons='fa-regular fa-plus mr-3'/>
                                                    Buat Baru
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <div className="row g-0 scrollbar" style={{ maxHeight:250 }}>
                                            <div className="col-md-12">
                                                <a className="dropdown-icon-item" href="#!">
                                                    <Image width={50} height={50} src="/images/logo-icon.svg" alt="Github" />
                                                    <span>Weni & Dewa</span>
                                                    <small>testingwedding.wedew.id - 20.01.2023</small>
                                                </a>
                                            </div>
                                            <div className="col-md-12">
                                                <a className="dropdown-icon-item" href="#!">
                                                    <Image width={50} height={50} src="/images/logo-icon.svg" alt="Github" />
                                                    <span>Weni & Dewa</span>
                                                    <small>testingwedding.wedew.id - 20.01.2023</small>
                                                </a>
                                            </div>
                                            <div className="col-md-12">
                                                <a className="dropdown-icon-item" href="#!">
                                                    <Image width={50} height={50} src="/images/logo-icon.svg" alt="Github" />
                                                    <span>Weni & Dewa</span>
                                                    <small>testingwedding.wedew.id - 20.01.2023</small>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="d-flex align-items-center">
                                        <Image className="rounded-circle header-profile-user" width={50} height={50} src="/images/user-placeholder-committee.png" alt="Header Avatar" />
                                        <span className="text-start ms-xl-2">
                                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">Anna Adame</span>
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <h6 className="dropdown-header">Welcome Anna!</h6>
                                    <Link className="dropdown-item" href="">
                                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle">Profile</span>
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" href="">
                                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle" data-key="t-logout">Logout</span>
                                    </Link>
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