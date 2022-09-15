
import {
    getTask,getTasks,getX
  } from "./firebase.js";
  
    // UNIDAD DE BOMBEO
    const designacionApi = document.getElementById("designacion-api");
    const sentidoRotacion = document.getElementById("sentido-rotacion");
    const carreraApi = document.getElementById("carrera-api");
    const gpmApi = document.getElementById("gpm-api");
  
    // MOTOR
    const tipoMotor = document.getElementById("tipo-motor");
    const potenciaMotor = document.getElementById("potencia-motor");
    const poleaMotor = document.getElementById("polea-motor");
    const gpmMotor = document.getElementById("gpm-motor")
    // DATOS DE PRODUCCION
    const porcentajeAgua = document.getElementById("porcentaje-agua");
   
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const tasksContainer = document.getElementById("tasks-container"); 
  
  
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
    // MOTOR
    tipoMotor.innerHTML = Config.Motor.Tipo;
    potenciaMotor.innerHTML = Config.Motor.Potencia;
    poleaMotor.innerHTML = Config.Motor.DiametroPolea;
    gpmMotor.innerHTML = Config.Motor.Rpm;

    // DATOS DE PRODUCCION
    porcentajeAgua.innerHTML = Config.DatosProduccion.PorcentajeAgua;
    
    
    });


