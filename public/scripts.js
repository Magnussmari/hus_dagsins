document.addEventListener('DOMContentLoaded', () => {
    const houseForm = document.getElementById('houseForm');
    const houseList = document.getElementById('houseList');
    const searchInput = document.getElementById('search');
    const houseCount = document.getElementById('houseCount');

    houseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const street = document.getElementById('street').value;
        const housenumber = document.getElementById('housenumber').value;
        const postcode = document.getElementById('postcode').value;
        const town = document.getElementById('town').value;
        const url = document.getElementById('url').value;
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        fetch('/api/houses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ street, housenumber, postcode, town, url, latitude, longitude })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success') {
                fetchHouses();
                houseForm.reset(); // Clear form after successful submission
            } else {
                alert('Villa við að bæta húsi');
            }
        });
    });

    houseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('Ertu viss um að þú viljir eyða þessu húsi?')) {
                fetch(`/api/houses/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'deleted') {
                        fetchHouses();
                    } else {
                        alert('Villa við að eyða húsi');
                    }
                })
                .catch(error => {
                    console.error('Villa:', error);
                    alert('Villa við að eyða húsi');
                });
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        document.querySelectorAll('#houseList tr').forEach((house) => {
            const text = house.textContent.toLowerCase();
            house.style.display = text.includes(searchValue) ? '' : 'none';
        });
    });

    function fetchHouses() {
        fetch('/api/houses')
            .then(response => response.json())
            .then(data => {
                houseList.innerHTML = '';
                data.data.forEach(house => {
                    const tr = document.createElement('tr');

                    const streetTd = document.createElement('td');
                    streetTd.textContent = house.street;
                    tr.appendChild(streetTd);

                    const numberTd = document.createElement('td');
                    numberTd.textContent = house.housenumber;
                    tr.appendChild(numberTd);

                    const postcodeTd = document.createElement('td');
                    postcodeTd.textContent = house.postcode;
                    tr.appendChild(postcodeTd);

                    const townTd = document.createElement('td');
                    townTd.textContent = house.town;
                    tr.appendChild(townTd);

                    const coordinatesTd = document.createElement('td');
                    coordinatesTd.textContent = `${house.latitude}, ${house.longitude}`;
                    tr.appendChild(coordinatesTd);

                    const linkTd = document.createElement('td');
                    const houseLink = document.createElement('a');
                    houseLink.href = house.url;
                    houseLink.textContent = 'Hlekkur';
                    houseLink.target = "_blank"; // Open link in new tab
                    linkTd.appendChild(houseLink);
                    tr.appendChild(linkTd);

                    const actionTd = document.createElement('td');
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Eyða';
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.dataset.id = house.id;
                    actionTd.appendChild(deleteBtn);
                    tr.appendChild(actionTd);

                    houseList.appendChild(tr);
                });

                // Update house count
                houseCount.textContent = data.data.length;
            })
            .catch(error => {
                console.error('Villa:', error);
                alert('Villa við að sækja hús');
            });
    }

    fetchHouses();
});
