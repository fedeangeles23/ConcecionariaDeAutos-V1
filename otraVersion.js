let autos = require('./dataBase/autos')
let personas = require('./dataBase/personas')

let concesionaria = {
    autos: autos,
    personas: personas,
    buscarAuto: function (patente) {
        let autoEncontrado = autos.find(auto => auto.patente == patente) // El método "find" nos devuelve un solo objeto dentro de los que estamos utilizando.        
        if (autoEncontrado) {
            return autoEncontrado
        } else {
            return null
        }
    },
    venderAuto: function (patente) {
        let auto = buscarAuto(patente)

        if (auto.vendido == false) {
            auto.vendido = true

            return auto
        }
    },
    autosParaLaVenta : function () {
        let autosNoVendidos = autos.filter(auto => auto.vendido === false)
        return autosNoVendidos
    },
    autosNuevos : function () {
        let autosParaVender = this.autosParaLaVenta()
        let autosNuevos = autosParaVender.filter(auto => auto.km < 100)
        return autosNuevos
    },
    listaDeVentas: function(){
        let autosVendidos = autos.filter(auto => auto.vendido === true)
        let precios = autosVendidos.map(auto => {
            return auto.precio
        })
        return precios
    },
    totalDeVentas: function (){
       let vendidos = this.listaDeVentas()
       if (vendidos.length !==0) {
            let total = vendidos.reduce((acum,num) => acum + num)
            return total
       }
       return vendidos.length
    },
    puedeComprar : function(auto, persona){
        let cuota = auto.precio / auto.cuotas
    return persona.capacidadDePagoTotal > auto.precio && persona.capacidadDePagoEnCuotas > cuota
    },
    puedeComprar: function (auto,persona) {
        let valorCuota = auto.precio / auto.cuotas
        let puedeEnCuotas = valorCuota <= persona.capacidadDePagoEnCuotas
        let puedePagarTotal = auto.precio <= persona.capacidadDePagoTotal
        return  puedeEnCuotas && puedePagarTotal
    },
    autosQuePuedeComprar: function (persona) {
        let autosParaVender = this.autosParaLaVenta()
        let autosPuedeComprar = autosParaVender.filter(auto => this.puedeComprar(auto,persona))
        return autosPuedeComprar
    }
}

/* console.log(concesionaria.buscarAuto('APL123')); */
/* console.log(concesionaria.venderAuto('APL123')); */
/* console.log(concesionaria.autosParaLaVenta()); */
/* console.log(concesionaria.autosNuevos()); */
/* console.log(concesionaria.listaDeVentas()); */
/* console.log(concesionaria.totalDeVentas()); */
/* console.log(concesionaria.puedeComprar(autos[3],personas[2])); */
/* console.log(concesionaria.autosQuePuedeComprar(personas[0])); */