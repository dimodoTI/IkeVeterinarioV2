import {
    html,
    LitElement,
    css
} from "lit-element";
import {
    connect
} from "@brunomon/helpers"
import {
    store
} from "../../redux/store";


const MEDIA_CHANGE = "ui.media.timeStamp"
const SCREEN = "screen.timeStamp";
export class redFoot extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        this.hidden = false
    }

    static get styles() {
        return css `
        :host{
            display: grid;      
            align-self:stretch;
            justify-self:stretch;           
            background-color:red
        }
        :host([hidden]){
            display:none
        }

        `
    }
    render() {
        return html `
    
            
       
        `
    }

    stateChanged(state, name) {
        if ((name == SCREEN)) {
            this.hidden = true
            if (state.screen.name == "agenda") {
                this.hidden = false
            }

            this.update();
        }
    }


    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: 'media-size'
            },
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            }
        }
    }
}

window.customElements.define("red-foot", redFoot);