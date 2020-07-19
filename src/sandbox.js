import {} from "../css/main.css"
import {} from "../css/media.css"
import {} from "../css/quicksand.css"
import {} from "../css/fontSizes.css"
import {} from "../css/colors.css"
import {} from "../css/shadows.css"
import {} from "../css/imagenes.css"
import {
    store
} from "../src/redux/store"
import {
    viewManager
} from "./views/manager"
import {
    captureMedia
} from "./redux/ui/actions";



store.dispatch(captureMedia())


const largeScreenRoute = [
    "1-opcion 1",
    "2-opcion 2",
    "3-opcion 3",
    [
        ["4/1/1-opcion 411", "4/1/2-opcion 412"],
        ["4/2/1-opcion 421", "4/2/2-opcion 422"],
        "4/3/1-opcion 431"
    ],
    "5-opcion 5",
    ["6/1-opcion 61", "6/2-opcion 62"]
]

const flatScreenRoute = largeScreenRoute.flat(Infinity)

console.log(flatScreenRoute)
let pointer = 0

const sameGroup = (codeA, codeB) => {
    const elementsCodeA = codeA.split("/")
    const elementsCodeB = codeB.split("/")
    elementsCodeA.pop()
    elementsCodeB.pop()
    return elementsCodeA.join() == elementsCodeB.join()
}

const sameSibling = (codeA, codeB) => {
    const elementsCodeA = codeA.split("/")
    const elementsCodeB = codeB.split("/")
    return elementsCodeA.length == elementsCodeB.length
}

const highLevel = (codeA, codeB) => {
    const elementsCodeA = codeA.split("/")
    const elementsCodeB = codeB.split("/")
    return elementsCodeA.length > elementsCodeB.length
}

const next = (pointer) => {
    if (pointer < flatScreenRoute.length - 1) {
        let currentCode = flatScreenRoute[pointer].split("-")[0]
        pointer += 1
        let nextCode = flatScreenRoute[pointer].split("-")[0]
        if (!sameGroup(currentCode, nextCode)) {
            pointer -= 1
        }
    }
    return pointer
}
const prev = (pointer) => {
    if (pointer > 0) {
        let currentCode = flatScreenRoute[pointer].split("-")[0]
        pointer -= 1
        let prevCode = flatScreenRoute[pointer].split("-")[0]
        if (sameGroup(prevCode, currentCode)) {
            return pointer
        } else {
            while (sameSibling(prevCode, currentCode) || highLevel(prevCode, currentCode)) {
                currentCode = prevCode
                pointer -= 1
                prevCode = flatScreenRoute[pointer].split("-")[0]
            }
            return pointer
        }
    }
}
const goTo = (option) => {
    return flatScreenRoute.findIndex(item => {
        return item.split("-")[1] == option
    })
}


pointer = next(pointer)
console.log(flatScreenRoute[pointer])

pointer = next(pointer)
console.log(flatScreenRoute[pointer])

pointer = goTo("opcion 61")
console.log(flatScreenRoute[pointer])

pointer = next(pointer)
console.log(flatScreenRoute[pointer])

pointer = next(pointer)
console.log(flatScreenRoute[pointer])

pointer = next(pointer)
console.log(flatScreenRoute[pointer])