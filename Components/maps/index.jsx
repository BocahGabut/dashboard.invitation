import React from "react";

import { OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
import Head from "next/head";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

const searchControl = new SearchControl({
    provider: new OpenStreetMapProvider(),
    style: 'bar',
});

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

const Maps = () => {

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"
                />
            </Head>
            <div className="container-maps">
                <MapContainer
                    center={{ lat: 51.505, lng: -0.09 }}
                    zoom={13}
                    scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                    <LocationMarker />
                </MapContainer>
            </div>
        </>
    )
}

export default Maps