const form = document.querySelector("#formulario");
const lista = document.getElementById("lista")
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
        if (document.getElementsByClassName('alert')) {
            document.getElementById('send').nextElementSibling.classList.remove('alert');
            document.getElementById('send').nextElementSibling.removeAttribute('role');
            document.getElementById('send').nextElementSibling.innerText = "";
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
            ArrayDatos.sort((a, b) => b.dato3 - a.dato3);
        }

        form.reset()

        if(document.getElementById('table')){
            document.getElementById('botonLista').nextElementSibling.remove();
        }
        if(document.getElementsByClassName('alert')){
            document.getElementById('lista').nextElementSibling.classList.remove('alert');
            document.getElementById('lista').nextElementSibling.removeAttribute('role');
            document.getElementById('lista').nextElementSibling.innerText = "";
        }

    } else {
        document.getElementById('send').nextElementSibling.classList.add('alert', 'alert-dark');
        document.getElementById('send').nextElementSibling.setAttribute('role', 'alert');
        document.getElementById('send').nextElementSibling.innerText = 'El formulario no ha sido completado correctamente';
    }
}

const crearTabla = (e) => {
    const posicion = document.getElementById('botonLista');
    const divTabla = document.createElement('div');
    
    if(ArrayDatos.length == 0){
        document.getElementById('lista').nextElementSibling.classList.add("alert", "alert-dark");
        document.getElementById('lista').nextElementSibling.setAttribute('role', 'alert');
        document.getElementById('lista').nextElementSibling.innerText = "No se han enviado datos";
    }else{
        if(document.getElementById('table')){
            document.getElementById('lista').nextElementSibling.classList.add("alert", "alert-dark");
            document.getElementById('lista').nextElementSibling.setAttribute('role', 'alert');
            document.getElementById('lista').nextElementSibling.innerText = "Lista creada";
        }else{
    
            const tabla = document.createElement('table');
            tabla.classList.add("table", "table-striped-columns");
            const dolar = 245;
            e.preventDefault();
        
            posicion.insertAdjacentElement('afterend', divTabla).classList.add("ofertas");
            divTabla.insertAdjacentElement('afterbegin', tabla).setAttribute("id", "table");
            let t = document.getElementById('table');
            let d = document.getElementsByClassName("ofertas");
            divTabla.style.margin = "auto";
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
        
            for(let i = 0; i<ArrayDatos.length; i++){
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



lista.addEventListener('click', crearTabla);
form.addEventListener('submit', guardarDatos);

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
