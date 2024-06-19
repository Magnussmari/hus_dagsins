document.addEventListener('DOMContentLoaded', () => {
    const houseList = document.getElementById('houseList');
    const searchInput = document.getElementById('search');
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
            const marker = L.marker([house.latitude, house.longitude], { icon: smallIcon }).addTo(map);
            marker.bindPopup(`<b>${house.street} ${house.housenumber}</b><br><a href="${house.url}" target="_blank">Hlekkur</a>`); // Only address, number and link
            marker.houseId = house.id;
            markers.push(marker);
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

    initMap();
    fetchHouses();
});
