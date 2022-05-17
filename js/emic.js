google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

//var client2 = mqtt.connect('ws://openproject.rfindustrial.com:9090');

// in your click function, call clearTimeout

// Create a client instance
client = new Paho.MQTT.Client("openproject.rfindustrial.com", Number(9090), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  //client.subscribe("World");
  client.subscribe('clientid/vivero/config/#');


}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}



var gauge0;
$(document).ready(function(){
		$('#selector-tabla-sensores-moisture').on('change', function(){
			
			var val = $('#selector-tabla-sensores-moisture option').filter(':selected').text();
			
			
			message = new Paho.MQTT.Message(val);
			message.destinationName = 'clientid/vivero/config/moist_matrix';
			message.retained = true;
			client.send(message); 
			
			
			
			//gauge nuevo
			gauge0 =  Gauge(
    document.getElementById("gauge0"),
    {
      min: 0,
      max: 100,

      //value: 50,
      //viewBox: "0 0 100 57",
      color: function(value) {
        if(value < 20) {
          return "#5ee432";
        }else if(value < 40) {
          return "#fffa50";
        }else if(value < 60) {
          return "#f7aa38";
        }else {
          return "#ef4655";
        }
      }
    }
  );
			

            $('#trackbar1').strackbar({ callback: onTick1, defaultValue: 4, sliderHeight: 4, sliderWidth: 300, style: 'style1', animate: true, ticks: true, labels: true, trackerHeight: 20, trackerWidth: 19 , minValue: 200, maxValue: 300});
            $('#trackbar2').strackbar({ callback: onTick2, defaultValue: 5, sliderHeight: 6, sliderWidth: 400, style: 'style2', animate: true, ticks: true, labels: true, trackerHeight: 23, trackerWidth: 23 , minValue: 200, maxValue: 300 });
            $('#trackbar3').strackbar({ callback: onTick3, defaultValue: 6, sliderHeight: 19, sliderWidth: 500, style: 'style3', animate: true, ticks: true, labels: true, trackerHeight: 23, trackerWidth: 23, minValue: 200, maxValue: 300 });
			


		});
		
	

function enviarSetTemp1(value,id)
{
	console.log("enviar set temp1:" + value/10);
	$('#text3b').html("Current Value: " + value/10);
	message = new Paho.MQTT.MessagesetValue(""+ (value));
	message.destinationName = 'clientid/vivero/config/setTemp'+ id ;
	message.retained = true;
	client.send(message); 

}


var timeoutTemp = window.setTimeout(enviarSetTemp1,10000);
window.clearTimeout(timeoutTemp);

function onTick1(value) {
	$('#text1').html("Current Value: " + value/10);
}
function onTick2(value) {
	$('#text2').html("Current Value: " + value/10);
	gauge0.(value/10, 3);
}
function onTick3(value) {
	$('#text3').html("Current Value: " + value/10);
	
	console.log("setTemp:" + value);
	
	window.clearTimeout(timeoutTemp);

	timeoutTemp = window.setTimeout(enviarSetTemp1,3000,value,1);

	
}	

		
		//var elements = document.getElementsByClassName("check-dia");
		
		
		//document.getElementsByName(name).
		
		
		var ckek = document.getElementsByClassName('btn-checkbox2btn');
		
		for (i = 0 ; i < ckek.length ; i++)
		{
			ckek[i].addEventListener("change", function()
			{
				var value = $(this).prop('checked');
				value += 10;
			});
			
			ckek[i].addEventListener("click", function()
			{
				var value = (this.classList.contains('btn-checkbox-checked'))?"0":"1"
				var topic = this.closest(".riego-dia").id;
				
				message = new Paho.MQTT.Message(value);
				message.destinationName = 'clientid/vivero/config/' + topic;
				message.retained = true;
				client.send(message); 
				
			});
		
		}
		
		$(".check-dia").click( function()
		{
			var value = $(this).val();
			value += 10;
		});
		
		
});







function drawChart() {

var dataGauges =
	[
		google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Temp(°C)', 0]
			]),

		google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Humedad(%)', 0]
			]),
			
		google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['CO2(x100ppm)', 0]
			]),

		google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['H. Suelo(%)', 0]
			]),

		google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Luz(lux)', 0]
			])


	];


	var optionsGauges = {
	  width: 300, height: 300,
	  redFrom: 90, redTo: 100,
	  yellowFrom:75, yellowTo: 90,
	  minorTicks: 5
	};

	//var chart0 = new google.visualization.Gauge(document.getElementById('chart_div0'));
	var chart1 = new google.visualization.Gauge(document.getElementById('chart_div1'));
	var chart2 = new google.visualization.Gauge(document.getElementById('chart_div2'));
	//var chart3 = new google.visualization.Gauge(document.getElementById('chart_div3'));
	var chart4 = new google.visualization.Gauge(document.getElementById('chart_div4'));
	var chart5 = new google.visualization.Gauge(document.getElementById('chart_div5'));

	//chart0.draw(dataGauges[0], optionsGauges);
	chart1.draw(dataGauges[1], optionsGauges);
	chart2.draw(dataGauges[2], optionsGauges);
	//chart3.draw(dataGauges[3], optionsGauges);
	chart4.draw(dataGauges[4], optionsGauges);
	chart5.draw(dataGauges[5], optionsGauges);

	
}	








//client2.subscribe('clientid/vivero/config/#');
//client2.publish('/vivero/connected/', 'Hello mqtt')

//client2.on('message', function (topic, message) {
	
	
	// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);


  //console.log(topic + ":" + message.toString())
	
	var payload =  message.payloadString; // message.toString();
	var value = parseFloat(payload);

	var topic = message.destinationName;






//------------------------




//	  // Comprobamos si el navegador soporta las notificaciones
//	  if (!("Notification" in window)) {
//	    alert("Este navegador no soporta las notificaciones del sistema");
//	  }
//	
//	  // Comprobamos si ya nos habían dado permiso
//	  else if (Notification.permission === "granted") {
//	    // Si esta correcto lanzamos la notificación
//	    //var notification = new Notification("Holiwis :D");
//		var notification = new Notification("Gracias majo! "+ topic + ":" + message.toString());
//	  }
//	
//	  // Si no, tendremos que pedir permiso al usuario
//	  else if (Notification.permission !== 'denied') {
//	    Notification.requestPermission(function (permission) {
//	      // Si el usuario acepta, lanzamos la notificación
//	      if (permission === "granted") {
//	        var notification = new Notification("Gracias majo!");
//	      }
//	    });
//	  }
//	

//--------------------------


	var topics = topic.split("/");



    switch (topics[2])
    {
    	case ("sensor"):
    	    
			if ($("#sensor_"+topics[3]))
			{
				$("#sensor_"+topics[3]).text(value );
			}

			else if (topic.endsWith("/temp1"))
			{
				dataGauges[0].setValue(0, 1,  value / 100);
				//chart0.draw(dataGauges[0], optionsGauges);
			}	  

			else if (topic.endsWith("/hum1"))
			{        
				dataGauges.setValue(1, 1,  value / 100);
				chart.draw(dataGauges, optionsGauges);
			}	  

			else if (topic.endsWith("/CO2_1"))
			{
				dataGauges.setValue(2, 1,  value / 10);
				chart.draw(dataGauges, optionsGauges);
			}

			//if (topic.endsWith("/moist1"))
			//{
				//dataGauges.setValue(3, 1,  value / 10);
				//chart.draw(dataGauges, optionsGauges);
			//}	  
			else if (topic.endsWith("/lux1"))
			{
				dataGauges.setValue(4, 1,  value / 100);
				chart.draw(dataGauges, optionsGauges);
			}	  
		break;
		case "config":
			//client2.subscribe('clientid/vivero/sensor/#');
			
			switch (topics[3])
			{
				case ("moist_matrix"):
					
					if (payload !== $('#selector-tabla-sensores-moisture option').filter(':selected').text())
					{
						//$(`#selector-tabla-sensores-moisture  option[value='${payload}']`).attr('selected', 'selected');
						//$(`#selector-tabla-sensores-moisture`).val(`"${payload}"`)
						
						//$('#selector-tabla-sensores-moisture').selectpicker('val',payload);
						$("#selector-tabla-sensores-moisture").val(payload).change();
					}
					
					var val = payload.split("x");
					
					var column = val[0];
					var fila = val[1];
					
					$('#tabla-sensores-moisture').html("");
					for (i = 0; i <column ; i++)
					{
						$('#tabla-sensores-moisture').append("<tr>");
						for( j = 0 ; j < fila ; j++)
						{
							$('#tabla-sensores-moisture').append('<td style= "border: solid 1px;" align="center"><div style="width: auto;display: contents;" class="digital_30" id=sensor_moist_' + (i+1) +"_"+ (j+1) + ">----</div></td>");
						}
						$('#tabla-sensores-moisture').append("</tr>");
					}
					
					//$('#tabla-sensores-moisture_').text(fila +" x "+ column);
					
					client.subscribe('clientid/vivero/sensor/#');

					
				break;
				case "riego-dia-lun":
				case "riego-dia-mar":
				case "riego-dia-mie":
				case "riego-dia-jue":
				case "riego-dia-vie":
				case "riego-dia-sab":
				case "riego-dia-dom":
					if (payload === "1")
						$(`#${topics[3]}`).find(".btn-checkbox2btn").addClass("btn-checkbox-checked");
					else
						$(`#${topics[3]}`).find(".btn-checkbox2btn").removeClass("btn-checkbox-checked");
					
				break;
			
			}
		break;
			

    }




}

      