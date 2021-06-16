const { default: axios } = require("axios");
const { default: Swal } = require("sweetalert2");
const { actualizarAvance } = require('../funciones/avance')

const tareas = document.querySelector('.listado-pendientes');

if(tareas) {

    tareas.addEventListener('click', e => {
        //console.log(e.target.classList);
        if(e.target.classList.contains('fa-check-circle')) {
            icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then(function(respuesta) {
                    //console.log(respuesta)
                    if(respuesta.status === 200) {
                        icono.classList.toggle('completo')

                        actualizarAvance();
                    }
                })
        }
        if(e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;

            
            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                const url = `${location.origin}/tareas/${idTarea}`;

                axios.delete(url, {params: { idTarea }})
                    .then(function(respuesta) {
                        if(respuesta.status === 200) {
                            tareaHTML.parentElement.removeChild(tareaHTML);
                            Swal.fire(
                                'Tarea Eliminada',
                                respuesta.data, 
                                'success'
                            )

                            actualizarAvance();
                        }
                        
                    })
            })
        }
    });
}