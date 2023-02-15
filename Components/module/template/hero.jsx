import dynamic from "next/dynamic";
import React from "react";
import InputImage from "../../Utils/InputImage";

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const Hero = () => {
    return (
        <>
            <ul className="nav nav-pills nav-info mb-3" role="tablist">
                <li className="nav-item waves-effect waves-light">
                    <button className="nav-link active btn-sm" style={{ padding: '.5rem .72rem' }} data-bs-toggle="tab" href="#konten" role="tab">
                        <IconsI icons='fa-light fa-pen-to-square mr-3' />
                        Konten
                    </button>
                </li>
                <li className="nav-item waves-effect waves-light">
                    <button className="nav-link btn-sm" style={{ padding: '.5rem .72rem' }} data-bs-toggle="tab" href="#background" role="tab">
                        <IconsI icons='fa-light fa-image mr-3' />
                        Background
                    </button>
                </li>
                <li className="nav-item waves-effect waves-light">
                    <button className="nav-link btn-sm" style={{ padding: '.5rem .72rem' }} data-bs-toggle="tab" href="#teks" role="tab">
                        <IconsI icons='fa-regular fa-text-size mr-3' />
                        Teks
                    </button>
                </li>
                <li className="nav-item waves-effect waves-light">
                    <button className="nav-link btn-sm" style={{ padding: '.5rem .72rem' }} data-bs-toggle="tab" href="#layout" role="tab">
                        <IconsI icons='fa-regular fa-table-layout mr-3' />
                        Layout
                    </button>
                </li>
                <li className="nav-item waves-effect waves-light">
                    <button className="nav-link btn-sm" style={{ padding: '.5rem .72rem' }} data-bs-toggle="tab" href="#pengaturan" role="tab">
                        <IconsI icons='fa-regular fa-gear mr-3' />
                        Pengaturan
                    </button>
                </li>
            </ul>
            <div className="tab-content text-muted pt-3">
                <div className="tab-pane active" id="konten" role="tabpanel">
                    <div className="row px-3">
                        <div className="col-md-12">
                            <label>
                                Logo
                            </label>
                            <InputImage style={{ width:100,height:100 }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero