const form = document.querySelector("#formulario");
const inputs = document.querySelectorAll('#formulario input');
const button = document.querySelector('#formulario button');
const ArrayDatos = [];

const expresiones = {
    nomApe: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    empresa: /^[a-zA-Z0-9À-ÿ\s]+/,
    correo: /^[a-zA-Z0-0_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    saldo: /^[0-9]+/
}

const campos = {
    inputname: false,
    inputenterprise: false,
    inputemail: false,
    inputsalary: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nomApe, e.target, 'inputname', "Por favor, ingrese su nombre y apellido");
            break;
        case "empresa":
            validarCampo(expresiones.empresa, e.target, 'inputenterprise', "Por favor, ingrese nombre de la empresa");
            break;
        case "salario":
            validarCampo(expresiones.saldo, e.target, 'inputsalary', "Solo se permiten números");
            break;
        case "email":
            validarCampo(expresiones.correo, e.target, 'inputemail', "El formato de email ingresado no es correcto");
            break;
    }
}

const validarCampo = (expresion, input, campo, message) => {

    if (expresion.test(input.value)) {
        document.getElementById(`${campo}`).classList.remove("is-invalid");
        input.nextElementSibling.classList.remove("invalid-feedback");
        input.nextElementSibling.innerText = "";
        campos[campo] = true;
        if (document.getElementById('aviso')) {
            document.getElementById('aviso').remove();
        }

    } else {
        document.getElementById(`${campo}`).classList.add("is-invalid");
        input.nextElementSibling.classList.add("invalid-feedback");
        input.nextElementSibling.innerText = message;
        campos[campo] = false;
    }
}

const guardarDatos = (e) => {
    const nombreYApellido = document.getElementById("inputname").value;
    const empresaNombre = document.getElementById("inputenterprise").value;
    const sueldo = document.getElementById("inputsalary").value;
    const email = document.getElementById("inputemail").value;
    const nuevaEtiqueta = document.createElement('div');
    e.preventDefault();

    if (campos.inputname && campos.inputenterprise && campos.inputsalary && campos.inputemail) {

        const Dato = {
            dato1: nombreYApellido,
            dato2: empresaNombre,
            dato3: sueldo,
            dato4: email
        };

        if (sueldo > 100000) {
            ArrayDatos.push(Dato);
            crearTabla(Dato);
        }

        form.reset()
    } else {
        document.getElementById('send').insertAdjacentElement('afterend', nuevaEtiqueta);
        document.getElementById('send').nextElementSibling.classList.add("alert", "alert-dark");
        document.getElementById('send').nextElementSibling.setAttribute('role', 'alert');
        document.getElementById('send').nextElementSibling.setAttribute('id', 'aviso')
        document.getElementById('send').nextElementSibling.innerText = "El formulario no ha sido completado correctamente";
    }
}

const crearTabla = (obj) => {
    const posicion = document.getElementById('formulario');
    const divTabla = document.createElement('div');
    const tabla = document.createElement('table');
    tabla.classList.add("table", "table-stripped");
    const dolar = 245;

    if (document.getElementById('table')) {
        const t = document.getElementById('table');

        let fila = t.insertRow(-1);

        let celda = fila.insertCell(0);
        celda.textContent = obj.dato1;

        celda = fila.insertCell(1);
        celda.textContent = obj.dato2;

        celda = fila.insertCell(2);
        celda.textContent = obj.dato3;

        celda = fila.insertCell(3);
        celda.textContent = (obj.dato3) / dolar;

        celda = fila.insertCell(4);
        celda.textContent = obj.dato4;


    } else {
        posicion.insertAdjacentElement('afterend', divTabla).classList.add("ofertas");
        divTabla.insertAdjacentElement("afterbegin", tabla).setAttribute("id", "table");
        let t = document.getElementById('table');
        t.style.marginLeft = "auto";
        let fila = tabla.insertRow(0);

        let celda = fila.insertCell(0);
        celda.textContent = "Nombre y Apellido";

        celda = fila.insertCell(1);
        celda.textContent = "Empresa";

        celda = fila.insertCell(2);
        celda.textContent = "Sueldo";

        celda = fila.insertCell(3);
        celda.textContent = "Sueldo en Dolares";

        celda = fila.insertCell(4);
        celda.textContent = "Email";

        fila = t.insertRow(-1);

        celda = fila.insertCell(0);
        celda.textContent = obj.dato1;

        celda = fila.insertCell(1);
        celda.textContent = obj.dato2;

        celda = fila.insertCell(2);
        celda.textContent = obj.dato3;

        celda = fila.insertCell(3);
        celda.textContent = (obj.dato3) / dolar;

        celda = fila.insertCell(4);
        celda.textContent = obj.dato4;

    }

}

form.addEventListener('submit', guardarDatos);

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
