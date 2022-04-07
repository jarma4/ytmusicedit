from bottle import get, post, request, template, static_file
from json import load
import ytmusic

@get('/')
def main():
	return template('templates/main.tpl')

@get('/playlists')
def playlists():
	return ytmusic.playlists

@post('/songs')
def songs():
	return ytmusic.get_songs(load(request.body)['playlistId'])

@post('/deletesongs')
def songs():
	ytmusic.delete_songs(load(request.body)['playlistId'], load(request.body)['videos'])

@get('/static/<file>')
def static(file):
	return static_file(file, root='static')