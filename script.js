const savedLat = localStorage.getItem("lastLat");
const savedLng = localStorage.getItem("lastLng");

const initialLat = savedLat ? parseFloat(savedLat) : 23.0225;
const initialLng = savedLng ? parseFloat(savedLng) : 72.5714;

var map = L.map('map').setView([initialLat, initialLng], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function goToCoordinates() {
    let lat_input = document.getElementById("lat").value
    let long_input = document.getElementById("lng").value

    const lat = parseFloat(lat_input);
    const lng = parseFloat(long_input);

    localStorage.setItem("lastLat", lat);
    localStorage.setItem("lastLng", lng);

    map.setView([lat, lng], 8);
}

const markers = L.markerClusterGroup();

function fetchHotelsInBounds() {
    const bounds = map.getBounds();
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    const query = `
    [out:json][timeout:25];
    (
      node["tourism"~"hotel|guest_house|hostel|motel"]
      (${south},${west},${north},${east});
    );
    out;
  `;

    fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query
    })
        .then(res => res.json())
        .then(data => {
            markers.clearLayers(); // Clear old markers
            if (!data.elements.length) {
                console.log("No hotels found in bounds.");
                return;
            }

            data.elements.forEach(place => {
                if (!place.tags || !place.tags.name) return; // Skip unnamed hotels

                const { name } = place.tags;
                const street = place.tags["addr:street"] || "";
                const city = place.tags["addr:city"] || "";
                const state = place.tags["addr:state"] || "";
                const country = place.tags["addr:country"] || "";

                const address = [street, city, state, country].filter(Boolean).join(", ");

                const popupContent = `
        <div style="max-width: 250px;">
            <h3 style="margin: 5px 0;">${name}</h3>
            <p style="margin: 0;"><b>Address:</b> ${address || "Not available"}</p>
        </div>
    `;

                const marker = L.marker([place.lat, place.lon]).bindPopup(popupContent);
                markers.addLayer(marker);
            });


            // data.elements.forEach(place => {
            //     if (!place.tags || !place.tags.name) return; // for skipping unnamed hotels

            //     const marker = L.marker([place.lat, place.lon])
            //         .bindPopup(`<b>${place.tags.name}</b>`);
            //     markers.addLayer(marker);
            // });

            map.addLayer(markers);
        })
        .catch(err => console.error("Overpass API error:", err));
}

map.on('moveend', fetchHotelsInBounds);

// Initial load
fetchHotelsInBounds();



// fetch('hotels.json')
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(hotel => {
//             const marker = L.marker([hotel.lat, hotel.lng])
//                 .bindPopup(`<b>${hotel.name}</b>`);
//             markers.addLayer(marker);
//         });

//         map.addLayer(markers);
//     });

