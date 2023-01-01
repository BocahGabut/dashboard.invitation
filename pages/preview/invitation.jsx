import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import QRCode from 'react-qr-code';

const IconsI = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })

const Invitation = () => {
    const [qrCodeType, setQrCodeType] = useState('testingwedding.wedew.id/123456')

    return (
        <>
            <div id="invit_preview">
                <div className="bg-white h-100 d-flex flex-column">
                    <div className="flex-grow-1 d-flex flex-column overflow-hidden">
                        <div className="bg-gradient-primary text-white d-flex align-items-center justify-content-center p-4 overlay" style={{height: '280px', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
                            <div className="text-center">
                                <div className="lead">Hii</div>
                                <h1 className="my-1 text-white">Weni &amp; Dewa</h1>
                            </div>
                        </div>
                        <div className="bg-white flex-fill d-flex flex-column justify-content-around px-4 pt-3">
                            <div>
                                <div className="lead mb-2">Resepsi</div>
                                <div className="row no-gutters align-items-center mb-3">
                                    <div className="col-auto">
                                        <IconsI icons='fa-duotone fa-calendar' style={{ width:32,height:32 }} />
                                    </div>
                                    <div className="col">
                                        <div className="h5 mb-0">Friday, January 20, 2023</div>
                                        <div>11:00 - 13:00</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <div className="text-muted">
                                            <small>Yth</small>
                                        </div>
                                        <div className="h5">
                                            John Doe
                                            <small style={{ verticalAlign:'middle' }}>
                                                <span className="badge rounded-pill badge-soft-warning">
                                                    <IconsI icons='fa fa-fw fa-star mr-3' />
                                                    VIP
                                                </span>
                                            </small>
                                        </div>
                                        <p>You are invited to our wedding day! Bring this card and scan the QR code for check-in at location.</p>
                                    </div>
                                    <div className="col-auto">
                                        <div className="position-relative">
                                            <QRCode value={qrCodeType} style={{ maxWidth: '100%', height: '100%',width:168 }} />
                                            <div className="bg-white position-absolute d-flex align-items-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 50, height: 40 }}>
                                                <Image src="/images/logo-icon.svg" width={40} height={40} alt="logo qrcode" className="w-100 p-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 pb-3">
                        <div className="row no-gutters align-items-end">
                            <div className="col">
                                <div className="text-muted">
                                    <small>MORE INFO</small>
                                </div>
                                <div className="font-weight-bold text-truncate">
                                    <Link href="/">testingwedding.wedew.id/123456</Link>
                                </div>
                            </div>
                            <div className="col-auto" >
                                <small>
                                    Powered by
                                    <Image className="ml-2" src="/images/logo.svg" width={60} height={20} alt="powered" />
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invitation