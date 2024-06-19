document.addEventListener('DOMContentLoaded', () => {
    const houseList = document.getElementById('houseList');
    const searchInput = document.getElementById('search');
    const houseCount = document.getElementById('houseCount');
    let map, markers = [];

    function initMap() {
        // Adjusted coordinates and zoom level to show the entire map of Iceland
        map = L.map('map').setView([64.9631, -19.0208], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }

    function createIcon(size) {
        return new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [size, size * 1.5], // Adjust these values to change the size
            iconAnchor: [size / 2, size * 1.5],
            popupAnchor: [1, -size * 1.5 + 1],
            shadowSize: [size, size]
        });
    }

    function addMarkers(houses) {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        houses.forEach(house => {
            const marker = L.marker([house.latitude, house.longitude], { icon: createIcon(12) }).addTo(map);
            marker.bindPopup(`<b>${house.street} ${house.housenumber}</b><br><a href="${house.url}" target="_blank">Hlekkur</a>`); // Only address, number and link
            marker.houseId = house.id;
            marker.on('click', () => {
                highlightMarker(house.id);
            });
            markers.push(marker);
        });
    }

    function fetchHouses() {
        fetch('/api/houses')
            .then(response => response.json())
            .then(data => {
                houseList.innerHTML = '';

                // Update house count
                const houseCountText = `Fjöldi skráðra húsa: ${data.data.length}`;
                houseCount.textContent = houseCountText;

                data.data.forEach(house => {
                    const li = document.createElement('li');
                    li.innerHTML = `${house.street} ${house.housenumber} 
                    <a href="${house.url}" target="_blank">Hlekkur</a>`;
                    li.dataset.houseId = house.id;
                    li.addEventListener('click', () => {
                        highlightMarker(house.id);
                    });
                    houseList.appendChild(li);
                });

                addMarkers(data.data);
            })
            .catch(error => {
                console.error('Villa:', error);
                alert('Villa við að sækja hús');
            });
    }

    function highlightMarker(houseId) {
        markers.forEach(marker => {
            if (marker.houseId === houseId) {
                marker.setIcon(createIcon(18)); // Make the selected marker larger
                marker.openPopup();
                map.setView(marker.getLatLng(), 15);
            } else {
                marker.setIcon(createIcon(12)); // Reset the size of other markers
            }
        });

        const houseItems = houseList.querySelectorAll('li');
        houseItems.forEach(item => {
            if (parseInt(item.dataset.houseId, 10) === houseId) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                item.style.backgroundColor = '#e6f7ff';
            } else {
                item.style.backgroundColor = '';
            }
        });
    }

    function selectHouseFromList(houseId) {
        const houseItems = houseList.querySelectorAll('li');
        houseItems.forEach(item => {
            if (parseInt(item.dataset.houseId, 10) === houseId) {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                item.style.backgroundColor = '#e6f7ff';
            } else {
                item.style.backgroundColor = '';
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        document.querySelectorAll('#houseList li').forEach((house) => {
            const text = house.textContent.toLowerCase();
            house.style.display = text.includes(searchValue) ? '' : 'none';
        });
    });

    initMap();
    fetchHouses();
});
