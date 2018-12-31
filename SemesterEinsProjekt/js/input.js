var input;
var tester;
//regEx validierung auf die verfügbaren Räume
var reg= /\bedv_a(?:2.[0][67]|5.[0][8]|6.(?:0[98]|1[0]))\b/i;
var value;

//Funktion wird bei eingabe von ENTER im input Feld aufgerufen
function userInput(){
	//EIngabe des users wird zu lower case gemacht und anschließend weitergeleitet und verarbeitet 
	input = document.getElementById("roomInput").value.toLowerCase();
	//Wenn der user etwas valides eingegebenen hat
	if(input=="edv_a2.06"||input=="edv_a2.07"||input=="edv_a5.08"||input=="edv_a6.08"||input=="edv_a6.09"||input=="edv_a6.10"){
	//Dann springen wir in die getRoom funktion und rufen das entsprechende xml dokument auf.
	//Input mit value zu duplizieren ist nur Faulheit da wir beinahe dieselbe Methode wie im json Teil benutzen	
		value=input;
		getRoom();
	}
	return false;
}
//Die regEx validierung erfolgt mittels onkeyup event im html input tag. Nach jeder eingabe erfolgt eine überprüfung
//Das aktive values des Inputfeldes
function regValidate(){
	tester= document.getElementById("roomInput").value;
	//Vergleich mit der regEx mittels test() function
	if (reg.test(tester)){
		document.getElementById("validator").innerHTML = document.getElementById("roomInput").value.toUpperCase();
		document.getElementById("validator").style.color = "green";
	}else{
		document.getElementById("validator").innerHTML = "Not a valid selection!";
		document.getElementById("validator").style.color = "red";
	}

}

function getRoom() {
	document.getElementById("listContent").innerHTML="";
	//Je nachdem welcher Raum ausgesucht wurde wird das jeweilge xml file requested
	if(value=="edv_a2.06"){
		value="./ajax/edva206.xml";
	}else if(value=="edv_a2.07"){
		value="./ajax/edva207.xml";
	}else if(value=="edv_a5.08"){
		value="./ajax/edva508.xml";
	}else if(value=="edv_a6.08"){
		value="./ajax/edva608.xml";
	}else if(value=="edv_a6.09"){
		value="./ajax/edva609.xml";
	}else if(value=="edv_a6.10"){
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
  //Hier unten wird der gewünschte Pfad benutzt (value)
  xhttp.open("GET", value, true);
  xhttp.send();
}
