






//RFI TAG:driverDefineList=HTML_Widget2









function widgetClick(widget){

}

function widgetClickEvt(ev){
	const name = ev.target.getAttribute("id").substr(7);
	widgetClick(name);
}


function WidgetSetText(widgetName,texto){
	document.getElementById(`widget-${widgetName}`).innerText = texto;
}




		


var  MQTTsvr;

var MQTTport

var CLIENTID;

var USERMQTT;

var PASSMQTT;

var TOPICSUBS;
function pMQTT(topic,payload){
		message = new Paho.MQTT.Message(payload);
		message.destinationName = topic;
		message.retained = false;
		client.send(message); 
}


function sMQTT(topic){
	client.subscribe(topic);
}


client = new Paho.MQTT.Client("openproject.rfindustrial.com", Number(9090), "clientId"+makeid(10));
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});


function onConnect() {
  console.log("onConnect");
  eMQTTCON();
  
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
	var payload =  message.payloadString; // message.toString();
	var value = parseFloat(payload);
	var topic = message.destinationName;
	var topics = topic.split("/");
	eMQTT(topic,payload);
	
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   console.log("random:",result );
   return result;
}      
	
var timer1;
const setTime1 =  function (timeInMs,reload){
	if (timeInMs == 0){
		clearTimeout(timer1);
	}
	else{
		if (reload == 'T')
			timer1 = window.setTimeout(etOut1, timeInMs);
		if (reload == 'A')
			timer1 = window.setInterval(etOut1, timeInMs);
	}
}











//setTimeout(function, milliseconds)
//Executes a function, after waiting a specified number of milliseconds.
//
//setInterval(function, milliseconds)
//Same as setTimeout(), but repeats the execution of the function continuously.
//The setTimeout() and setInterval() are both methods of the HTML DOM Window object.













document.addEventListener('DOMContentLoaded', INICIO);












function GaugeSetValue(gaugeName,value){
	document.getElementById(`gauge-${gaugeName}`).value = value;
}









function SwitchSetValue(switchName,value){
	document.getElementById(`switch-${switchName}`).value = value;
}

function switchToogle(name,value){

}


function INIVAR() { 
}
function eMQTT(topic,payload) { 
	pMQTT("EMIC/test/feedback","topic:"+topic+",payload:"+payload);
	GaugeSetValue("1",payload);
}
function etOut1() { 
	setTime1("0","A");
}
function eMQTTCON() { 
	sMQTT("EMIC/test/values/#");
}
function INICIO() { 
	setTime1("1000","A");
}
function switchToogle(Switch,Value) { 
	pMQTT("EMIC/test/config/Rele"+Switch,Value);
}
function widgetClick(widget) { 
	pMQTT("EMIC/test/feedback/widget","payload:"+widget);
}

