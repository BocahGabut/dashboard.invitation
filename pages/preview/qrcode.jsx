import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QRCode from 'react-qr-code';

const Qrcode = (props) => {
    const [backgroundColor, setBackgroundColor] = useState('rgb(63,72,175)')
    const [textColor, setTextColor] = useState('rgba(255,255,255,1)')
    const [linkColor, setLinkColor] = useState('rgba(255,255,255,1)')
    const [backgroundImage, setbackgroundImage] = useState('')

    const [qrCodeType, setQrCodeType] = useState('invitation_code')
    const [showVip, setShowVip] = useState(true)
    const [qrText, setQrText] = useState('Tunjukkan kode ini ke penerima tamu untuk mempermudah proses check-in di lokasi acara.')
    const [fontSelected, setFontSelected] = useState('Source Sans Pro')
    const [linkStatus, setLinkStatus] = useState('testingwedding.wedew.id')

    const [loadFonts, setLoadFonts] = useState('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700')
    const [fontStyle, setFontStyle] = useState('Source Sans Pro')

    useEffect(() => {
        if (typeof props.query._session_key !== 'undefined') {
            const query = props.query

            setBackgroundColor(atob(query.qrcard_bg_color))
            setTextColor(atob(query.qrcard_text_color))
            setLinkColor(atob(query.qrcard_link_color))

            if (atob(query.qrcard_show_vip_sign) === 'true') {
                setShowVip(true)
            } else if (atob(query.qrcard_show_vip_sign) === 'false') {
                setShowVip(false)
            }
            setQrText(atob(query.qrcard_text))

            switch (atob(query.qrcard_font)) {
                case 'Source Sans Pro':
                    setLoadFonts('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700'), setFontStyle('Source Sans Pro')
                    break
                case 'Raleway':
                    setLoadFonts('https://fonts.googleapis.com/css?family=Raleway:300,400,700'), setFontStyle('Raleway')
                    break
                case 'Montserrat':
                    setLoadFonts('https://fonts.googleapis.com/css?family=Montserrat:300,400,700'), setFontStyle('Montserrat')
                    break
                case 'Open Sans':
                    setLoadFonts('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700'), setFontStyle('Open Sans')
                    break
                case 'Roboto':
                    setLoadFonts('https://fonts.googleapis.com/css?family=Roboto:300,400,700'), setFontStyle('Roboto')
                    break
                case 'Playfair Display':
                    setLoadFonts('https://fonts.googleapis.com/css?family=Playfair+Display:300,400,700'), setFontStyle('Playfair Display')
                    break
            }

            switch (atob(query.qrcard_qrcode_type)) {
                case 'invitation_code':
                    setQrCodeType('1234')
                    break
                case 'invitation_link':
                    setQrCodeType('testingwedding.wedew.id/123456')
                    break
                case 'website_link':
                    setQrCodeType('testingwedding.wedew.id')
                    break
            }
            switch (atob(query.qrcard_link_footer)) {
                case 'none':
                    setLinkStatus('none')
                    break
                case 'invitation':
                    setLinkStatus('testingwedding.wedew.id/123456')
                    break
                case 'website':
                    setLinkStatus('testingwedding.wedew.id')
                    break
            }
        }
    }, [props])


    return (
        <>
            <Head>
                <link href={loadFonts} rel="stylesheet"></link>
                <style>
                    {`
                        body,
                        h1, h2, h3, h4, h5, h6,
                        .h1, .h2, .h3, .h4, .h5, .h6 {
                            font-family: '${fontStyle}' !important;
                        }
                    `}
                </style>
            </Head>
            <div id="qr_preview">
                <div className="bg-gradient-primary h-100">
                    <div className="h-100 d-flex flex-column justify-content-center p-2" style={{ backgroundColor: backgroundColor, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
                        <div className="p-2 bg-white text-center" style={{ borderRadius: 8 }}>
                            <h5 style={{ fontSize: '.859375rem', fontWeight: 700 }}>John Doe</h5>
                            <div className="position-relative">
                                <QRCode value={qrCodeType} style={{ maxWidth: '100%', height: '100%' }} />
                                <div className="bg-white position-absolute d-flex align-items-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 50, height: 40 }}>
                                    <Image src="/images/logo-icon.svg" width={40} height={40} alt="logo qrcode" className="w-100 p-1" />
                                </div>
                            </div>
                            <div style={{ fontSize: '1rem' }}>123456</div>
                        </div>
                        {
                            (showVip)
                                ?
                                <div style={{ marginTop: -11, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Image width={70} height={11} alt="vip logo" src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMTQwIDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMCAxMkMwIDUuMzcyNTggNS4zNzI1OCAwIDEyIDBIMTI4QzEzNC42MjcgMCAxNDAgNS4zNzI1OCAxNDAgMTJWMjRIMFYxMloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcikiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi40MDM4IDE2LjEwNThMMTIuMDUyIDE4LjM5MzdMMTIuODgzMSAxMy41NDc4TDkuMzYyMzcgMTAuMTE1OUwxNC4yMjc5IDkuNDA4OTNMMTYuNDAzOCA1TDE4LjU3OTggOS40MDg5M0wyMy40NDUzIDEwLjExNTlMMTkuOTI0NiAxMy41NDc4TDIwLjc1NTcgMTguMzkzN0wxNi40MDM4IDE2LjEwNThaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyMi43NSAxNi4xMDU4TDExOC4zOTggMTguMzkzN0wxMTkuMjI5IDEzLjU0NzhMMTE1LjcwOSAxMC4xMTU5TDEyMC41NzQgOS40MDg5M0wxMjIuNzUgNUwxMjQuOTI2IDkuNDA4OTNMMTI5Ljc5MiAxMC4xMTU5TDEyNi4yNzEgMTMuNTQ3OEwxMjcuMTAyIDE4LjM5MzdMMTIyLjc1IDE2LjEwNThaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNNTMuOTkyMSAxOS4wNDMxSDU3LjgwNDRMNjIuMDI1OSA1SDU4Ljc5NTJMNTcuMTM2NyAxMS41NDc3QzU2LjcyNzUgMTMuMDc2OSA1Ni40MjU5IDE0LjQ5ODUgNTYuMDE2NyAxNi4wNDkySDU1LjkzMDZDNTUuNDk5OCAxNC40OTg1IDU1LjIxOTggMTMuMDc2OSA1NC43ODkgMTEuNTQ3N0w1My4xMDkgNUg0OS43NDlMNTMuOTkyMSAxOS4wNDMxWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTY3LjU2NDkgMTkuMDQzMUg3MC43MzFWNUg2Ny41NjQ5VjE5LjA0MzFaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNNzguMDgxNyAxOS4wNDMxSDgxLjI0NzhWMTQuMjgzMUg4Mi45OTI1Qzg1Ljk2NDggMTQuMjgzMSA4OC40ODQ4IDEyLjgxODUgODguNDg0OCA5LjUyMzA4Qzg4LjQ4NDggNi4xMiA4NS45ODYzIDUgODIuOTA2MyA1SDc4LjA4MTdWMTkuMDQzMVpNODEuMjQ3OCAxMS43NjMxVjcuNTJIODIuNzEyNUM4NC40MzU1IDcuNTIgODUuMzgzMiA4LjA1ODQ2IDg1LjM4MzIgOS41MjMwOEM4NS4zODMyIDEwLjk4NzcgODQuNTQzMiAxMS43NjMxIDgyLjc5ODYgMTEuNzYzMUg4MS4yNDc4WiIgZmlsbD0iYmxhY2siLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjAiIHkxPSIwIiB4Mj0iMTMxLjI5OCIgeTI9IjQ3Ljg2OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjREZCODJDIi8+CjxzdG9wIG9mZnNldD0iMC4wMzEyNSIgc3RvcC1jb2xvcj0iI0ZGRTM4MSIvPgo8c3RvcCBvZmZzZXQ9IjAuMzA3MjkyIiBzdG9wLWNvbG9yPSIjRUNDOTREIi8+CjxzdG9wIG9mZnNldD0iMC4zOTU4MzMiIHN0b3AtY29sb3I9IiNGRkUzODEiLz4KPHN0b3Agb2Zmc2V0PSIwLjU0MTY2NyIgc3RvcC1jb2xvcj0iI0VDQzk0RCIvPgo8c3RvcCBvZmZzZXQ9IjAuNzc2MDQyIiBzdG9wLWNvbG9yPSIjRkZFMzgxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0VDQzk0RCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=' />
                                </div>
                                : null
                        }
                        <div className="text-white">
                            <div className="m-2" style={{ color: textColor, fontSize: 10.5 }}>
                                {qrText}
                            </div>
                            {
                                (linkStatus === 'none') ? null :
                                    <div className="m-2 font-weight-bold text-truncate" style={{ color: linkColor, fontSize: 10.2 }}>
                                        {linkStatus}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Qrcode.getInitialProps = async ctx => {
    return { query: ctx.query };
};

export default Qrcode;