// var mysql = require('mysql');
// var conexion = mysql.createConnection({
//     host:'192.254.231.2',
//     database:'miamibox_trk',
//     user:'miamibox_trkdev',
//     password:'pty2020*',
// });
// conexion.connect(function(error){
//     if(error){
//         throw error;
//     }else{
//         console.log('conexion exitosa');
//     }
// })

const { createBot, createProvider, createFlow, addKeyword, EVENTS} = require('@bot-whatsapp/bot')
require("dotenv").config();

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const path = require("path")
const fs = require("fs");
// const chat = require("./chatGPT")

const portal_http = require('@bot-whatsapp/portal');
const { resourcesage } = require('process');
const { queryObjects } = require('v8');

const menuPath = path.join(__dirname, "mensajes", "menu.txt")
const menu = fs.readFileSync(menuPath,"utf8")

const ayudaPath = path.join(__dirname, "mensajes", "ayuda.txt")
const ayuda = fs.readFileSync(ayudaPath,"utf8")


const flowWelcome = addKeyword(EVENTS.WELCOME)
.addAnswer('🤖',{    
  delay:100,},
  async (ctx, ctxFn) =>{
    
    if (ctx.body.includes(['Salir'])){            
        await ctxFn.flowDynamic("Estas Saliendo del chat, sí quieres volver a empezar escribe `Empezar`.")
    }
    else{ await ctxFn.flowDynamic("Hola, Soy el chat de ```miamibox``` y no entiendo tu pregunta. Sí necesitas información escribe `Menú`")
    }
  })

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'días', 'tardes', 'noches','Empezar','Hello','Hellow','hello','hellow','Dias,','dia','Día'])
    .addAnswer('👋 Hola bienvenido al chat de MiamiBox')
    .addAnswer('Para acceder al Menú, por favor escriba la palabra `Menú` ')
    .addAnswer('¿Qué pasa sí mi pedido aún no se entrega? escribe `Informame`')

const flowHorario = addKeyword(EVENTS.ACTION)
    .addAnswer('Nuestros horarios de atención son:')
    .addAnswer('Lunes a Viernes 8am a 5pm')
    .addAnswer('Sábados 8am a 1pm')
    .addAnswer('Para acceder al Menú, escriba `Menú` ')

const flowRastreo = addKeyword(EVENTS.ACTION)
    .addAnswer('🖥️ Puedes monitorear tus paquetes mediante este enlace:')
    .addAnswer('https://www.miamiboxpanama.com/rastreador-tracking/')
    .addAnswer(' ')
    .addAnswer('Sí presentas problemas al buscar tus pedidos o simplemente no aparecen, puedes escribir `informame`')
    .addAnswer('Para acceder al Menú, por favor escriba la palabra `Menú` ')


    
const flowCasillero = addKeyword(EVENTS.ACTION)
    .addAnswer('🖥️ Puedes verificar tus paquetes en PTY mediante este enlace:.')
    .addAnswer('https://www.miamiboxpanama.com/rastreo-pago/')
    .addAnswer('También tenemos la opción de pagos por Yappy o ACH y adelantar la preparación de tus paquetes.')
    .addAnswer(' ')
    .addAnswer('Para acceder al Menú, por favor escriba la palabra `Menú` ')



const flowPagos = addKeyword(EVENTS.ACTION)
    .addAnswer('💲 Nuestros métodos de pagos son:')
    .addAnswer('YAPPY, ACH')
    .addAnswer('Escribe su opción preferida `Yappy` o `ACH`')
    .addAnswer('Recuerda siempre enviar el comprobante al correo ')
    .addAnswer('```RECEPCION@MIAMIBOXPANAMA.COM```')

            const flowYappy = addKeyword(['yappy'])
            .addAnswer('📱 Abre tu app de Yappy, búscanos en el directorio Empresarial Miamibox (logo Azul y Amarillo).', {
                media: "https://www.miamiboxpanama.com/wp-content/uploads/2024/09/Logo-mb.jpg"
            })
            .addAnswer('Si ya cuentas con la app de (yappy), puedes acceder mediante este link para un pago directo.')
            .addAnswer('https://yappypa.page.link/Zi7X?hash=fmlUkHZFTMQer2spjXINKPTHmRAJpoDIfpUVqjE+aj52FV4TIepXmCxsHlKhv++H')
            .addAnswer(' ')
            .addAnswer('Para acceder al Menú, por favor escriba la palabra `Menú` ')


            const flowbanco = addKeyword(['ach'])
            .addAnswer('📱 Abre tu app del banco General. /Transaccionar/A terceros/ Agregar nueva cuenta destino')
            .addAnswer('Número de cuenta *Corriente* es: 03-51-01-093991-7')
            .addAnswer('Para un acceso más rápido haga click aquí :',{
                delay:200,
            })
            .addAnswer('https://bgeneral.onelink.me/Bzqf/tgsod77l')
            .addAnswer(' ')
            .addAnswer('Para acceder al Menú, por favor escriba la palabra `Menú` ')



const flowDomicilios = addKeyword(EVENTS.ACTION)
        .addAnswer(' ',{
            delay:200,})

        .addAnswer('Domicilio aréa metropolitana 2.75$')
        .addAnswer('Aréa fuera de la Ciudad conlleva cargo extra.')
        .addAnswer('Para envíos fuera de la Ciudad, la `Asesora` le ayudará.')
        .addAnswer(' ')
        .addAnswer('Porfavor indicar dirección de entrega.',
        {capture : true},

        async (ctx, {gotoFlow, fallBack, flowDynamic}) => {
            
            await flowDynamic('Dirección proporcionada....')
            await flowDynamic(ctx.body)
            return gotoFlow(flowAgente)
            
        })


const flowMaritimo = addKeyword(EVENTS.ACTION)
        .addAnswer('Estas en la seccón de Carga marítima')
        .addAnswer('Porfavor escribir al correo: ```VENTAS@MIAMIBOXPANAMA.COM```  los siguientes datos:')
        .addAnswer('Dimensión del producto [En pulgadas], ejemplo: *Alto*, *Largo*, *Ancho*. Tambien incluir *peso* y *Precio* y descripción del articulo',
        {capture : true},
        async (ctx, {gotoFlow, fallBack, flowDynamic}) => {

            await flowDynamic('Información proporcionada....')
            await flowDynamic(ctx.body)
           return gotoFlow(flowAgente)
        })       

const flowAgente = addKeyword(['Asesora','asesora','Madera'])
        .addAnswer('En breve nuestra `Asesora` le atendera.')
        .addAnswer(' Al termina su consulta. Escriba `Salir`',
        {capture : true},

        async (ctx, {gotoFlow, fallBack, flowDynamic}) => {
            if  (!["Salir","salir"].includes(ctx.body)){
                return fallBack(
                    "Agente escribiendo..✍🏼"
                );
            }
            switch (ctx.body){
                case "Salir":
                    return await flowDynamic("Estas Saliendo del chat, sí quieres volver a empezar escribe `Empezar`.")
                case "salir":
                    return await flowDynamic("Estas Saliendo del chat, sí quieres volver a empezar escribe `Empezar`.")

            }})

// const flowChat = addKeyword('chatgpt')
// .addAnswer('Funcion bot')
// .addAnswer("Hace tu consulta", { capture: true }, async (ctx, ctxFn) => {
//     const prompt = promptConsultas
//     const consulta = ctx.body
//     const answer = await chat(prompt, consulta)
//     await ctxFn.flowDynamic(answer.content)
// })

// const flowTrack = addKeyword('Track')

// .addAnswer('Dime tu tracking',{
//     capture: true }, 
//     async (ctx, { flowDynamic}) => {
//         var track = 0;
//         var status = 0;
//         var date = 0;

    //     conexion.query("SELECT nrastreo,status,date FROM tn_data WHERE nrastreo LIKE '%$ctx.body'", function(error,results,fields){
    //         if(error)
    //         throw(error)            
    //          results.forEach(result =>  {
    //             console.log(result)
    //             track = result.nrastreo;
    //             status = result.status;
    //             date= result.date;                                
    //         });         
    //     })        
    //     await flowDynamic('El numero de tracking proporcionado:')
    //     await flowDynamic(track)
    //     await flowDynamic(date)
    //     await flowDynamic(status)       
    //      conexion.end();
    // })


    const flowClaves = addKeyword(['ok','Ok','Excelente','excelente','Gracias','gracias','Chao','chao','Vale','vale','Placer','placer','Gusto','gusto'])
                .addAnswer("Un placer atenderle 👍🏼.",{
                    delay:200,
                },)
    const flowClavesDomicilio = addKeyword(['Entregas','Entrega','entregas','entrega','Domicilio','domicilio','Entregar','entregar'])
                .addAnswer("Para completar su petición, te invito al menú escribiendo la palabra *Menú*, opción 5️⃣ . Gracias.",{
                    delay:200,
                },)

    const flowImagen  = addKeyword(EVENTS.MEDIA)
        .addAnswer( async(ctx, ctxFn, {flowDynamic})=>{
            await flowDynamic(flowAgente)}    
        )

    const flowAudio = addKeyword(EVENTS.VOICE_NOTE)
        .addAnswer( async(ctx, ctxFn, {flowDynamic})=>{
            await flowDynamic(flowAgente)}    
        )


    const menuFlow = addKeyword(['Menú','Menu','menu','menú'])
      .addAnswer(
        menu,
        {capture : true},

        async (ctx, {gotoFlow, fallBack, flowDynamic}) => {
            if  (!["1","2","3","4","5","6","0"].includes(ctx.body)){
                return fallBack(
                    "Respues no válida, por favor selecciona una de la opciones."
                );
            }
            switch (ctx.body){
                case "1":
                    return gotoFlow(flowHorario);
                case "2":
                    return gotoFlow(flowRastreo);
                case "3":
                    return gotoFlow(flowCasillero);  
                case "4":
                    return gotoFlow(flowPagos);
                case "5":
                    return gotoFlow(flowDomicilios);
                case "6":
                    return gotoFlow(flowMaritimo);
                case "0":
                    return await flowDynamic(
                        "Saliendo... Puedes volver a empezar escribiendo `Empezar`"                     
                    ) ;                     
                }})

      const ayudaFlow = addKeyword(['Informame','informame','INFORMAME',])
      .addAnswer(
        ayuda,
        {capture : true},

        async (ctx, {gotoFlow, fallBack, flowDynamic}) => {
            if  (!["informame","Informame","INFORMAME"].includes(ctx.body)){
                return fallBack(
                    "Puedes escribir `Menú` para volver al menú principal"
                );
            }
            switch (ctx.body){
                case "informame":
                    return gotoFlow(ayuda);
                case "INFORMAME":
                    return gotoFlow(ayudaFlow);
                case "Informame":
                    return gotoFlow(ayudaFlow);
                case "Salir":
                    return await flowDynamic(
                        "Saliendo... Puedes volver a acceder a este menú escribiendo `Menú`"
                    ) ;                    
            }
        }
      )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([,flowClaves,flowPrincipal,flowWelcome, flowRastreo, flowCasillero, flowPagos ,flowYappy, flowbanco,flowDomicilios,menuFlow,flowHorario,ayudaFlow, flowAgente, flowMaritimo,flowClavesDomicilio,flowImagen])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}
main()