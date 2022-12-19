const {Router} = require("express")
const { getTrab, getTrabByID, getHorario, getHorarioByCVT, deleteTrabbyID, addTrab, addHorario, updateTrabByCVT, updateHorarioByCVT } = require("../controllers/Lista")
const router = Router()

//http://localhost:4000/api/checkls
//Tipo Get
router.get("/", getTrab)
router.get("/id/:id", getTrabByID)
router.get("/hora", getHorario)
router.get("/hcvt/:CVT", getHorarioByCVT)
//Tipo Delete
router.delete("/", deleteTrabbyID)
//Tipo Post
router.post("/", addTrab)
router.post("/hora", addHorario)
//Tipo Put
router.put("/", updateTrabByCVT)
router.put("/hora", updateHorarioByCVT)

module.exports = router