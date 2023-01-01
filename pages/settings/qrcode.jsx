import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import FormImage from "../../Components/form-image";
import Layout from "../../Components/Layout";

const Icons = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })
const FormColor = dynamic(() => import('../../Components/form-color'), { ssr: false })
const Select = dynamic(() => import('react-select'), { ssr: false })

const currentTime = new Date().getTime();
const generateSessionKey = `${currentTime}-${Math.random().toString(36).substring(2)}`;

const Qrcode = () => {
    const iframeRef = useRef();

    const [previewQr, setPreviewQr] = useState('/preview/qrcode')
    const [sessionKey, setSessionKey] = useState(btoa(generateSessionKey))

    const [backgroundColor, setBackgroundColor] = useState({ r: 42, g: 71, b: 120, a: 1 })
    const [textColor, setTextColor] = useState({ r: 255, g: 255, b: 255, a: 2 })
    const [linkColor, setLinkColor] = useState({ r: 255, g: 255, b: 255, a: 2 })
    const [backgroundImage, setbackgroundImage] = useState('')

    const [qrCodeType, setQrCodeType] = useState('invitation_code')
    const [showVip, setShowVip] = useState('true')
    const [qrText, setQrText] = useState('Tunjukkan kode ini ke penerima tamu untuk mempermudah proses check-in di lokasi acara.')
    const [fontSelected, setFontSelected] = useState('Source Sans Pro')
    const [linkStatus, setLinkStatus] = useState('invitation')

    const [typingTimer, setTypingTimer] = useState(null);
    const doneTypingInterval = 1000;  //time in ms, 5 seconds for example

    const handleKeyUp = () => {
        clearTimeout(typingTimer);
        setTypingTimer(setTimeout(handleGenerateQr, doneTypingInterval));
    };

    const handleKeyDown = () => {
        clearTimeout(typingTimer);
    };

    useEffect(() => {
        handleGenerateQr();
    }, [linkStatus, qrCodeType, qrText, fontSelected, backgroundColor, textColor, linkColor, showVip]);

    const optionsColor = [
        { value: 'Source Sans Pro', label: 'Source Sans Pro' },
        { value: 'Raleway', label: 'Raleway' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Playfair Display', label: 'Playfair Display' },
    ]

    const loadPreview = () => {
        setTimeout(() => {
            iframeRef.current.contentWindow.location.reload(true);
        }, 250);
    }

    useEffect(() => {
        var url = `/preview/qrcode?_session_key=${sessionKey}&qrcard_bg_color=${btoa(`rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`)}`
        url += `&qrcard_text_color=${btoa(`rgba(${textColor.r},${textColor.g},${textColor.b},${textColor.a})`)}`
        url += `&qrcard_link_color=${btoa(`rgba(${linkColor.r},${linkColor.g},${linkColor.b},${linkColor.a})`)}`
        url += `&qrcard_qrcode_type=${btoa(qrCodeType)}`
        url += `&qrcard_show_vip_sign=${btoa(showVip)}`
        url += `&qrcard_text=${btoa(qrText)}`
        url += `&qrcard_font=${btoa(fontSelected)}`
        url += `&qrcard_link_footer=${btoa(linkStatus)}`

        clearTimeout(typingTimer);
        setPreviewQr(url)
    }, [])


    const handleGenerateQr = () => {
        setTimeout(() => {
            var url = `/preview/qrcode?_session_key=${sessionKey}&qrcard_bg_color=${btoa(`rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`)}`
            url += `&qrcard_text_color=${btoa(`rgba(${textColor.r},${textColor.g},${textColor.b},${textColor.a})`)}`
            url += `&qrcard_link_color=${btoa(`rgba(${linkColor.r},${linkColor.g},${linkColor.b},${linkColor.a})`)}`
            url += `&qrcard_qrcode_type=${btoa(qrCodeType)}`
            url += `&qrcard_show_vip_sign=${btoa(showVip)}`
            url += `&qrcard_text=${btoa(qrText)}`
            url += `&qrcard_font=${btoa(fontSelected)}`
            url += `&qrcard_link_footer=${btoa(linkStatus)}`

            setPreviewQr(url)
            loadPreview()
        }, 350);
    }

    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card no-shadow border-border">
                            <div className="card-body py-4 px-4">
                                <div className="row">
                                    <div className="col-md-12 mb-5">
                                        <h5 style={{ fontSize: 22.3, fontWeight: 400, margin: 0, color: '#000' }}>
                                            Qr Code
                                        </h5>
                                    </div>
                                    <div className="col-lg mb-10">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-4 mt-3">
                                                    <div className="d-flex flex-column">
                                                        <label>Warna Latar</label>
                                                        <FormColor colorDefault={backgroundColor} colorValue={(e) => setBackgroundColor(e)} target='ItomBROnwo' />
                                                    </div>
                                                </div>
                                                <div className="col-4 mt-3">
                                                    <div className="d-flex flex-column">
                                                        <label>Text Color</label>
                                                        <FormColor colorDefault={textColor} colorValue={(e) => setTextColor(e)} target='ElXPtTeAac' />
                                                    </div>
                                                </div>
                                                <div className="col-4 mt-3">
                                                    <div className="d-flex flex-column">
                                                        <label>Link Color</label>
                                                        <FormColor colorDefault={linkColor} colorValue={(e) => setLinkColor(e)} target='ElXPtTeAac' />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mt-3">
                                                    <div>
                                                        <label>Background Picture</label>
                                                        <FormImage taget_id='JfOXIKkDXJ' />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-4">
                                                    <div>
                                                        <label>
                                                            Font
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isDisabled={false}
                                                            isLoading={false}
                                                            isClearable={true}
                                                            isRtl={false}
                                                            isSearchable={true}
                                                            name="fonts"
                                                            defaultValue={fontSelected}
                                                            onChange={(e) => { setFontSelected(e.value) }}
                                                            options={optionsColor}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-4">
                                                    <div>
                                                        <label>
                                                            QR Code
                                                        </label>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div>
                                                                    <div className="form-check mb-2">
                                                                        <input className="form-check-input" type="radio" name="qr_type" checked={(qrCodeType === 'invitation_code') ? true : false} onChange={(e) => { setQrCodeType(e.target.value) }} value='invitation_code' id="invitation_code" />
                                                                        <label className="form-check-label" htmlFor="invitation_code">
                                                                            Kode Undangan
                                                                            <br />
                                                                            <small style={{ fontSize: 8.5 }}>Kode 6 Digit</small>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div>
                                                                    <div className="form-check mb-2">
                                                                        <input className="form-check-input" type="radio" name="qr_type" checked={(qrCodeType === 'invitation_link') ? true : false} onChange={(e) => { setQrCodeType(e.target.value) }} value='invitation_link' id="invitation_link" />
                                                                        <label className="form-check-label" htmlFor="invitation_link">
                                                                            Link E-invitation
                                                                            <br />
                                                                            <small style={{ fontSize: 8.5 }}>testingwedding.wedew.id/123456</small>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div>
                                                                    <div className="form-check mb-2">
                                                                        <input className="form-check-input" type="radio" name="qr_type" checked={(qrCodeType === 'website_link') ? true : false} onChange={(e) => { setQrCodeType(e.target.value) }} value='website_link' id="website_link" />
                                                                        <label className="form-check-label" htmlFor="website_link">
                                                                            Link Website
                                                                            <br />
                                                                            <small style={{ fontSize: 8.5 }}>testingwedding.wedew.id</small>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mt-4">
                                                                <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                                    <input checked={(showVip) ? true : false} onChange={(e) => { setShowVip(e.target.checked) }} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                                                                    <label className="form-check-label" htmlFor="flexRadioDefault1" style={{ display: 'flex', flexDirection: 'column' }}>
                                                                        Beri Tanda untuk Tamu VIP
                                                                        <small style={{ fontSize: 8.5 }}>Jika tamu merupakan VIP, maka tanda akan ditampilkan</small>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mt-3">
                                                                <div>
                                                                    <label>Teks</label>
                                                                    <textarea onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onChange={(e) => setQrText(e.target.value)} className="form-control" rows={3} placeholder={qrText} defaultValue={qrText} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 mt-5">
                                                                <div>
                                                                    <label>Link</label>
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <div>
                                                                                <div className="form-check mb-2">
                                                                                    <input className="form-check-input" type="radio" name="qrcard_link_type" checked={(linkStatus === 'none') ? true : false} value='none' onChange={(e) => { setLinkStatus(e.target.value) }} id="radioQrcodeLinkNone" />
                                                                                    <label className="form-check-label" htmlFor="radioQrcodeLinkNone">
                                                                                        Tidak Ditampilkan
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div>
                                                                                <div className="form-check mb-2">
                                                                                    <input className="form-check-input" type="radio" name="qrcard_link_type" checked={(linkStatus === 'invitation') ? true : false} value='invitation' onChange={(e) => { setLinkStatus(e.target.value) }} id="radioQrcodeLinkInvitation" />
                                                                                    <label className="form-check-label" htmlFor="radioQrcodeLinkInvitation">
                                                                                        E-invitation
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div>
                                                                                <div className="form-check mb-2">
                                                                                    <input
                                                                                        className="form-check-input"
                                                                                        type="radio"
                                                                                        name="qrcard_link_type" checked={(linkStatus === 'website') ? true : false}
                                                                                        value='website'
                                                                                        onChange={(e) => {
                                                                                            setLinkStatus(e.target.value)
                                                                                        }}
                                                                                        id="radioQrcodeLinkWebsite"
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor="radioQrcodeLinkWebsite">
                                                                                        Website
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg text-center">
                                        <button className="btn btn-outline-primary mb-4" onClick={(e) => loadPreview()}>
                                            <Icons icons='fa fa-fw fa-sync-alt mr-3' />
                                            Lihat Perubahan
                                        </button>
                                        <div className="qrcard-preview shadow m-auto" style={{ width: 220, height: 360 }}>
                                            <iframe ref={iframeRef} src={previewQr} frameBorder="0" width={220} height={360} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-10 mb-4">
                                        <Link href='/settings' className="btn btn-light mr-3">
                                            Kembali
                                        </Link>
                                        <button className="btn btn-outline-info" onClick={(e) => handleGenerateQr(e)}>
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

export default Qrcode