import requests, json
from bs4 import BeautifulSoup
from lxml import etree
from sys import argv


positions = ['qb', 'rb', 'wr', 'te', 'k']

for position in positions:

	url = "http://www.fantasypros.com/nfl/projections/%s.php" % position
	soup = BeautifulSoup(requests.get(url).text, "lxml")

	data = soup.find(id='data').tbody


	players = []

	file_name = "%s.json" % position

	target = open(file_name, 'w')

	for playerRows in data.find_all('tr'):

		name = playerRows.contents[0].find('a').contents[0]

		numColumns = len(playerRows.find_all('td'))
		projected = playerRows.find_all('td')[numColumns - 1].contents[0]
		
		player = {}
		player['name'] = name
		player['projected'] = float(projected)	


		players.append(player)


	target.write(json.dumps(players))

	target.close()





