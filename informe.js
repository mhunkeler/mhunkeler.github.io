
import {
    getTask,getTasks,getX
  } from "./firebase.js";
  
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
    // DATOS DE PRODUCCION
    const porcentajeAgua = document.getElementById("porcentaje-agua");
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

    // DATOS DE PRODUCCION
    porcentajeAgua.innerHTML = Config.DatosProduccion.PorcentajeAgua;
    
    
    });


