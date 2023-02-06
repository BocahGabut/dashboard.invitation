import React, { useEffect, useState } from "react";

import L from "leaflet";

import { OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';

const MapsLeaflet = () => {
    const [positionY, setPositionY] = useState(-6.1753936);
    const [positionX, setPositionX] = useState(106.82718601871409);

    useEffect(() => {
            const searchControl = new SearchControl({
            notFoundMessage: 'Sorry, that address could not be found.',
            provider: new OpenStreetMapProvider(),
            style: 'bar',
        });

        var customMarker = L.icon({
            iconUrl: 'images/map-marker.png',
            shadowUrl: '',

            iconSize:     [30, 40], // size of the icon
            shadowSize:   [0, 0], // size of the shadow
            iconAnchor:   [17, 40], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        // Creating map options
         var mapOptions = {
            center: [positionY, positionX],
            // center: [Y Position, X Position],
             zoom: 15,
             scrollWheelZoom: true,
            icon: customMarker
        }


        var map = L.DomUtil.get("map");

        if (map != null) {
            map._leaflet_id = null;
            map = new L.map('map', mapOptions);

            map.remove()
        }

         // Creating a map object
         map = new L.map('map', mapOptions);

         // Creating a Layer object
         var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
         L.marker([positionY, positionX], {icon: customMarker}).addTo(map);

        // Adding layer to the map
        map.addLayer(layer);
        map.addControl(searchControl);

        const leaftletPane = document.querySelectorAll('.leaflet-pane.leaflet-map-pane')

        setTimeout(() => {
            if (leaftletPane.length > 1) {
                leaftletPane[1].remove()
                document.querySelectorAll('.leaflet-control-container')[1].remove()
                document.querySelectorAll('.leaflet-control-geosearch.leaflet-geosearch-bar')[1].remove()
            }
        }, 350)

        function searchEventHandler(result) {
            console.log(result);
            const location = result.location
            setPositionX(location.x)
            setPositionY(location.y)
        }

        map.on('geosearch/showlocation', searchEventHandler);
    }, [positionY,positionX]);
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default MapsLeaflet