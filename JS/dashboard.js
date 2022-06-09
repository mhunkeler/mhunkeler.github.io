
class EmicDashboard extends HTMLElement {
    gauge;
    static namesList = {};
    getNewID() {
        var i;
        for (i = 1; EmicDashboard.namesList[`Dashboard-${i}`]; i++);
        EmicDashboard.namesList[`Dashboard-${i}`] = this;
        return `Dashboard-${i}`;
    }
    static get observedAttributes() {
        return [];
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

//            else if(origen.classList.contains("HtmlPanel")) {
//}

    connectedCallback() {
        seccion;
        const nuevoDiv = document.createElement("div");
        const style = document.createElement("style");
        style.innerHTML =
            `
                :host(:hover) {
                    border : 1px solid;
                }
                section.show {min-height: 10px;opacity: 1;padding: 10px;}
                section.hide {min-height: 0px;  opacity: 0;padding: 0px;}
                `;

        this.shadowRoot.appendChild(style);
        //if (document.getElementById("uniqueIdForImplement-" + moduloSeleccionado + "-" + origen.getAttribute("id")) == null) {

         //var atributos;
         //var existNombreWorkBox = false;
         //if (origen.getAttribute("instancia") != null) {
         //    atributos = origen.getAttribute("instancia");
         //    atributos = JSON.parse(atributos);
         //    for (var i in atributos) {
         //        if (i == "NombreWorkBox")
         //            existNombreWorkBox = true;
         //
         //
         //        nuevoDiv.setAttribute(i, atributos[i]);
         //    }
         //}

        const boton = document.createElement("button");
        //boton.classList.add('accordion');
        //boton.classList.add('active');
       

           // + ((existNombreWorkBox) ? (atributos["NombreWorkBox"]) : ("Evento:" + origen.getAttribute("id"))) + "</button");

        boton.onclick = function () {
            this.nextElementSibling.classList.toggle("show");
            this.nextElementSibling.classList.toggle("hide");
        }

        boton.style = "width:100%;";
        boton.innerText = "Dashboard:";
        nuevoDiv.appendChild(boton);

        var seccion = document.createElement("section");
        seccion.classList.add('show');
        seccion.style =
           `border: 1px solid;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            flex-wrap: wrap;`;

        seccion.appendChild(document.createElement("slot"));

        this.seccion = seccion;
        nuevoDiv.appendChild(seccion);
        this.shadowRoot.appendChild(nuevoDiv);


        this.addEventListener('drop', this.enventDropListener);

    }

    get innerHTML() {
        return this.seccion.innerHTML;
    }

    attributeChangedCallback(name, old, now) {
        if (typeof this.gauge == "undefined")
            return;

        switch (name) {
            case 'value':
                this.gauge.set(now);
                break;
            case 'max':
                this.gauge.maxValue = now;
                break
            case 'min':
                this.gauge.setMinValue(now);
                break
        }
    }

    enventDropListener(event) {
        event.stopPropagation();
        var data = event.dataTransfer.getData("text");
        const origen = document.getElementById(data);
        if (origen.hasAttribute("instance")) {
            const instance = JSON.parse(origen.getAttribute("instance"));
            switch (instance.component) {
                case "emic-dash-panel":
                    var nd = document.createElement("emic-dash-panel");
                    //this.seccion.appendChild(nd);
                    this.appendChild(nd);

                    break;
            }


        }
    }
}

customElements.define("emic-dashboard", EmicDashboard);

class EmicDashPanel extends HTMLElement {
    seccion = document.createElement("section");;
    static namesList = {};
    getNewID() {
        var i;
        for (i = 1; EmicDashboard.namesList[`Dashboard-${i}`]; i++);
        EmicDashboard.namesList[`Dashboard-${i}`] = this;
        return `Dashboard-${i}`;
    }
    static get observedAttributes() {
        return ['direction'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }


    connectedCallback() {
        const style = document.createElement("style");
        /*style.innerHTML =
            `
                :host(:hover) {
                    border : 1px solid;
                }
                `;
			*/
        this.shadowRoot.appendChild(style);
         
        //seccion.classList.add('show');

        this.seccion.style['border']='0px solid';
        this.seccion.style['display'] ='flex';
        this.seccion.style['transition'] ='0.6s ease-in-out';
        this.seccion.style['justify-content'] ='space-evenly';
        this.seccion.style['flex-wrap'] ='wrap';
        this.seccion.style['min-width'] ='10px';
        this.seccion.style['min-height'] ='10px';
        this.seccion.style['padding'] ='10px';
        this.seccion.style['flex-grow'] ='1';

        this.seccion.padre = this;
        this.style = "flex-grow:1;display:flex;"; // height: 100%;
        this.seccion.appendChild(document.createElement("slot"));
        this.shadowRoot.appendChild(this.seccion);
        //this.seccion.addEventListener('drop', this.enventDropListener);


        this.attributeChangedCallback = function(name, old, now) {

            switch (name) {
                case 'direction':
                    this.seccion.style["flex-direction"] = now;
                    break;
            }
        }
    }

    attributeChangedCallback(name, old, now) {

        switch (name) {
            case 'direction':
                this.seccion.style["flex-direction"] = now;
                break;
        }
    }

    enventDropListener(event) {
        event.stopPropagation();
        var data = event.dataTransfer.getData("text");
        const origen = document.getElementById(data);
        if (origen.hasAttribute("instance")) {
            const instance = JSON.parse(origen.getAttribute("instance"));
            switch (instance.component) {
                case "emic-dash-panel":
                    var nd = document.createElement("emic-dash-panel");
                    this.padre.appendChild(nd);
                    for (var [key, value] of Object.entries(instance.attributes)) {
                        nd.setAttribute(key, value);
                    }
                    break;
                case "emic-widget-gauge":
                    var nd = document.createElement("emic-widget-gauge");
                    this.padre.appendChild(nd);
                    for (var [key, value] of Object.entries(instance.attributes)) {
                        nd.setAttribute(key, value);
                    }
                    break;
            }
        }
    }
}

//let sheet = document.createElement('style');
//sheet.textContent = ':host { flex-grow: 1; display: flex;}';
//customElements.define("cool-element", CoolElement, { styleSheet: sheet });

customElements.define("emic-dash-panel", EmicDashPanel);

