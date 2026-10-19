
const apiURL = 'http://localhost:3000/api/collect';

async function getArtists() {
    const response = await fetch(apiURL);
    const artists = await response.json();

    const artistList = document.getElementById('artistList');
    artistList.innerHTML = '';

    for (let i = 0; i < artists.length; i++) {
        const artist = document.createElement('div');
        artist.className = 'artist';

        const name = document.createElement('h3');
        name.textContent = artists[i].name;

        const album = document.createElement('p');
        album.textContent = 'Album: ' + artists[i].album;

        const song = document.createElement('p');
        song.textContent = 'Hit Song: ' + artists[i].hitSong;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() {
            editArtist(artists[i]);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.onclick = function() {
            deleteArtist(artists[i].id);
        };

        artist.appendChild(name);
        artist.appendChild(album);
        artist.appendChild(song);
        artist.appendChild(editBtn);
        artist.appendChild(deleteBtn);

        artistList.appendChild(artist);
    }
}

document.getElementById('artistForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const album = document.getElementById('album').value;
    const hitSong = document.getElementById('hitSong').value;

    const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            album: album,
            hitSong: hitSong
        })
    });

    if (response.ok) {
        document.getElementById('artistForm').reset();
        getArtists();
    } else {
        alert('Could not add artist.');
    }
});

async function editArtist(artist) {
    const name = prompt('Artist Name:', artist.name);
    if (name === null) return;

    const album = prompt('Album:', artist.album);
    if (album === null) return;

    const hitSong = prompt('Hit Song:', artist.hitSong);
    if (hitSong === null) return;

    const response = await fetch(apiURL + '/' + artist.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            album: album,
            hitSong: hitSong
        })
    });

    if (response.ok) {
        getArtists();
    } else {
        alert('Could not update artist.');
    }
}

async function deleteArtist(id) {
    if (!confirm('Are you sure you want to delete this artist?')) {
        return;
    }

    const response = await fetch(apiURL + '/' + id, {
        method: 'DELETE'
    });

    if (response.ok) {
        getArtists();
    } else {
        alert('Could not delete artist.');
    }
}

getArtists();
