
class EmicWidgetLabel extends HTMLElement {
    static namesList = {};
    getNewID() {
        var i;
        for (i = 1; EmicWidgetSwitch.namesList[`label-${i}`]; i++);
        EmicWidgetSwitch.namesList[`label-${i}`] = this;
        return `label-${i}`;
    }
    static get observedAttributes() {
        return ["value"];
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const div= document.createElement("div");

        //this.appendChild(element);
        const style = document.createElement("style");
        this.shadowRoot.appendChild(div);
        //style.innerHTML =

        this.shadowRoot.appendChild(style);

        if (!this.hasAttribute('id')) {
            this.setAttribute('id', this.getNewID());
        }

        if (!this.hasAttribute('value')) {
            this.setAttribute('value', this.getAttribute("id");
        }

        this.addEventListener('drop', this.eventDropListener);
        this.addEventListener('dragover', this.eventDragoverListener);
        this.addEventListener('dragleave', this.eventDragleaveListener);

    }

    attributeChangedCallback(name, old, now) {
        if (typeof this.gauge == "undefined")
            return;

        switch (name) {
            case 'value':
                //this.gauge.set(now);
                break;
        }


    }

    set value(newVal) {
        this.setAttribute('value', newVal);
    }

    get value() {
        return this.getAttribute('value');
    }



    eventDragoverListener(event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.parentElement.getAttribute("direction") === "column") {
            if (event.offsetY < (this.clientHeight / 2)) {
                this.style.borderTop = "3px solid red";
                this.style.borderBottom = "1px solid black";
            }
            else {
                this.style.borderBottom = "3px solid red";
                this.style.borderTop = "1px solid black";
            }
        }

        if (this.parentElement.getAttribute("direction") === "row") {

            if (event.offsetX < (this.clientWidth / 2)) {
                this.style.borderLeft = "3px solid red";
                this.style.borderRight = "1px solid black";
            }
            else {
                this.style.borderRight = "3px solid red";
                this.style.borderLeft = "1px solid black";
            }
        }
    }

    eventDragleaveListener(event) {
        event.stopPropagation();
        event.preventDefault();
        this.style.border = "1px solid black";
    }

    eventDropListener(event) {
        event.stopPropagation();
        var data = event.dataTransfer.getData("text");
        const origen = document.getElementById(data);
        if (origen.hasAttribute("instance")) {
            const instance = JSON.parse(origen.getAttribute("instance"));
            var nd = document.createElement("emic-widget-switch");
            if (this.parentElement.getAttribute("direction") === "column") {
                if (event.offsetY < (this.clientHeight / 2)) {
                    this.parentElement.insertBefore(nd, this);
                }
                else {
                    this.parentElement.insertBefore(nd, this.nextSibling);
                }
            }
            else {
                if (event.offsetX < (this.clientWidth / 2)) {
                    this.parentElement.insertBefore(nd, this);
                }
                else {
                    this.parentElement.insertBefore(nd, this.nextSibling);
                }

            }
            this.style.border = "1px solid black";

            for (var [key, value] of Object.entries(instance.attributes)) {
                nd.setAttribute(key, value);
            }
        }
    }

}




customElements.define("emic-widget-label", EmicWidgetLabel);
