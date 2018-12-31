var value;
function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No valid QR-Code found. Please try again dear lectors.");
      } else {
        //WENN DER SCAN ERFOLGREICH WAR! wird die Table mit dem entsprechendem Raum befüllt.
        node.parentNode.previousElementSibling.value = res;
        value=node.parentNode.previousElementSibling.value;
        document.getElementById("listContent").innerHTML="";
        if(value=="EDVA206"||value=="EDVA207"||value=="EDVA508"||value=="EDVA608"||value=="EDVA609"||value=="EDVA610"){
          //Je nachdem welcher Raum ausgesucht wurde wird das jeweilge xml file requested
          if(value=="EDVA206"){
            value="./ajax/edva206.xml";
          }else if(value=="EDVA207"){
            value="./ajax/edva207.xml";
          }else if(value=="EDVA508"){
            value="./ajax/edva508.xml";
          }else if(value=="EDVA608"){
            value="./ajax/edva608.xml";
          }else if(value=="EDVA609"){
            value="./ajax/edva609.xml";
          }else if(value=="EDVA610"){
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
      }
    };
    qrcode.decode(reader.result);
  };
  reader.readAsDataURL(node.files[0]);
}

function showQRIntro() {
  return confirm("Please scan your desired rooms QR-Code!");
}
