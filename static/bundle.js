let deletePlaylistId='', deleteVideos=[];

function getPlayLists() {
	fetch('/playlists')
	.then(response => response.json())
	.then(response => {
		let newDiv;
		const playlistArea = document.getElementById('playlistArea');
		Object.keys(response).forEach(key => {
			newDiv = document.createElement('div');
			newDiv.className = 'playlistBox';
			newDiv.id = response[key].id;
			newDiv.style.backgroundImage = `url(${response[key].thumb[0].url})`;
			newDiv.appendChild(document.createTextNode(key));
			newDiv.addEventListener('click', event => {
				document.getElementById('title').textContent = key;
				getSongs(response[key].id);
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
			outp += '<tr><td><img src="'+track.thumbnails[0].url+'" class="songThumbnail"></td><td>'+track.title+'</td><td class="songTitle">'+track.artists[0].name+'</td><td>'+((track.album)?track.album.name:'')+'</td><td>'+((track.duration)?track.duration:'')+'</td><td><input type="checkbox" playlistId="'+playlistId+'" setVideoId="'+track.setVideoId+'" videoId="'+track.videoId+'" class="checkbox"></td></tr>';
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
function clearModal () {
	document.getElementById('modalMessage').innerText = '';
	document.getElementById('modal').style.display = 'none';
}

document.getElementById('action').addEventListener('click', event => {
	document.querySelectorAll('.checkbox').forEach(checkbox => {
		if (checkbox.checked) {
			deleteVideos.push({setVideoId: checkbox.getAttribute('setVideoId'), videoId: checkbox.getAttribute('videoId')});
		}
	});
	deletePlaylistId = document.querySelector('.checkbox').getAttribute('playlistId');
	showModal(`Please confirm ${deleteVideos.length} to be deleted`);
});

document.getElementById('btnOk').addEventListener('click', event => {
	fetch('/deletesongs', {
		'method':'POST',
		'body': JSON.stringify({
			'playlistId': deletePlaylistId, 
			'videos': deleteVideos,
		})
	})
	.then(response => response.json())
	.then(response => {
		console.log(`result: ${response.result}`);
		clearModal();
		deletePlaylistId='';
		deleteVideos=[];
	});
});

document.getElementById('btnCancel').addEventListener('click', event => {
	clearModal();
});

window.onload = () => {
	getPlayLists();
};