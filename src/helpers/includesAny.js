export default function includesAny(str, list) {
    let failed = true
    list.forEach(e => {
        if ( str.includes(e) ) failed = false
    });
    return failed
}