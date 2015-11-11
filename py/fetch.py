from flask import jsonify
import requests, json
from sys import argv


position = 'qb'

def fetch(position):

	file_name = "%s.json" % position
	txt = open(file_name)
	print txt.read()


fetch(position)