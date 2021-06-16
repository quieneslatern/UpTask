import Swal from 'sweetalert2'

export const actualizarAvance = () => {
    //Select existent task
    const tareas = document.querySelectorAll('li.tarea')
    let avance = 0
    let tareasCompletas = 0
    console.log(tareas.length)
    if(tareas.length) {
        tareasCompletas = document.querySelectorAll('i.completo')
        
        //Calculete progress
        avance = Math.round((tareasCompletas.length / tareas.length ) * 100, 2);
        console.log('avance: ' + avance)
    }       

    //Show progress
    const porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance+'%'

    if(avance === 100) {
        Swal.fire(
            'Completaste el Proyecto',
            'Felicidades has terminado tus tareas', 
            'success'
        )
    }
}