const {request, response} = require("express")
const pool = require("../db/connection")
const {modeloLista, updateLTraba} = require("../models/Lista");

const getTrab = async (req=request, res=response) => {
    let conn;
    try{
        conn = await pool.getConnection()
        const Trab = await conn.query(modeloLista.queryGetTrabajador,(error)=>{throw new error})
        if(!Trab){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({Trab})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
const getHorario = async (req=request, res=response) => {
    let conn;
    try{
        conn = await pool.getConnection()
        const horario = await conn.query(modeloLista.queryGetHorario,(error)=>{throw new error})
        if(!horario){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({horario})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
const getTrabByID = async (req = request, res = response) =>{
    const {IDT} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [Trab] = await conn.query(modeloLista.queryTrabajadorByIDT,[IDT],(error)=>{throw new error})
        if (!Trab){
            res.status(404).json({msg: `No se encontró registro con el ID ${IDT}`})
            return
        }
        res.json({Trab})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const getHorarioByCVT = async (req = request, res = response) =>{
    const {CVT} = req.params
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [horario] = await conn.query(modeloLista.queryHorarioByCVT,[CVT],(error)=>{throw new error})
        if (!horario){
            res.status(404).json({msg: `No se encontró registro con el ID ${CVT}`})
            return
        }
        res.json({horario})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const deleteTrabbyID = async (req = request, res = response) =>{
    const {IDT} = req.query
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloLista.queryDeleteTrabajadorByIDT,[IDT],(error)=>{throw new error})
        
        if (affectedRows === 0){
            res.status(404).json({msg: `No se pudo eliminar el registro con el ID ${IDT}`})
            return
        }
        res.json({msg: `Se elimino satisfactoriamente el registro con el ID ${IDT}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const addTrab = async (req = request, res = response) =>{
    const {
        CVT,
        Nombre,
        Telefono,
        Activo
    } = req.body
    if (
        !CVT ||
        !Nombre ||
        !Telefono ||
        !Activo
    ){ res.status(400).json({msg:"Falta informaciòn del Trabajador"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        const [Trab]=await conn.query(modeloLista.queryTrabajadorExists,[CVT])
        if (Trab){
            res.status(403).json({msg:`El Trabajador ${CVT} ya se encuentra registrado`})
            return
        }

        const {affectedRows} = await conn.query(modeloLista.queryAddTrabajador,[
            CVT,
            Nombre,
            Telefono,
            Activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del Trabajador ${CVT}`})
            return
        }
        res.json({msg:`Se agregp satisfactoriamente el registro con el Trabajador ${CVT}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const addHorario = async (req = request, res = response) =>{
    const {
        CVT,
        Nombre,
        HoraInicio,
        HoraFinal,
        Horashechas,
        Fecha
    } = req.body
    if (
        !CVT ||
        !Nombre
    ){ res.status(400).json({msg:"Falta informaciòn del Trabajador"})}
    
    let conn;
    try{ 
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloLista.queryAddHorario,[
            CVT,
            Nombre,
            HoraInicio,
            HoraFinal,
            Horashechas,
            Fecha
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del Trabajador ${CVT}`})
            return
        }
        res.json({msg:`Se agregp satisfactoriamente el registro del Trabajador ${CVT}`})
    } catch (error){
        console.log(error)
        res.status(500).json({error})
    } finally{
        if(conn){
            conn.end()
        }
    }
}
const updateTrabByCVT = async (req = request, res = response) =>{
    const {
        CVT,
        Nombre,
        Telefono,
        Activo
    } = req.body

    if (
        !CVT ||
        !Nombre ||
        !Telefono ||
        !Activo      
    ){
        res.status(400).json({msg:"Falta informacion del Trabajador"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [Trab]=await conn.query(modeloLista.queryGetTrabajadorInfo,[CVT])
        if (!Trab){
            res.status(403).json({msg: `El Trabajador ${CVT} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(updateLTraba(
            Nombre,
            Telefono,
            CVT
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del Trabajador ${CVT}`})
            return
        }
        res.json({msg: `El Trabajador ${CVT} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}
const updateHorarioByCVT = async (req = request, res = response) =>{
    const {
        CVT,
        Nombre,
        HoraInicio,
        HoraFinal,
        Horashechas,
        Fecha
    } = req.body

    if (
        !CVT ||
        !Nombre ||
        !Fecha
    ){
        res.status(400).json({msg:"Falta informacion del Trabajador"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()
        const [Horario]=await conn.query(modeloLista.queryGetHorarioInfo,[CVT])
        if (!Horario){
            res.status(403).json({msg: `El Trabajador ${CVT} no se encuentra registrado`})
        }
        const {affectedRows} = await conn.query(modeloLista.queryUpdateHorarioByCVT(
            Nombre,
            HoraInicio,
            HoraFinal,
            Horashechas,
            CVT
        ),(error)=>{throw new error})
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del Trabajador ${CVT}`})
            return
        }
        res.json({msg: `El Trabajador ${CVT} se actualizo correctamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports = {getTrab, getHorario, getTrabByID, getHorarioByCVT, deleteTrabbyID, addTrab, updateTrabByCVT, addHorario, updateHorarioByCVT}