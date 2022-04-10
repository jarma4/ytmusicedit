from ytmusicapi import YTMusic

music = YTMusic('headers_auth.json')

def get_playlistIds():
	new = {}
	all_lists = music.get_library_playlists()
	for list in all_lists:
		new[list['title']] = {'id': list['playlistId'], 'thumb': list['thumbnails']}
	print(all_lists[0])
	return new

def get_songs(playlistid):
	return music.get_playlist(playlistid, 10)

def delete_songs(playlistid, songs):
	music.remove_playlist_items(playlistid, songs)

playlists = get_playlistIds()
