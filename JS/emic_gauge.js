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





//#newRFIcode(_WEB/API/Widgets/Gauge/gogleCharGauge.js,name=)
function INIVAR() { 
}
function eMQTT(topic,payload) { 
	pMQTT("EMIC/test/feedback","topic:"+topic+",payload:"+payload);
	WidgetSetText("temp",payload);
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
function widgetClick(widget) { 
	pMQTT("EMIC/test/feedback/widget","payload:"+widget);
}

var opts = {
    // color configs
    colorStart: "#6fadcf",
    colorStop: void 0,
    gradientType: 0,
    strokeColor: "#F0e0e0",
    generateGradient: true,
    percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    // customize pointer
    pointer: {
      length: 0.8,
      strokeWidth: 0.035,
      iconScale: 1.0
    },
    // static labels
    staticLabels: {
      font: "10px sans-serif",
      labels: [200, 500, 2100, 2800],
      fractionDigits: 0
    },
    // static zones
    staticZones: [
      {strokeStyle: "#F03E3E", min: 0, max: 200},
      {strokeStyle: "#FFDD00", min: 200, max: 500},
      {strokeStyle: "#30B32D", min: 500, max: 2100},
      {strokeStyle: "#FFDD00", min: 2100, max: 2800},
      {strokeStyle: "#F03E3E", min: 2800, max: 3000}
    ],
    // render ticks
    renderTicks: {
      divisions: 5,
      divWidth: 1.1,
      divLength: 0.7,
      divColor: "#FFFFFF",
      subDivisions: 3,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: "#666666"
    },
    // the span of the gauge arc
    angle: 0.15,
    // line thickness
    lineWidth: 0.44,
    // radius scale
    radiusScale: 1.0,
    // font size
    fontSize: 40,
    // if false, max value increases automatically if value > maxValue
    limitMax: false,
    // if true, the min value of the gauge will be fixed
    limitMin: false,
    // High resolution support
    highDpiSupport: true
};

//var opts = {
//    // options here
//};


//		<script src="JS/gauge.js"> </script>
console.log(typeof Gauge);
loadGauge();
//if (typeof Gauge == "undefined" ){
//	var script = document.createElement("script");
//	script.setAttribute("type", "text/javascript");
//	script.setAttribute("src", "JS/gauge.js");
//	script.addEventListener("load",loadGauge)
//	document.getElementsByTagName("head")[0].appendChild(script);
//}
function loadGauge(){

	console.log(typeof Gauge);
	var target = document.getElementById('demo'); 
	var gauge = new Gauge(target);

	//document.getElementById("preview-textfield").className = "preview-textfield";
	//gauge.setTextField(document.getElementById("preview-textfield"));

	gauge.maxValue = 3000;
	gauge.setMinValue(0); 
	gauge.set(2000);
	gauge.animationSpeed = 32;

	//gauge.setOptions(opts);

}