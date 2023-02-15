import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

import useDebouncedValue from "../../Context/hooks/useDebouncedValue";

import { getSticker } from "../../Context/InputImageContext";
const IconsI = dynamic(() => import('./Icons'), { ssr: false })

const InputImage = ({ style, placeHolder }) => {
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false)

    const [sticker, setSticker] = useState([]);

    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebouncedValue(inputValue, 500, (e) => {
        // logic here
        if (e !== '') {
            // console.log(data)
            const fetchData = async () => {
                try {
                    const data = await getSticker(e, 0)
                    setSticker(data.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
        console.log(e)
    });

    const nextSticker = async () => {
        try {
            const data = await getSticker(inputValue, sticker.length)
            setSticker(sticker.concat(data.data))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-flex flex-row flex-wrap">
                <button type="button" className="btn text-decoration-none" style={{ padding: 0 }} onClick={() => setOpenModal(true)}>
                    <div className="m-2 p-1 position-relative shadow-sm">
                        <div className="bg-light text-muted p-2 d-flex flex-column justify-content-center align-items-center" style={style}>
                            <IconsI icons='fa-sharp fa-solid fa-plus' style={{ fontSize: 24 }} />
                            {
                                (placeHolder) ? placeHolder : 'Pilih Gambar'
                            }
                        </div>
                    </div>
                </button>
            </div>
            <Modal
                show={openModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="md"
                centered
            >
                <Modal.Header closeButton style={{ padding: '1rem 1.25rem' }}>
                    <Modal.Title>Pilih Gambar</Modal.Title>
                </Modal.Header>
                <div className="bg-light px-1 pt-3">
                    <ul className="nav nav-tabs nav-image" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link " data-bs-toggle="tab" href="#upload" role="tab" aria-selected="false">
                                <IconsI icons='fa-regular fa-upload mr-2' />
                                Upload
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#sticker" role="tab" aria-selected="false">
                                <IconsI icons='fa-regular fa-icons mr-2' />
                                Sticker
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#unplash" role="tab" aria-selected="false">
                                <IconsI icons='fab fa-fw fa-unsplash mr-2' />
                                Unsplash
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#url" role="tab" aria-selected="false">
                                <IconsI icons='fa-regular fa-link mr-2' />
                                Url
                            </a>
                        </li>
                    </ul>
                </div>
                <Modal.Body style={{ overflow: 'auto', maxHeight: '60vh' }}>
                    <div className="tab-content  text-muted">
                        <div className="tab-pane" id="upload" role="tabpanel">

                        </div>
                        <div className="tab-pane active" id="sticker" role="tabpanel">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>
                                        Kata Kunci
                                    </label>
                                    <input onChange={(e) => setInputValue(e.target.value)} type="text" required placeholder="Contoh: flower, beach, sun, ..." className="form-control" />
                                    <Link href='https://giphy.com' className="mt-2" target='_blank'>
                                        <Image src='/images/giphy-logo.png' alt="Powered by GIPHY" height={13} width={85} />
                                    </Link>
                                </div>
                            </div>
                            {
                                (sticker.length > 0)
                                    ?
                                    <div className="p-1 mt-4 bg-gradient-dark">
                                        <div className="__grid--masonry" style={{ '--grid-gap': '0.5em', '--col-width': 'minmax(Min(120px, 100%), 1fr)' }}>
                                            {
                                                sticker.map((stick, index) => {
                                                    return (
                                                        <div className="giphy-image-item" key={index}>
                                                            <img src={stick.images.preview_gif.url} alt={stick.title} className="img-fluid w-100" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="text-center py-4">
                                            <button className="btn btn-outline-light" onClick={() => nextSticker()}>
                                                Selanjutnya
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="px-5 py-5 mt-4 bg-gradient-dark text-center text-white">
                                        <div className="my-4">
                                            {/* <IconsI icons='fa fa-icons fa-fw fa-4x' /> */}
                                        </div>
                                        <p>
                                            Cari sticker menarik secara gratis di internet.
                                            <br />
                                            <small>
                                                Powered by
                                                <Link href="https://giphy.com?utm_source=bocahgabut&amp;utm_medium=referral" target="_blank" >
                                                    <strong className="text-underline text-white">
                                                        GIPHY
                                                    </strong>
                                                </Link>
                                                .
                                            </small>
                                        </p>
                                    </div>
                            }
                        </div>
                        <div className="tab-pane" id="unplash" role="tabpanel">

                        </div>
                        <div className="tab-pane" id="url" role="tabpanel">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                        </div>
                        {/* <div className="col-md-12 mt-3">
                            <button type="button" className="btn btn-soft-secondary form-control">
                                Pilih
                            </button>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer className="pt-4">
                    <button className="btn btn-outline-info mr-3">
                        Simpan
                    </button>
                    <button className="btn btn-light">
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default InputImage