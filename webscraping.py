import urllib
import urllib.request
from bs4 import BeautifulSoup

def make_soup(url):
    thepage = urllib.request.urlopen(url)
    soupdata = BeautifulSoup(thepage, "html.parser")
    return soupdata

playerdata = ""
soup = make_soup("http://www.basketball-reference.com/players/a/")
for record in soup.findAll('tr'):
    for data in record.findAll('td'):
        playerdata = playerdata + "," + data.text
        print(playerdata)
