document.addEventListener('DOMContentLoaded', () => {
    const houseList = document.getElementById('houseList');
    const searchInput = document.getElementById('search');
    const saveBtn = document.getElementById('saveBtn');
    let map, markers = [];

    function initMap() {
        map = L.map('map').setView([65.6841, -18.1105], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    function addMarkers(houses) {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        const smallIcon = new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [12, 20], // Adjust these values to change the size
            iconAnchor: [6, 20],
            popupAnchor: [1, -17],
            shadowSize: [20, 20]
        });

        houses.forEach(house => {
            const marker = L.marker([house.latitude, house.longitude], { draggable: true, icon: smallIcon }).addTo(map);
            marker.bindPopup(`<b>${house.street} ${house.housenumber}</b><br><a href="${house.url}" target="_blank">Hlekkur</a>`); // Only address, number and link
            marker.houseId = house.id;
            marker.on('click', () => highlightMarker(house.id)); // Select house from list on pin click
            markers.push(marker);
        });
    }

    function highlightMarker(houseId) {
        markers.forEach(marker => {
            if (marker.houseId === houseId) {
                marker.openPopup();
                map.setView(marker.getLatLng(), 15);
                marker.setIcon(new L.Icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                    iconSize: [25, 41], // Adjust these values to change the highlighted size
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                }));
            } else {
                marker.closePopup();
                marker.setIcon(new L.Icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    iconSize: [12, 20], // Adjust these values to change the size
                    iconAnchor: [6, 20],
                    popupAnchor: [1, -17],
                    shadowSize: [20, 20]
                }));
            }
        });
    }

    function fetchHouses() {
        fetch('/api/houses')
            .then(response => response.json())
            .then(data => {
                houseList.innerHTML = '';
                data.data.forEach(house => {
                    const li = document.createElement('li');
                    li.innerHTML = `${house.street} ${house.housenumber} 
                    <a href="${house.url}" target="_blank">Hlekkur</a>`;
                    li.dataset.id = house.id;
                    li.addEventListener('click', () => highlightMarker(house.id));
                    houseList.appendChild(li);
                });

                addMarkers(data.data);
            })
            .catch(error => {
                console.error('Villa:', error);
                alert('Villa við að sækja hús');
            });
    }

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        document.querySelectorAll('#houseList li').forEach((house) => {
            const text = house.textContent.toLowerCase();
            house.style.display = text.includes(searchValue) ? '' : 'none';
        });
    });

    saveBtn.addEventListener('click', () => {
        const updates = markers.map(marker => ({
            id: marker.houseId,
            latitude: marker.getLatLng().lat,
            longitude: marker.getLatLng().lng
        }));

        fetch('/api/houses', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ updates })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success') {
                alert('Breytingar vistaðar');
                fetchHouses();
            } else {
                alert('Villa við að vista breytingar');
            }
        })
        .catch(error => {
            console.error('Villa:', error);
            alert('Villa við að vista breytingar');
        });
    });

    initMap();
    fetchHouses();
});
