import os from "os";

const argumentosDeEntrada = process.argv
const sistemaOperativo = process.platform
const versionNodeJs = process.version
const memoriaReservada = process.memoryUsage().rss
const pathEjecucion = process.title
const processID = process.pid
const carpetaDelProyecto = process.cwd()
const numeroProcesadores = os.cpus().length

export const INFO = {
    argumentosDeEntrada, sistemaOperativo, versionNodeJs, memoriaReservada, pathEjecucion, processID, carpetaDelProyecto, numeroProcesadores
}