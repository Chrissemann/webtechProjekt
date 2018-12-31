//Ready function shortcut
$(	function(){
	//Der Ajax Call in das json file. cache: false dient  nur dazu nicht einen alten cache zu benutzen.
		$.ajax({
			url:"./ajax/rooms.json",
			dataType:"json",
			type:"GET",
			cache: false,
			success: function(data){ //jQuery übergibt das Grundobjekt direkt der function	
						$.each(data, function(mainkey, mainvalue){
						//die parameter sind immer key value des json objects. value ist in diesem fall ein nested object durch welches
						//wiederum durchiteriert wird mittels einer schleife ( each ) 		
							$.each(mainvalue, function(key,value){
								//Werte aus dem json file werden in den select appended.
								$("select").append("<option value=\""+key+"\">"+value+"</option>");
							});
						});
					}
		});
	}
);
/*-------------XML ZUGRIFF-----------*/
function getRoom() {
	document.getElementById("listContent").innerHTML="";
	//Je nachdem welcher Raum ausgesucht wurde wird das jeweilge xml file requested
	var value=document.getElementById("jsonSelektor").value;
	if(value=="Raum1"){
		value="./ajax/edva206.xml";
	}else if(value=="Raum2"){
		value="./ajax/edva207.xml";
	}else if(value=="Raum3"){
		value="./ajax/edva508.xml";
	}else if(value=="Raum4"){
		value="./ajax/edva608.xml";
	}else if(value=="Raum5"){
		value="./ajax/edva609.xml";
	}else if(value=="Raum6"){
		value="./ajax/edva610.xml";
	}
	//In die Text variable schreiben wir das xml file als String
	var text, parser, xmlDoc;
	//Der XMLHTTP request 
	var xhttp = new XMLHttpRequest();
	//In dem Moment wo sich der status auf ready ändert, verarbeiten wir das XML File weiter
  	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //Mit responseText wird das xml file einfach als String ausgegeben, dieser String wird dann geparsed.	
      text=this.responseText;
      //Mit dem DOM Parser erzeugen wir ein XML DOM object durch welches wir in weiterer Folge navigieren können.
      parser = new DOMParser();
	  xmlDoc = parser.parseFromString(text,"text/xml");
	  //Wieviele nodes hat das xml file ?
	  var lengthOfxml=xmlDoc.getElementsByTagName("LVDaten");
	  //Jeder Wert den wir benutzen wollen wird in ner Variablen gespeichert und dieser dann einfach in den Table appendet
	  var lektor,datum,von,bis,lehrfach,gruppe;
	  //Die Schleife iteriert durch alle Nodes des XML files
	  	  for(var a=0;a<lengthOfxml.length;a++){
	  //Mit jedem Step werden alle Variable durchaktualisiert	  	
	  	  lektor= xmlDoc.getElementsByTagName("Lektoren")[a].childNodes[0].nodeValue;
		  datum= xmlDoc.getElementsByTagName("Datum")[a].childNodes[0].nodeValue;
		  von= xmlDoc.getElementsByTagName("Von")[a].childNodes[0].nodeValue;
		  bis= xmlDoc.getElementsByTagName("Bis")[a].childNodes[0].nodeValue;
		  lehrfach= xmlDoc.getElementsByTagName("Lehrfach")[a].childNodes[0].nodeValue;
		  gruppe= xmlDoc.getElementsByTagName("Gruppen")[a].childNodes[0].nodeValue;
		  console.log(lengthOfxml.length);
	  //Und schließlich der DOM Baum manipuliert	  
		  $("tbody").append("<tr>"+"<td>"+datum+"</td>"+"<td>"+von+"</td>"+"<td>"+bis+"</td>"+"<td>"+lehrfach+"</td>"+"<td>"+lektor+"</td>"+"<td>"+gruppe+"</td>"+"</tr>");
	  	  }
    }
  };
  xhttp.open("GET", value, true);
  xhttp.send();
}