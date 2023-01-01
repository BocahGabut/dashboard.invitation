import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useRef, useState } from "react";
import FormImage from "../../Components/form-image";
import Layout from "../../Components/Layout";

const Icons = dynamic(() => import('../../Components/Utils/Icons'), { ssr: false })
const Select = dynamic(() => import('react-select'), { ssr: false })

const Invitation = () => {
    const iframeRef = useRef();
    const [previewQr, setPreviewQr] = useState('/preview/invitation')

    const [fontSelected, setFontSelected] = useState('Source Sans Pro')

    const optionsColor = [
        { value: 'Source Sans Pro', label: 'Source Sans Pro' },
        { value: 'Raleway', label: 'Raleway' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Playfair Display', label: 'Playfair Display' },
    ]

    return (
        <>
            <Layout activeSidebar="settings">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card no-shadow border-border">
                            <div className="card-body py-6 px-6">
                                <div className="row">
                                    <div className="col-md-12 mb-5">
                                        <h5 style={{ fontSize: 22.3, fontWeight: 600, margin: 0, color: '#000' }}>
                                            E-invitation
                                        </h5>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-lg mb-15">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div>
                                                            <label>Gambar Cover</label>
                                                            <br />
                                                            <small className="text-muted">Gambar utama untuk e-invitation. Ukuran: 480 x 280 px</small>
                                                            <FormImage className='mt-4' taget_id="00fgg-012fh" width={340} height={240} />
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
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_has_overlay" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_has_overlay" style={{ display: 'flex', flexDirection: 'column' }}>
                                                                Tampilan Teks di Atas Gambar
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className={`collapse show`} id="collapseWithicon">
                                                            <div className="row">
                                                                <div className="col-md-12 mt-5">
                                                                    <div>
                                                                        <label>Teks</label>
                                                                        <input type='text' className="form-control" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mt-5">
                                                                    <div>
                                                                        <label>Teks Atas</label>
                                                                        <input type='text' className="form-control" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 mt-5">
                                                                    <div>
                                                                        <label>Teks Bawah</label>
                                                                        <input type='text' className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_show_event_name" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_show_event_name">
                                                                Tampilkan Nama Acara
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_show_event_time" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_show_event_time">
                                                                Tampilkan Waktu Acara
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_show_event_location" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_show_event_location">
                                                                Tampilkan Lokasi Acara
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div>
                                                            <label>Sapaan</label>
                                                            <input type='text' defaultValue='Yth' className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_show_vip" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_show_vip">
                                                                Tampilkan Tanda Tamu VIP
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div>
                                                            <label>Teks Pesan</label>
                                                            <textarea rows={3} placeholder="You're invited to our wedding day! Bring this card and scan the QR code for check-in at location." className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_show_qrcode" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_show_qrcode">
                                                                Tampilan Kode QR
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-5">
                                                        <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="switchInvitation_show_invitation_link" />
                                                            <label className="form-check-label" htmlFor="switchInvitation_show_invitation_link">
                                                                Tampilkan Link e-Invitation
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg text-center">
                                                <button className="btn btn-outline-primary mb-6" onClick={(e) => loadPreview()}>
                                                    <Icons icons='fa fa-fw fa-sync-alt mr-3' />
                                                    Lihat Perubahan
                                                </button>
                                                <div className="invitation-preview shadow">
                                                    <iframe ref={iframeRef} id="invitationPreview" src={previewQr} frameBorder="0" width={480} height={720} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-10 mb-7">
                                        <Link href='/settings' className="btn btn-light mr-3">
                                            Kembali
                                        </Link>
                                        <button className="btn btn-outline-info">
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

export default Invitation