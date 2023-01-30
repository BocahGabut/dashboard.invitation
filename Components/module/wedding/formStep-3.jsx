import dynamic from "next/dynamic";
import React, { useState } from "react";
import { convertDateToString } from "../../../Services/utils";

import FormEventDay from "./form-event-day";

const IconsI = dynamic(() => import('../../Utils/Icons'), { ssr: false })

const FormStep3 = ({ propsData }) => {
    const [addEvents, setaddEvents] = useState(false)
    console.log(propsData)

    // const createDay = () => {

    // }

    return (
        <>
            <form id="0b2c308432d8ff94f2510e81f47f06f3">
                <div>
                    <div className="row mt-6">
                        <div className="col-md-12">
                            <div className="text-center">
                                <h2>Tentukan Rangkaian Acara</h2>
                                <span>
                                    Informasi ini akan sangat membantu tamu. Jika masih belum pasti nanti masih bisa diubah kok.
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12 mt-6">
                            {
                                propsData.map((events, index) => {
                                    return (
                                        <div className="card" key={index}>
                                            <div className="card-body">
                                                <div className="row no-gutters">
                                                    <div className="col d-flex align-items-center">
                                                        <h5 className="">{ convertDateToString(events.date) }</h5>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="py-4">
                                                            <button className="btn btn-outline-info btn-sm mr-3">
                                                                <IconsI icons='fa-regular fa-edit' />
                                                            </button>
                                                            <button className="btn btn-outline-danger btn-sm">
                                                                <IconsI icons='fa-regular fa-trash' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-light text-reset" style={{ padding: '1.25rem' }}>
                                                    <div className="row">
                                                        {
                                                            events.details.map((details, index_details) => {
                                                                return (
                                                                    <div className="col-xl-6 mb-4" key={index_details}>
                                                                        <div className={`card h-100 ${(details.type === 1) ? 'border-success' : ''}`} style={{ borderWidth:`${(details.type === 1) ? '1px' : ''}` }}>
                                                                            <div className="card-body">
                                                                                <div className="row no-gutters">
                                                                                    <div className="col">
                                                                                        <h5 className={`d-flex align-items-center ${(details.type === 1) ? 'mt-3' : ''}`}>
                                                                                            {details.name}
                                                                                            {
                                                                                                (details.status === 1) ?
                                                                                                <span className="badge rounded-pill badge-outline-success ml-2">
                                                                                                    Ditampilkan
                                                                                                </span>
                                                                                                : ''
                                                                                            }
                                                                                        </h5>
                                                                                        {
                                                                                            (details.type === 1)
                                                                                                ?
                                                                                                <span className="badge badge-soft-success position-absolute" style={{ top: "-1rem", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                                                                                                    <IconsI icons='fa fa-fw fa-star' />
                                                                                                    Acara Utama
                                                                                                </span>
                                                                                                :''
                                                                                        }
                                                                                    </div>
                                                                                    <div className="col-auto">
                                                                                        <div className="">
                                                                                            <button className="btn btn-outline-info btn-sm mr-3">
                                                                                                <IconsI icons='fa-regular fa-edit' />
                                                                                            </button>
                                                                                            <button className="btn btn-outline-danger btn-sm">
                                                                                                <IconsI icons='fa-regular fa-trash' />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row no-gutters mt-6">
                                                                                    <div className="col-auto mr-2">
                                                                                        <IconsI icons='far fa-clock fa-fw' />
                                                                                    </div>
                                                                                    <div className="col">{ details.time_start } - { details.time_end }</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <button className="btn btn-outline-info mt-5" type="button" onClick={(e) => setaddEvents(true)}>
                                <IconsI icons='fa-regular fa-plus mr-3' />
                                Tambah Hari
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {
                (addEvents) ? <FormEventDay setaddEvents={setaddEvents} /> : ''
            }
        </>
    )
}

export default FormStep3