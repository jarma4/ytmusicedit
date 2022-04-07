% include('templates/header.tpl')
		<h2>Playlists</h2>
		<div id="playlistArea"></div>
		<h3>Songs</h3>
		<button id="action">Remove checked items</button>
		<div id="songsArea"></div>
		<div id="modal">
			<span id="modalMessage"></span>
			<br>
			<button id="btnOk" class="btn">OK</button>
			<button id="btnCancel" class="btn" data-dismiss="modal">Cancel</button>
		</div>
% include('templates/footer.tpl')
