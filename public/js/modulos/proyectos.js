import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');


if(btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        //console.log(urlProyecto);
        //return;

        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
        }).then((result) => {
            if (result.isConfirmed) {

                const url = `${location.origin}/proyectos/${urlProyecto}`;
                //console.log(url);
                
                axios.delete(url, {param: urlProyecto})
                    .then(function(respuesta) {
                       // console.log(respuesta);
                       // return;
        
                        Swal.fire(
                            'Borrado!',
                            respuesta.data,
                            'success'
                        )
        
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 30000);
                    })
                    .catch((err) => {
                        Swal.fire({
                            type : 'error',
                            title : 'Hubo un error',
                            text : 'No se pudo eliminar el proyecto'
                        })
                    });
                    
            }
        })
    })
}

export default btnEliminar