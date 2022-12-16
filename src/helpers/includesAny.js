export default function includesAny(str, list) {
    return str.split("").some( e => list.includes(e) )
}