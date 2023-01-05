import Image from "next/image";
import Link from "next/link";
import React from "react";

import dynamic from "next/dynamic";

const IconsI = dynamic(() => import('./Utils/Icons'), { ssr: false })

const NavbarLeft = ({activeSidebar}) => {
    return (
        <>
            <div className="app-menu navbar-menu">
                <div className="navbar-brand-box">
                    <Link href="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <Image src="/images/logo-icon.svg" width={30} alt="logo" height={30} />
                        </span>
                        <span className="logo-lg">
                            <Image style={{ height: '90px' }} src="/images/logo.svg" width={180} alt="logo" height={180} />
                        </span>
                    </Link>
                    <Link href="/" className="logo logo-light">
                        <span className="logo-sm">
                            <Image src="/images/logo-icon.svg" width={180} alt="logo" height={180} />
                        </span>
                        <span className="logo-lg">
                            <Image style={{ height: '90px' }} src="/images/logo.svg" width={180} alt="logo" height={180} />
                        </span>
                    </Link>
                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>

                <div id="scrollbar">
                    <div className="container-fluid">
                        <div id="two-column-menu">
                        </div>
                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                            <li className="nav-item">
                                <Link href='/' className={`nav-link menu-link ${(activeSidebar === 'home') ? 'active' : ''}`}>
                                    <IconsI icons='fa-duotone fa-house-heart' />
                                    <span data-key="t-widgets">Beranda</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/settings' className={`nav-link menu-link ${(activeSidebar === 'settings') ? 'active' : ''}`}>
                                    <IconsI icons='fa-duotone fa-gear' />
                                    <span data-key="t-settings">Settings</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/guest' className={`nav-link menu-link ${(activeSidebar === 'guest') ? 'active' : ''}`}>
                                    <IconsI icons='fa-duotone fa-user-group' />
                                    <span data-key="t-guest">Tamu</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/messages' className={`nav-link menu-link ${(activeSidebar === 'messages') ? 'active' : ''}`}>
                                    <IconsI icons='fa-duotone fa-paper-plane-top' />
                                    <span data-key="t-messages">Kirim Undangan</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/checkins' className={`nav-link menu-link ${(activeSidebar === 'checkins') ? 'active' : ''}`}>
                                    <IconsI icons='fa-duotone fa-book-open-cover' />
                                    <span data-key="t-checkins">Buku Tamu</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-background"></div>
                </div>
            </div>
        </>
    )
}

export default NavbarLeft