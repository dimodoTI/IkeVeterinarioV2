import {
    css
} from "lit-element"

export const cardChat = css`
        #cchatDivEtiqueta{
            display: grid; 
            position: relative;
            height:22vh;
            width:100%;
            border-radius:.4rem ;           
            box-shadow: var(--shadow-elevation-4-box);
            grid-template-columns: 4% 96%;
        }
        #cchatBarra[fondo="gris"]{
            background-color:var(--color-gris);
        }
        #cchatBarra[fondo="celeste"]{
            background-color:var(--color-celeste);
        }
        #cchatContenido{
            display: grid; 
            position: relative;
            background-color:var(--color-blanco);
            grid-template-columns: 100%;
            grid-template-rows: 18% 32% 32% 18%;
            grid-gap:.1vh;
        }
        #cchatDivNombre{
            font-size: var(--font-bajada-size);
            font-weight: var(--font-bajada-weight);            
            padding-left: .5rem;
            text-align: left;
            color: var(--color-gris);   
        }         

        #cchatDivFecha{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);            
            color: var(--color-gris);
            text-align: right;
            padding-right: .5rem;
        }

        #cchatFechaNombre{
            display:grid;
            grid-template-columns: 50% 50%;

        }
        #cchatDivDiagnostico{
            align-self: center;
            font-size: var(--font-header-h2-size);         
            padding-left: .5rem;
        }

         #cchatDivTexto{
            font-weight: bold;   
            font-size: var(--font-header-h2-size);
            padding-left: .5rem;
         }
         #cchatDivVerDetalle{
            padding-left: .5rem;
            text-align:left;
            color: var(--color-celeste);
            font-size: var(--font-label-size);
            font-weight: bold;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
         }
         #cchatLblVerDetalle{
            text-decoration: underline;
            cursor:pointer;
            width:fit-content ;
         }
         #cchatLblResponder{
            text-decoration: underline;
            cursor:pointer;
            width:fit-content;
            justify-self: end;
            padding-right: 2vh;
         }
         #cchatLblAtencion{
            text-decoration: underline;
            cursor:pointer;
            width:fit-content;
            justify-self: center;
         }
`