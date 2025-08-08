//CODIGO MONOLITICO (A REFACTORIZAR)
class User {
    constructor(nombre, edad, ahorros) {
        this.nombre = nombre;
        this.edad = edad;
        this.sueldo = ahorros;
    }
}
const user1 = new User('Juan Perez', 25, 50000);
function calcValorConIVA(valor, porcIva) {
    return valor + (valor * porcIva)
}
function comprobarUsuarioAdulto(usuario) {
    return usuario.edad >= 18 && usuario.sueldo > 30000
}
const valorTotal = calcValorConIVA(user1.sueldo, 0.15);
const userMayorDeEdad = comprobarUsuarioAdulto(user1);