export const idiomas = {
    ES: {
        diasCorto: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        mesCorto: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        inicioSesion: {
            titulo: "Iniciá sesión",
            subTitulo: "Completá tus datos para ingresar a tu cuenta",
            mail: "Ingresá tu mail",
            mail_ph: "nombre@mail.com",
            clave: "Ingresá tu contraseña",
            datos: "Recordar mis datos",
            btn1: "Iniciar sesión",
            btn2: "Olvidé mi contraseña",
            btn3: "Ingresar sin registrarme",
            errorMail: {
                err1: "Mail incorrecto",
                err2: "wer"
            },
            errorClave: {
                err1: "Tu contraseña debe tener 4 caraceres",
                err2: "wer"
            },
            warningTitulo: ["Error en login."],
            warningCuerpo: ["Mail o password incorrecta"]
        },

        recuperaClave: {
            titulo: "Recuperá tu contraseña",
            subTitulo: "Completá tus datos para recuperar tu contraseña",
            mail: "Ingresá tu mail",
            mailPlaceholder: "nombre@mail.com",
            documento: "Ingresá el DNI del titular",
            documentoPlaceholder: "99999999",
            btn1: "Recuperar contraseña",
            errorMail: {
                err1: "Mail incorrecto",
                err2: "wer"
            },
            errorDocumento: {
                err1: "Documento incorrecto",
                err2: "wer"
            }
        },

        recuperaClaveMsg: {
            titulo: "¡Todo listo para recuperar tu contraseña!",
            subTitulo: "Ingresá a tu casilla de mail y seguí los pasos para recuperar tu contraseña."
        },

        crearClave: {
            titulo: "Creá tu contraseña",
            subTitulo: "Creá tu nueva contraseña para volver a acceder a tu cuenta.",
            clave1: "Ingresá tu nueva contraseña",
            clave2: "Repetí tu nueva contraseña",
            btn1: "Crear nueva contraseña",
            errorClave1: {
                err1: "Clave1 incorrecto",
                err2: "wer"
            },
            errorClave2: {
                err1: "Clave2 incorrecto",
                err2: "wer"
            }
        },
        crearClaveMsg: {
            titulo: "¡Genial!",
            subTitulo: "Tu contraseña fue creada con éxito.",
            btn1: "Ingresar a mi cuenta"
        },
        misConsultas: {
            titulo: "Hola",
            subTitulo: "Crea el perfil de tus Mascotas y accedé a su historia clínica",
            lblFiltro: "Seleccione su puesto:",
            consulta: "Tenés una consulta",
            ingresar: "Ingresar",
            footerTitulo1: "¿Necesitás ayuda?",
            footerTitulo2: "Estamos para lo que necesites.",
            footerLeyenda: "Solicitar asistencia",
            warningTitulo: ["Error de conexion."],
            warningCuerpo: ["Intente nuevamente"]
        },
        pie: {
            inicio: "Inicio",
            agenda: "Agenda",
            historial: "Historial",
            mascota: "Mascotas",
            consulta: "Consultas",
            vacuna: "Vacunas",
            foto: "Fotos",
            lblAyuda: "¿Necesitás ayuda?.",
            lblAyuda01: "¿ayuda?.",
            btnAyuda: "Solicitar asistencia"
        },
        agendas: {
            lblFiltro: "Seleccione su puesto:"
        },
        ate_agendas: {
            titulo: "Agenda",
            subTitulo: "Consultá tus próximas consultas de la semana.",
            tituloLista: "Tus próximas consultas",
            warningTitulo: ["Error de conexion."],
            warningCuerpo: ["Intente nuevamente"]
        },
        his_Agendas: {
            titulo: "Historial de atenciones",
            subTitulo: "Selecciona la reserva.",
            tituloLista: "Reservas del día",
            lblFiltro: "Seleccione su puesto:",
            warningTitulo: ["Error de conexion."],
            warningCuerpo: ["Intente nuevamente"]
        },
        ate_videos: {
            conectando: "Conectando ...",
            titulo: "Consulta Online",
            subTitulo: "Accedé a la atención."
        },
        ate_diagnosticos: {
            titulo: "Consulta Online",
            subTitulo: "Accedé a la atención.",
            tituloDetalle: "Indicá el diagnóstico y pasos a seguir:",
            diagnostico_ph: "Tomar jarabe para la tos CanTos 200ml. 1 tapita cada 8hs durante 7 días. Si el cuadro se prolonga volver a consultar.",
            btnAdjuntar: "Adjuntar archivo",
            btnAceptar: "Grabar",
            btnCancelar: "Cancelar",
            warningTitulo: ["Campo diagnostico."],
            warningCuerpo: ["No puede ser nulo"]
        },
        diagnosticosDetalle: {
            tituloAtencion: "Detalle de la atencion",
            lblDiagnostico: "Diagnóstico",
            lblComienzo: "Comenzó: ",
            lblFinal: "Finalizó: ",
            tituloconsulta: "Detalle de la reserva",
            expediente: "Reserva #",
            paciente: "Paciente: ",
            motivo: "Motivo: ",
            fecha: "Fecha: ",
            hora: "Hora: ",
            veterinario: "Veterinario: "
        },
        ate_diagnosticosDetalle: {
            titulo: "Consulta Online",
            subTitulo: "Accedé a la atención."
        },
        his_DiagnosticosDetalle: {
            titulo: "Detalle de consulta",
            subTitulo: "Acá vas a encontrar el expediente correspondiente a una consulta.",
        },
        sol_diagnosticodetalle: {
            titulo: "Detalle de la atención",
            subTitulo: "Datos correspondiente a la consulta.",
        },
        atencionesMascotas: {
            titulo: "Historial de atenciones",
            subTitulo: "Selecciona la reserva.",
            tituloLista: "Consultas del día",
            warningTitulo: ["Error de conexion."],
            warningCuerpo: ["Intente nuevamente"]
        },
        listaReservas: {
            tituloLista: "Listado de reservas",
            verDetalle: "Ver detalle"
        },
        ate_listaReservas: {
            titulo: "Consulta Online",
            subTitulo: "Accedé a la atención."
        },
        his_ListaReservas: {
            titulo: "Historial de atenciones",
            subTitulo: "De la mascota."
        },
        notificacionReserva: {
            titulo: "Chat reservas",
            subTitulo: "De las mascotas.",
            tituloLista: "Listado de chat",
            verChat: "Chat",
            verAtencion: "Atencion",
            responder: "Responder",
            btnGrabar: "Grabar",
            btnCancelar: "Cancelar",
            warningTitulo: ["Campo respuesta."],
            warningCuerpo: ["El valor no puede ser nulo."]
        },
        ate_Chat: {
            titulo: "Consulta Online",
            subTitulo: "Accedé a la atención."
        },
        sol_Chat: {
            titulo: "Chat detalle",
            subTitulo: "De la reserva.",
            warningTitulo: ["Campo respuesta."],
            warningCuerpo: ["El valor no puede ser nulo."]
        },
        chatApp: {
            tituloChat: ""
        },
        his_Chat: {
            titulo: "Chat detalle",
            subTitulo: "De la reserva."
        },
        chatAlta: {
            titulo: "Chat reservas",
            subTitulo: "De las mascotas."
        },
        warning: {
            warningTitulo: ["Error de conexion."],
            warningCuerpo: ["Intente nuevamente"]
        }
    }

}