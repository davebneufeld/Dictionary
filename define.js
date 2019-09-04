document.addEventListener("mouseup", findSelection, false);

function findSelection(){
	// determine if text has been highlighted, and if so, send the text to define
	sel = window.getSelection()
	if (!sel.isCollapsed){ 
		define(sel.toString()) 
	} else {
		document.getElementsByTagName('body')[0].setAttribute("title", "")
	}
}

function define(text){	
	var body = document.getElementsByTagName('body')[0]
	var request = new XMLHttpRequest()
	var key = "no stealing my key :)"
	var url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + text + "?key=" + key;
	request.open('GET', url, true)
	request.onload = function() {
	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response)
	  if ((request.status >= 200 && request.status < 400) && data.length != 0) {
		var tooltipContent = "";
		data[0]["shortdef"].forEach(definition => {
		  tooltipContent += definition + "\n"
		})
		body.setAttribute("title", tooltipContent);
	  } else {
		body.setAttribute("title", "I don't know the definition of that :c")
	  }
	}
	request.send()
}