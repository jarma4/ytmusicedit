function getPlayLists() {
	fetch('/playlists')
	.then(response => response.json())
	.then(response => {
		let newDiv;
		const playlistArea = document.getElementById('playlistArea');
		Object.keys(response).forEach(key => {
			newDiv = document.createElement('div');
			newDiv.className = 'playlist';
			newDiv.id = response[key];
			newDiv.appendChild(document.createTextNode(key));
			newDiv.addEventListener('click', event => {
				getSongs(response[key]);
			});
			playlistArea.appendChild(newDiv);
		});
	});
}

function getSongs(playlistId){
	fetch('/songs', {
      'method':'POST',
		'body': JSON.stringify({'playlistId': playlistId})
	})
	.then(response => response.json())
	.then(response => {
		let newDiv;
		clearArea('songsArea');
		const songsArea = document.getElementById('songsArea');
		let outp = '<table>';
		response.tracks.forEach((track, index) => {
			outp += '<tr><td>'+track.title+'</td><td>'+track.artists[0].name+'</td><td>'+((track.album)?track.album.name:'')+'</td><td>'+((track.duration)?track.duration:'')+'</td><td><input type="checkbox" playlistId="'+playlistId+'" setVideoId="'+track.setVideoId+'" videoId="'+track.videoId+'" class="checkbox"></td></tr>';
			// newDiv = document.createElement('div');
			// newDiv.className = 'song';
			// newDiv.id = track.title;
			// newDiv.appendChild(document.createTextNode(track.title));
			// songsArea.appendChild(newDiv);
		});
		outp += '</table>';
		songsArea.innerHTML = outp;
	});
}

function clearArea(areaId) {
	document.getElementById(areaId).innerHTML = '';
}

function showModal (message){
	document.getElementById('modalMessage').innerText = message;
	document.getElementById('modal').style.display = 'block';
}

window.onload = () => {
	document.getElementById('action').addEventListener('click', event => {
		let playlistId, videoIds = [], setVideoIds = [];
		document.querySelectorAll('.checkbox').forEach(checkbox => {
			if (checkbox.checked) {
				videoIds.push(checkbox.getAttribute('videoId'));
				setVideoIds.push(checkbox.getAttribute('setVideoId'));
				playlistId = checkbox.getAttribute('playlistId');
			}
		});
		showModal(`Please confirm ${videoIds.length} to be deleted`);
		fetch('/deletesongs', {
			'method':'POST',
			'body': JSON.stringify({
				'playlistId': playlistId, 
				'videoIds': videoIds,
				'setVideoIds': setVideoIds
			})
		})
		.then(response => response.json())
		.then(response => {
			showModal('Deletes sent');
		});
	});
	document.getElementById('btnOk').addEventListener('click', event => {
		fetch('/deletesongs', {
			'method':'POST',
			'body': JSON.stringify({
				'playlistId': playlistId, 
				'videoIds': videoIds,
				'setVideoIds': setVideoIds
			})
			.then(response => response.json())
			.then(response => {
				showModal('Deletes sent');
			})
		});

	});
	document.getElementById('btnCancel').addEventListener('click', event => {
		document.getElementById('modal').style.display = 'none';
	});
	getPlayLists();
};