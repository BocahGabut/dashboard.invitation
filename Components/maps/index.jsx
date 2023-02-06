import React, { useEffect, useState } from 'react';

const Maps = ({ getPlaces, onClick, defaultCenter }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function initAutocomplete() {
            // The map, centered at Uluru
            const center = (defaultCenter) ? defaultCenter : { lat: -6.1752483965250216, lng: 106.82716353036908 }

            const map = new google.maps.Map(document.getElementById("map"), {
                center: center,
                zoom: 13,
                mapTypeId: "roadmap",
                disableDefaultUI: true,
            });

            if (defaultCenter) {
                const icon = {
                    url: '/images/map-marker.png',
                    // url: place.icon,
                    size: new google.maps.Size(30, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(30, 40),
                };
                new google.maps.Marker({
                    map,
                    icon,
                    title: '',
                    position: defaultCenter,
                    animation: google.maps.Animation.DROP
                })
            }

            const input = document.getElementById("pac-input");
            const searchBox = new google.maps.places.SearchBox(input);

            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });

            let markers = [];

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                const bounds = new google.maps.LatLngBounds();

                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    const icon = {
                        url: '/images/map-marker.png',
                        // url: place.icon,
                        size: new google.maps.Size(30, 40),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(30, 40),
                    };

                    if (getPlaces) getPlaces(place)
                    // Create a marker for each place.
                    markers.push(
                        new google.maps.Marker({
                            map,
                            icon,
                            title: place.name,
                            position: place.geometry.location,
                            animation: google.maps.Animation.DROP
                        })
                    );
                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
            map.addListener('click', (event) => {
                const icon = {
                    url: '/images/map-marker.png',
                    // url: place.icon,
                    size: new google.maps.Size(30, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(30, 40),
                };
                if (onClick) onClick(event)
                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];
                markers.push(
                    new google.maps.Marker({
                        map,
                        icon,
                        position: event.latLng,
                        animation: google.maps.Animation.DROP
                    })
                );
            })
            setLoading(false)
        }

        if (window.google) {
            initAutocomplete();
        }

        // kode ini akan memastikan bahwa initAutocomplete selalu dipanggil
        // saat komponen di-mount, meskipun window.google sudah terdefinisi
        return () => {
            window.initAutocomplete = undefined;
        };
    }, [loading]);
    return (
        <>
            <div className="container-map">
                <div id='pac-box' className='w-100 p-3' style={{ position: 'absolute', left: 0, top: 0, zIndex: 99 }}>
                    <input
                        id="pac-input"
                        className="controls"
                        type="text"
                        placeholder="Cari Lokasi..."
                    />
                </div>
                <div id="map" style={{ width: '100%', height: 320 }} />
            </div>
            {/* <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVeLGFORO5so3kaKIwAmfAH9s-9NKbDVs&callback=initAutocomplete&libraries=places&v=weekly" async defer /> */}
        </>
    )
}

export default Maps