
      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var dataGauges =
			[
				google.visualization.arrayToDataTable([
					['Label', 'Value'],
					['Temperatura', 0]
					]),

				google.visualization.arrayToDataTable([
					['Label', 'Value'],
					['Humedad', 0]
					]),
					
				google.visualization.arrayToDataTable([
					['Label', 'Value'],
					['CO2', 0]
					]),

				google.visualization.arrayToDataTable([
					['Label', 'Value'],
					['H. Suelo', 0]
					]),

				google.visualization.arrayToDataTable([
					['Label', 'Value'],
					['Luz', 0]
					])


			];


        var optionsGauges = {
          width: 200, height: 200,
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

client2.subscribe('/vivero/#')
//client2.publish('/vivero/connected/', 'Hello mqtt')

client2.on('message', function (topic, message) {
	
  console.log(topic + ":" + message.toString())
	var value = parseFloat(message.toString());

//  if (topic.endsWith("/TEMP"))
//  {
//	dataGauges[0].setValue(0, 1,  value / 100);
//	chart0.draw(dataGauges[0], optionsGauges);
//  }	  

//  if (topic.endsWith("/HUM"))
//  {
//	dataGauges.setValue(1, 1,  value / 100);
//	chart.draw(dataGauges, optionsGauges);
//  }	  
//  
//  if (topic.endsWith("/CO2"))
//  {
//	dataGauges.setValue(2, 1,  value / 10);
//	chart.draw(dataGauges, optionsGauges);
//  }
//  
//  if (topic.endsWith("/MOIST"))
//  {
//	dataGauges.setValue(3, 1,  value / 10);
//	chart.draw(dataGauges, optionsGauges);
//  }	  
//  if (topic.endsWith("/LUX"))
//  {
//	dataGauges.setValue(4, 1,  value / 100);
//	chart.draw(dataGauges, optionsGauges);
//  }	  

});

      }