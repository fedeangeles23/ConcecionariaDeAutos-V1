let autos = require('./dataBase/autos')
let personas = require('./dataBase/autos')

let concesionaria = {
    autos: autos,
    personas: personas,
    buscarAuto: function (patente) {
        let autoEncontrado = autos.find(auto => auto.patente == patente)
        return autoEncontrado ? autoEncontrado : null
    },
    venderAuto: function (patente) {
        let autoAVender = this.buscarAuto(patente)
        return autoAVender.vendido = true 
    },
    autosParaLaVenta: function () {
        return autos.filter(auto => !auto.vendido)
    },
    autosNuevos: function(){
        return autosParaLaVenta().filter(auto => auto.km < 100)
    },
    listaDeVentas: function(){
        let autosVendidos = autos.filter(auto => auto.vendido === true)
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas: function (){
        let vendidos = this.listaDeVentas()
        let total = vendidos.length !==0 ? vendidos.reduce((acum,num) => acum + num) : 0
        return total
    },
    puedeComprar : function(auto, persona){
        let cuota = auto.precio / auto.cuotas
        return persona.capacidadDePagoTotal > auto.precio && persona.capacidadDePagoEnCuotas > cuota
    },
    autosQuePuedeComprar: function(persona){
        let autosDisponibles = this.autosParaLaVenta()
        return autosDisponibles.filter( auto => this.puedeComprar(auto,persona))
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