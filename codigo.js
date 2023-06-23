const form = document.querySelector("#formulario");
const lista = document.getElementById("botonLista")
const inputs = document.querySelectorAll('#formulario input');
const button = document.querySelector('#formulario button');
const ArrayDatos = [];

const expresiones = {
    nomApe: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    empresa: /^[a-zA-Z0-9À-ÿ\s]+/,
    correo: /^[a-zA-Z0-0_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    saldo: /^[0-9]+/
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

        if (document.getElementById('alertaFormulario')) {
            removerAviso('send');
        }

    } else {
        document.getElementById(`${campo}`).classList.add("is-invalid");
        input.nextElementSibling.classList.add("invalid-feedback");
        input.nextElementSibling.innerText = message;

    }
}

const guardarDatos = (e) => {
    e.preventDefault();
    const nombreYApellido = document.getElementById("inputname").value;
    const empresaNombre = document.getElementById("inputenterprise").value;
    const sueldo = document.getElementById("inputsalary").value;
    const email = document.getElementById("inputemail").value;

    if (nombreYApellido && empresaNombre && sueldo && email) {

        const Dato = {
            dato1: nombreYApellido,
            dato2: empresaNombre,
            dato3: sueldo,
            dato4: email
        };

        if (sueldo > 100000) {
            ArrayDatos.push(Dato);
            ArrayDatos.sort((a, b) => b.dato3 - a.dato3);
        }

        form.reset();

        if (document.getElementById('table')) {
            document.getElementById('conteinerLista').nextElementSibling.remove();
        }
        if (document.getElementById('alertaArrayVacio')) {
            removerAviso('lista');
        }
        if(document.getElementById('alertaListaCreada')){
            removerAviso('lista')
        }

    } else {
        insertarAviso('send', 'alertaFormulario', 'El formulario no ha sido completado correctamente');
    }
}

const crearTabla = (e) => {
    const posicion = document.getElementById('conteinerLista');
    const divTabla = document.createElement('div');

    if (ArrayDatos.length == 0) {
        insertarAviso('lista', 'alertaArrayVacio', "No se han enviado datos");
    } else {
        if (document.getElementById('table')) {
            insertarAviso('lista', 'alertaListaCreada', "Lista creada");
        } else {
            e.preventDefault();
            const tabla = document.createElement('table');
            const dolar = 245;
            tabla.classList.add("table", "table-striped-columns");
            posicion.insertAdjacentElement('afterend', divTabla).classList.add("ofertas");
            divTabla.insertAdjacentElement('afterbegin', tabla).setAttribute("id", "table");
            divTabla.style.margin = "auto";
            tabla.style.marginLeft = "auto";
            let t = document.getElementById('table');
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

            for (let i = 0; i < ArrayDatos.length; i++) {
                const obj = ArrayDatos[i];
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
    }
}

const insertarAviso = (direccion, nombreId, message) => {
    document.getElementById(direccion).nextElementSibling.classList.add('alert', 'alert-dark');
    document.getElementById(direccion).nextElementSibling.setAttribute('role', 'alert');
    document.getElementById(direccion).nextElementSibling.setAttribute('id', nombreId);
    document.getElementById(direccion).nextElementSibling.innerText = message;
}

const removerAviso = (direccion) => {
    document.getElementById(direccion).nextElementSibling.classList.remove('alert');
    document.getElementById(direccion).nextElementSibling.classList.remove('alert-dark');
    document.getElementById(direccion).nextElementSibling.removeAttribute('role');
    document.getElementById(direccion).nextElementSibling.removeAttribute('id');
    document.getElementById(direccion).nextElementSibling.innerText = "";
}

lista.addEventListener('click', crearTabla);
form.addEventListener('submit', guardarDatos);

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
