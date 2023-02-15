import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import dynamic from "next/dynamic";
import Head from 'next/head';
import Image from 'next/image';
import React from "react";

const IconsI = dynamic(() => import('./Icons'), { ssr: false })

const ListItems = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
            <Head>
                <title>
                    Ubah Tampilan - BuyWedding
                </title>
            </Head>
            <div className="accordion-item" style={style} >
                <h2 className="accordion-header" style={{ display:'flex',alignItems:'center' }} id="accordionwithplusExample1">
                    <div className="pl-2">
                        <div className="d-inline-flex btn-group">
                            <div className="dropdown">
                                <button className="border-0 btn btn-outline-secondary btn-sm dropdown-toggle cst-list-item" data-bs-toggle="dropdown" aria-expanded="false">
                                    <IconsI icons='fa fa-ellipsis-v fa-fw' />
                                </button>
                                <div className="dropdown-menu">
                                    <button type='button' disabled className="dropdown-item py-3">
                                        Geser Ke Atas
                                    </button>
                                    <button type='button' className="dropdown-item py-3">
                                        Geser Ke Bawah
                                    </button>
                                    <button type='button' disabled className="dropdown-item py-3">
                                        Geser Ke Paling Atas
                                    </button>
                                    <button type='button' className="dropdown-item py-3">
                                        Geser Ke Paling Bawah
                                    </button>
                                    <div className="dropdown-divider" />
                                    <button type='button' className="dropdown-item py-3 text-danger">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button ref={setNodeRef} {...attributes} {...listeners} tabIndex={-1} className="accordion-button" style={{ paddingLeft:0 }} type="button" data-bs-toggle="collapse" data-bs-target={`#data-bs-${props.id}`} aria-expanded="true" aria-controls={`data-bs-${props.id}`}>
                        <div className="flex-grow-1 header-collapse">
                            <div className="align-items-center no-gutters row">
                                <div className="col-auto">
                                    <Image src='/images/block-hero.svg' alt="" width={60} height={40} />
                                </div>
                                <div className="col ml-2">
                                    Hero
                                </div>
                                <div className="col-auto mx-2">
                                    <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchIs_map_shown" tabIndex={2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id={`data-bs-${props.id}`} className={`accordion-collapse collapse ${(props.open) ? ((props.open) ? 'show' : '') : ''}`} aria-labelledby="accordionwithplusExample1" data-bs-parent="#accordionWithplusicon">
                    <div className="accordion-body" style={{ padding:'0.2rem 0.4rem' }}>
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
            {/* <div className="website-block-item" style={style} ref={setNodeRef} {...attributes} {...listeners}>
                <div className="d-flex align-items-center p-0 card-header" onClick={() => {setCollapse(!collapse),console.log('aaa')}}>
                    <div className="pl-2">
                        <div className="d-inline-flex btn-group">
                            <button className="border-0 btn btn-outline-secondary btn-sm">
                                <IconsI icons='fa fa-ellipsis-v fa-fw' />
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow-1 py-2 header-collapse">
                        <div className="align-items-center no-gutters row">
                            <div className="col-auto">
                                <Image src='/images/block-hero.svg' alt="" width={60} height={40} />
                            </div>
                            <div className="col ml-2">
                                Hero
                            </div>
                            <div className="col-auto mx-2">
                                <div className="form-check form-switch form-switch-custom form-switch-lg form-switch-success">
                                    <input className="form-check-input" type="checkbox" role="switch" id="switchIs_map_shown" />
                                </div>
                            </div>
                            <div className="col-auto mr-3">
                                <IconsI icons='fa fa-chevron-right fa-fw' />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="d-flex w-100">
                        {
                            (!collapse) ? '' :
                                <>
                                    {
                                        props.children
                                    }
                                </>
                        }
                    </div>
            </div> */}
        </>
    )
}

export default ListItems