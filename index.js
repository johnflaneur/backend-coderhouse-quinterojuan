/* DESAFIO ENTREGABLE NUM 2 */

const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        async function exe() {
            await fs.promises.readFile(`./${nombreArchivo}`, 'utf-8')
                .then(async (data) => {
                    if(data.length === 0){
                        console.log('el archivo estaba vacio, se ha reseteado a un arr vacio')
                        await fs.promises.writeFile(`./${nombreArchivo}`, '[]')
                    }
                })
                .catch(async (err) => {
                    console.log('se ha creado el archivo')
                    await fs.promises.writeFile(`./${nombreArchivo}`, '[]')
                })
        }
        exe();
    }

    save(obj) {
        setTimeout(async () => {
            let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            archivo = JSON.parse(archivo);
            if (archivo.length === 0) {
                const nuevoObj = {
                    ...obj,
                    id: 1
                }
                archivo.push(nuevoObj)
                let data = JSON.stringify(archivo);
                await fs.promises.writeFile(`./${this.nombreArchivo}`, data);
                try {
                    console.log(`Se ha guardado el archivo, id: ${nuevoObj.id}`);
                } catch (error) {
                    console.log(` ocurrio un error ${error}`)
                }
            } else {
                const nuevoObj = {
                    ...obj,
                    id: archivo.length + 1
                }
                archivo.push(nuevoObj)
                let data = JSON.stringify(archivo);
                await fs.promises.writeFile(`./${this.nombreArchivo}`, data);
                try {
                    console.log(`Se ha guardado el archivo, id: ${nuevoObj.id}`);
                } catch (error) {
                    console.log(` ocurrio un error ${error}`)
                }
            }
        }), 1000
    };

    getById(id) {
        setTimeout(async () => {
            let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            archivo = JSON.parse(archivo);
            let obj = archivo.find(obj => obj.id === id)
            if (obj) {
                console.log(obj);
            } else {
                console.log(null)
            }
        }), 1000
    }


    async getAll() {
        let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
        archivo = JSON.parse(archivo);
        return console.log(archivo);
    }

    async deleteById(id) {
        let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
        archivo = JSON.parse(archivo);
        let newArr = archivo.findIndex(obj => obj.id == id);
        if(newArr === -1){
            console.log('no se ha encontrado el archivo')
        }else{
            archivo.splice(newArr, 1);
            archivo = JSON.stringify(archivo);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, archivo);
            console.log('se ha borrado el archivo')
        }
    }

    async deleteAll() {
            console.log('se estan borrando los objetos')
            await fs.promises.writeFile(`./${this.nombreArchivo}`, '[]')
            console.log('archivo reseteado con exito')

    }
}
/* ----------------------------------------------- */
// /* COMANDO PARA CREAR EL ARCHIVO */
//  const productos = new Contenedor('archivo.txt'); 


// /* ARR DE OBJ */
// const arrProducts = [
//     {
//         nombre: 'Shampoo Sólido de Romero',
//         precio: '400',
//         thumbnail: "https://ecoadcorpore.cl/wp-content/uploads/2020/12/SHAMPOO-DE-ROMERO-Y-ARGAN2.jpg"
//     },
//     {
//         nombre: 'Jabón Vegano',
//         precio: '500',
//         thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/948/629/products/palta-cuadrada1-7b5b1bcb57e60fd47116217019925424-1024-1024.jpg'
//     },
//     {
//         nombre: 'Agua micelar',
//         precio: '600',
//         thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/179774-1000-1000/204369_agua-micelar-skin-active-x-400-ml_imagen-1.jpg?v=636694031151370000"
//     }
// ] 


// /* FOR PARA AGREGAR MAS DE UN ELEMENTO A LA VEZ */
// for(let i = 0; i < arrProducts.length; i++){
//     setTimeout(() => {
//     productos.save(arrProducts[i])
//     }, 1000 * i)
// } 


// /* DEVUELVE EL ELEMENTO SEGUN EL ID QUE SE LE PASA */
//  productos.getById(3); 


// /* DEVUELVE EL ARR CON TODOS LOS OBJ */
// productos.getAll(); 


// /* ELIMINA EL OBJ SEGUN EL ID QUE SE LE PASA */
//  productos.deleteById(2); 


// /* RESETEA EL ARR A [] */
//  productos.deleteAll(); 