import requests
import json
import operator
import time
import sys
pages = ["aaltoes","sosaaltoes"] #add pages where to look for events
app_id = "XXX"
app_secret = "XXX"

def loadEvents(page):
	
	url = "https://graph.facebook.com/"+page+"/events?limit=5&since="+str(int(time.time()))+"&key=value&access_token="+app_id+"|"+app_secret
	
	try:
		events = requests.get(url)
		jsonEvent = events.json()
		events.raise_for_status()		
	except requests.exceptions.RequestException as e:
		print(e)
		print(jsonEvent["error"]["message"])
		sys.exit()

	return jsonEvent    
    
def sortEvents(events):
	eventDict = {}
	combinedEvents = {"data":[]}
	sortedEvents = {"data":[]}
	for pages in events:
		for index in pages["data"]:
			combinedEvents["data"].append(index)
			eventDict.update({index["id"]:index["start_time"].split("T")[0]})
	
	sortedbyDate = sorted(eventDict.items(), key=operator.itemgetter(1))
	
	for i in sortedbyDate:
		for event in combinedEvents["data"]:
			if (i[0] == event["id"]):
				for k in sortedEvents["data"]: #Check for duplicated events
					if (event["id"] == k["id"]):
						break
				else:			
					sortedEvents["data"].append(event)

	return sortedEvents

def writeEvents(events):
	file = open("events.json", 'w')
	file.write(json.dumps(events))
	file.close()


def getCovers(events):
	
	#Get covers:
	for index in events["data"]:
	    picUrl = "https://graph.facebook.com/" + index["id"] + "?fields=cover&key=value&access_token=" + app_id + "|" + app_secret
	    try:
	    	pic = requests.get(picUrl)
	    	pic.raise_for_status()
	    	jsonPic = pic.json()
	    except requests.exceptions.RequestException as e:
	    	print(e)
	    	print("Issue with requesting cover picture")
	    	index["id"] = "noCover"
	    	continue
	    index["id"] = jsonPic["cover"]["source"]
	return events

if __name__ == "__main__":
	results = []

	for i in pages:
		results.append(loadEvents(i))
	
	r = sortEvents(results)
	writeEvents(getCovers(r))