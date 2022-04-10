% include('templates/header.tpl')
		<div id="container">
			<div id="sidebar">
				<div class="heading">Playlists</div>
				<div id="playlistArea"></div>
			</div>
			<div id="content">
				<div id="header">
					<span class="heading">Songs</span>
					<span id="title" class="heading center"></span>
					<button id="action" class="btn">Remove checked items</button>
				</div>
				<div id="songsArea"></div>
			</div>
			<div id="modal">
				<p id="modalMessage"></p>
				<button id="btnOk" class="btn" data-playlistid="" data-videos="">OK</button>
				<button id="btnCancel" class="btn" data-dismiss="modal">Cancel</button>
			</div>
		</div>
% include('templates/footer.tpl')
