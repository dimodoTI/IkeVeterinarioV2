import {
    css
} from "lit-element"

export const cardNotif = css`
        #cnotiDivEtiqueta{
            display: grid; 
            position: relative;
            height:22vh;
            width:100%;
            border-radius:.4rem ;           
            box-shadow: var(--shadow-elevation-4-box);
            grid-template-columns: 4% 96%;
        }
        #cnotiBarra[fondo="gris"]{
            background-color:var(--color-gris);
            border-radius :.4rem 0 0 .4rem;           
        }
        #cnotiBarra[fondo="celeste"]{
            background-color:var(--color-celeste);
            border-radius :.4rem 0 0 .4rem;           
        }
        #cnotiContenido{
            display: grid; 
            position: relative;
            background-color:var(--color-blanco);
            grid-template-columns: 100%;
            grid-template-rows: 18% 32% 32% 18%;
            grid-gap:.1vh;
        }
        #cnotiDivFecha{
            font-size: var(--font-label-size);
            font-weight: var(--font-label-weight);            
            color: var(--color-gris);
            text-align: right;
            padding-right: .5rem;
        }
        #cnotiDivTitulo{
            align-self: center;
            font-size: var(--font-header-h2-size);         
            padding-left: .5rem;
        }

        #cnotiDivTexto{
            font-weight: bold;   
            font-size: var(--font-header-h2-size);
            padding-left: .5rem;
            color: var(--color-gris);
        }
        #cnotiDivVerDetalle{
            padding-left: .5rem;
            text-align:left;
            color: var(--color-celeste);
            font-size: var(--font-label-size);
            font-weight: bold;
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        #cnotiLblVer{
            text-decoration: underline;
            cursor:pointer;
            width:fit-content ;
            justify-self: end;
            padding-right: 2vh;
         }    
        #cnotiLblLink{
            text-decoration: underline;
            cursor:pointer;
            width:fit-content;
            justify-self: start;
            padding-left: 2vh;
        }
`