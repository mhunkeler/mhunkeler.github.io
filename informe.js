
import {
    getTask,getTasks,getX
  } from "./firebase.js";
  
    var mainPlotDynaObj = {};

    var mainPlotDynaData = [
      {
          x: [],
          y: [],
          mode: "lines",
          line: {
              color: 'rgb( 0, 0, 255)',
              width: 2
          }
      },
      {
          x: [],
          y: [],
          mode: "lines",
          line: {
              color: 'rgb(128, 128, 128)',
              width: 3
          }
  
      },
      {
          x: [],
          y: [],
          mode: "lines",
          line: {
              color: 'rgb( 128, 0, 128 )',
              width: 2
          }
  
      },
      {
          x: [],
          y: [],
          mode: "lines",
          line: {
              color: 'rgb(128, 128, 128)',
              width: 3
          }
  
      }
  ];
  

    var mainPlotDynalayout = {
      xaxis: { range: [-20, 200] }, //, title: "Posición (pulgadas)"
      yaxis: { range: [-5000, 30000] }, //, title: "Fuerza (libras)" 
      //title: `Dinamometria Pozo:${obj.pozo.name}`
      margin: { t:20, b:30, l:30, r:20 },
      showlegend: false,
      legend: {
          x: 1,
          xanchor: 'right',
          y: 1
      }
  };

    // UNIDAD DE BOMBEO
    const designacionApi = document.getElementById("designacion-api");
    const sentidoRotacion = document.getElementById("sentido-rotacion");
    const carreraApi = document.getElementById("carrera-api");
    const gpmApi = document.getElementById("gpm-api");
    //CONTRAPESOS
    const tipoContrapeso1 = document.getElementById("tipo-1");
    const cantidadContrapeso1 = document.getElementById("cantidad-1");
    const distanciaContrapeso1 = document.getElementById("distancia-1");
    const cantidadAuxContrapeso1 = document.getElementById("cantidadAux-1");

    const tipoContrapeso2 = document.getElementById("tipo-2");
    const cantidadContrapeso2 = document.getElementById("cantidad-2");
    const distanciaContrapeso2 = document.getElementById("distancia-2");
    const cantidadAuxContrapeso2 = document.getElementById("cantidadAux-2");
    // MOTOR
    const tipoMotor = document.getElementById("tipo-motor");
    const potenciaMotor = document.getElementById("potencia-motor");
    const poleaMotor = document.getElementById("polea-motor");
    const gpmMotor = document.getElementById("gpm-motor");
    // BOMBA DE PROFUNDIDAD
    const diametroProfundidad = document.getElementById("diametro-profundidad");
    const bombaProfundidad = document.getElementById("bomba-profundidad")
    // SARTA 
    const diametroSarta1 = document.getElementById("diametro-sarta1");
    const cantidadSarta1 = document.getElementById("cantidad-sarta1");
    const longitudSarta1 = document.getElementById("longitud-sarta1");
    const pesoSarta1 = document.getElementById("peso-sarta1");
    const materialSarta1 = document.getElementById("material-sarta1");
    const tensionSarta1 = document.getElementById("tension-sarta1");
    const pesoAireSarta1 = document.getElementById("pesoAire-sarta1");

    const diametroSarta2 = document.getElementById("diametro-sarta2");
    const cantidadSarta2 = document.getElementById("cantidad-sarta2");
    const longitudSarta2 = document.getElementById("longitud-sarta2");
    const pesoSarta2 = document.getElementById("peso-sarta2");
    const materialSarta2 = document.getElementById("material-sarta2");
    const tensionSarta2 = document.getElementById("tension-sarta2");
    const pesoAireSarta2 = document.getElementById("pesoAire-sarta2");

    const diametroSarta3 = document.getElementById("diametro-sarta3");
    const cantidadSarta3 = document.getElementById("cantidad-sarta3");
    const longitudSarta3 = document.getElementById("longitud-sarta3");
    const pesoSarta3 = document.getElementById("peso-sarta3");
    const materialSarta3 = document.getElementById("material-sarta3");
    const tensionSarta3 = document.getElementById("tension-sarta3");
    const pesoAireSarta3 = document.getElementById("pesoAire-sarta3");
    // DATOS DE PRODUCCION
    const porcentajeAgua = document.getElementById("porcentaje-agua");
  //const designacionApi = document.getElementById("designacion-api");
  //const tasksContainer = document.getElementById("tasks-container"); 
  
  const cartaSupPlot = document.getElementById("main-plot-dyna");


  window.addEventListener("DOMContentLoaded", async (e) => {
    let params = new URLSearchParams(location.search);
    var IdDina = params.get('id');

    const doc = await getTask(IdDina);
    //const pozos = await getTasks();
    const Dinamometria = doc.data()
    const ConfigDoc = await getX(Dinamometria.Config);
    const Config = ConfigDoc.data();
   
    console.log(doc);
    
    console.log(ConfigDoc)
    console.log(Config)

    // UNIDAD DE BOMBEO
    designacionApi.innerHTML = Config.UnidadBombeo.DesignacionApi;
    sentidoRotacion.innerHTML = Config.UnidadBombeo.SentidoRotacion;
    carreraApi.innerHTML = Config.UnidadBombeo.CarreraApi;
    gpmApi.innerHTML = Config.UnidadBombeo.GpmApi;
    //CONTRAPESOS
    tipoContrapeso1.innerHTML = Config.Contrapesos[0];
    cantidadContrapeso1.innerHTML = Config.Contrapesos[1];
    distanciaContrapeso1.innerHTML = Config.Contrapesos[2];
    cantidadAuxContrapeso1.innerHTML = Config.Contrapesos[3];

    tipoContrapeso2.innerHTML = Config.Contrapesos[4];
    cantidadContrapeso2.innerHTML = Config.Contrapesos[5];
    distanciaContrapeso2.innerHTML = Config.Contrapesos[6];
    cantidadAuxContrapeso2.innerHTML = Config.Contrapesos[7];
    // MOTOR
    tipoMotor.innerHTML = Config.Motor.Tipo;
    potenciaMotor.innerHTML = Config.Motor.Potencia;
    poleaMotor.innerHTML = Config.Motor.DiametroPolea;
    gpmMotor.innerHTML = Config.Motor.Rpm;
    // BOMBA DE PROFUNDIDAD
    diametroProfundidad.innerHTML = Config.BombaProfundidad.Diametro;
    bombaProfundidad.innerHTML = Config.BombaProfundidad.Profundidad;
    // SARTA
    diametroSarta1.innerHTML = Config.Sarta[0]; 
    cantidadSarta1.innerHTML = Config.Sarta[1]; 
    longitudSarta1.innerHTML = Config.Sarta[2]; 
    pesoSarta1.innerHTML = Config.Sarta[3]; 
    materialSarta1.innerHTML = Config.Sarta[4]; 
    tensionSarta1.innerHTML = Config.Sarta[5]; 
    pesoAireSarta1.innerHTML = Config.Sarta[6]; 

    diametroSarta2.innerHTML = Config.Sarta[7]; 
    cantidadSarta2.innerHTML = Config.Sarta[8]; 
    longitudSarta2.innerHTML = Config.Sarta[9]; 
    pesoSarta2.innerHTML = Config.Sarta[10]; 
    materialSarta2.innerHTML = Config.Sarta[11]; 
    tensionSarta2.innerHTML = Config.Sarta[12]; 
    pesoAireSarta2.innerHTML = Config.Sarta[13]; 

    diametroSarta3.innerHTML = Config.Sarta[14]; 
    cantidadSarta3.innerHTML = Config.Sarta[15]; 
    longitudSarta3.innerHTML = Config.Sarta[16]; 
    pesoSarta3.innerHTML = Config.Sarta[17]; 
    materialSarta3.innerHTML = Config.Sarta[18]; 
    tensionSarta3.innerHTML = Config.Sarta[19]; 
    pesoAireSarta3.innerHTML = Config.Sarta[20]; 

    // DATOS DE PRODUCCION
    porcentajeAgua.innerHTML = Dinamometria.DatosProduccion.PorcentajeAgua;
    
    
    mainPlotDynaData[0].name = "ultimo";
    mainPlotDynaData[0].x = Dinamometria.CartaSuperficie.position;
    mainPlotDynaData[0].y = Dinamometria.CartaSuperficie.force;

    //mainPlotDynaData[2].x = misDinas[ultimo].dHposition;
    //mainPlotDynaData[2].y = misDinas[ultimo].dHforce;

    Plotly.newPlot('main-plot-dyna', mainPlotDynaData, mainPlotDynalayout);


    });


