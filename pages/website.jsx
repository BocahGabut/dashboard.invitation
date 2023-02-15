import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";

import {
    closestCenter, DndContext, KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import Hero from "../Components/module/template/hero";
// import ListItems from '../Components/Utils/ListItem';

const ListItems = dynamic(() => import('../Components/Utils/ListItem'), { ssr: false })
const IconsI = dynamic(() => import('../Components/Utils/Icons'), { ssr: false })

const Website = () => {
    const [items, setItems] = useState([{ id: 1, children: <Hero />,open:true }]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <>
            <div id="website-editor">
                <div className="flex-nowrap bg-white overflow-hidden no-gutters row" style={{ height: '100vh' }}>
                    <div className="col-12 col-md-auto" style={{ width: 480, paddingLeft: 0, paddingRight: 0 }}>
                        <div className="d-flex flex-column" style={{ height: '100vh' }}>
                            <div className="bg-white text-reset p-3 position-sticky">
                                <div className="no-gutters align-items-center row">
                                    <div className="col-auto">
                                        <Link href='/' className="p-1 mr-3 d-block">
                                            <IconsI icons='fa fa-arrow-left fa-fw fa-lg' />
                                        </Link>
                                    </div>
                                    <div className="col">
                                        <h1 className="h3 mb-0">Ubah Tampilan</h1>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-outline-info">
                                            <IconsI icons='fa fa-fw fa-check mr-3' />
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav nav-pills animation-nav nav-justified gap-2 mb-3 px-4" role="tablist">
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link active d-flex flex-column" data-bs-toggle="tab" href="#animation-home" role="tab">
                                        <IconsI icons='fa-regular fa-layer-group fa-lg mb-2' />
                                        Susunan
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link d-flex flex-column" data-bs-toggle="tab" href="#animation-profile" role="tab">
                                        <IconsI icons='fa-regular fa-palette fa-lg mb-2' />
                                        Tema
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link d-flex flex-column" data-bs-toggle="tab" href="#animation-messages" role="tab">
                                        <IconsI icons='fa-regular fa-images fa-lg mb-2' />
                                        Media
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link d-flex flex-column" data-bs-toggle="tab" href="#animation-settings" role="tab">
                                        <IconsI icons='fa-regular fa-cog fa-lg mb-2' />
                                        Pengaturan
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content text-muted" style={{ overflowY: 'auto' }}>
                                <div className="tab-pane active w-100" id="animation-home" role="tabpanel">
                                    <div className="website-block-list accordion custom-accordionwithicon-plus" id="accordionWithplusicon">
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={handleDragEnd}
                                            activationConstraint={{
                                                delay: 250,
                                                tolerance: 5,
                                            }}
                                        >
                                            <SortableContext
                                                items={items}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {
                                                    items.map((item, key) => {
                                                        return (
                                                            <ListItems key={item.id} id={item.id} open={item.open}>
                                                                {
                                                                    item.children
                                                                }
                                                            </ListItems>
                                                        )
                                                    })
                                                }
                                            </SortableContext>
                                        </DndContext>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="website-preview col-12 col-md bg-gradient-dark text-white overflow-hidden d-flex flex-column">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Website