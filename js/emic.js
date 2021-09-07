
      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

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

        var chart0 = new google.visualization.Gauge(document.getElementById('chart_div0'));
        var chart1 = new google.visualization.Gauge(document.getElementById('chart_div1'));
        var chart2 = new google.visualization.Gauge(document.getElementById('chart_div2'));
        var chart3 = new google.visualization.Gauge(document.getElementById('chart_div3'));
        var chart4 = new google.visualization.Gauge(document.getElementById('chart_div4'));
        var chart5 = new google.visualization.Gauge(document.getElementById('chart_div5'));

        chart0.draw(dataGauges[0], optionsGauges);
        chart1.draw(dataGauges[1], optionsGauges);
        chart2.draw(dataGauges[2], optionsGauges);
        chart3.draw(dataGauges[3], optionsGauges);
        chart4.draw(dataGauges[4], optionsGauges);
        chart5.draw(dataGauges[5], optionsGauges);
	
		
		var client2 = mqtt.connect('ws://openproject.rfindustrial.com:9090')

client2.subscribe('clientid/vivero/status/#')
//client2.publish('/vivero/connected/', 'Hello mqtt')

client2.on('message', function (topic, message) {
	
  console.log(topic + ":" + message.toString())
	var value = parseFloat(message.toString());








//------------------------




  // Comprobamos si el navegador soporta las notificaciones
  if (!("Notification" in window)) {
    alert("Este navegador no soporta las notificaciones del sistema");
  }

  // Comprobamos si ya nos habían dado permiso
  else if (Notification.permission === "granted") {
    // Si esta correcto lanzamos la notificación
    //var notification = new Notification("Holiwis :D");
	var notification = new Notification("Gracias majo! "+ topic + ":" + message.toString());
  }

  // Si no, tendremos que pedir permiso al usuario
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Si el usuario acepta, lanzamos la notificación
      if (permission === "granted") {
        var notification = new Notification("Gracias majo!");
      }
    });
  }


//--------------------------








  if (topic.endsWith("/temp1"))
  {
	dataGauges[0].setValue(0, 1,  value / 100);
	chart0.draw(dataGauges[0], optionsGauges);
  }	  

  if (topic.endsWith("/hum1"))
  {
	dataGauges.setValue(1, 1,  value / 100);
	chart.draw(dataGauges, optionsGauges);
  }	  
  
  if (topic.endsWith("/CO2_1"))
  {
	dataGauges.setValue(2, 1,  value / 10);
	chart.draw(dataGauges, optionsGauges);
  }
  
  if (topic.endsWith("/moist1"))
  {
	dataGauges.setValue(3, 1,  value / 10);
	chart.draw(dataGauges, optionsGauges);
  }	  
  if (topic.endsWith("/lux1"))
  {
	dataGauges.setValue(4, 1,  value / 100);
	chart.draw(dataGauges, optionsGauges);
  }	  

});

      }