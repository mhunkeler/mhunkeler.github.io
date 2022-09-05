
import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
  } from "./firebase.js";
  
  const designacionApi = document.getElementById("designacion-api");
  const sentidoRotacion = document.getElementById("sentido-rotacion");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const designacionApi = document.getElementById("designacion-api");
  //const tasksContainer = document.getElementById("tasks-container"); 
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetTasks((querySnapshot) => {
      designacionApi.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const pozo = doc.data();
  
        designacionApi.innerHTML = pozo.designacionApi;
        sentidoRotacion.innerHTML = pozo.sentidoRotacion;
      });
  

  

    });
  });
  

