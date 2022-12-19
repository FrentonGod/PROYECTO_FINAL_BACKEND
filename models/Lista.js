const modeloLista = {
    queryGetTrabajador: `SELECT * FROM trabajador`,
    queryGetHorario: `SELECT * FROM horario`,
    queryTrabajadorByIDT : `SELECT * FROM trabajador WHERE IDT=?`,
    queryHorarioByCVT : `SELECT * FROM horario WHERE CVT=?`,
    queryDeleteTrabajadorByIDT : `UPDATE trabajador SET Activo='N' WHERE IDT=?`,
    queryTrabajadorExists : `SELECT CVT FROM trabajador WHERE CVT = ?`,
    queryAddTrabajador:`
    INSERT INTO trabajador(
        CVT,
        Nombre,
        Telefono,
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?
    )`,
    queryAddHorario:`
    INSERT INTO horario(
        CVT,
        Nombre,
        HoraInicio,
        HoraFinal,
        Horashechas,
        Fecha
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
    queryGetTrabajadorInfo : `SELECT CVT, Nombre, Telefono, Activo FROM trabajador WHERE CVT = ?`,
    queryGetHorarioInfo : `SELECT CVT, Nombre, HoraInicio, HoraFinal, Horashechas, Fecha FROM horario WHERE CVT`,
    queryUpdateHorarioByCVT : `
    UPDATE horario SET
        Nombre = ?,
        HoraInicio = ?,
        HoraFinal = ?,
        Horashechas = ?
    WHERE CVT= ?`
}
const updateLTraba= (
    Nombre,
    Telefono,
    CVT
) => {
    return `UPDATE trabajador SET
                Nombre = '${Nombre}',
                Telefono = '${Telefono}',
            WHERE CVT = '${CVT}'`
}
module.exports = {modeloLista, updateLTraba}