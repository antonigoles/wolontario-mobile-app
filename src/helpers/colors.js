import StyleStatics from "../StyleStatics";
import global from "./global";

export default class {
    static counterColor( hexColor ) {
        let b = [ hexColor[1]+hexColor[2],hexColor[3]+hexColor[4],hexColor[5]+hexColor[6] ] 
        let i = b.map( code => (255-parseInt( code, 16 )) )

        let luminance = (0.299*i[0] + 0.587*i[1] + 0.114*i[2])/255

        if ( luminance > 0.6 ) return StyleStatics.darkText
        else return '#ffffff'
        
        // return `#${i.join('')}`
    }

    // static __RGB_Linear_Shade(p,c) {
    //     var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    //     return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
    // }

    static darkenColor( hexColor, force ) {
        let b = [ hexColor[1]+hexColor[2],hexColor[3]+hexColor[4],hexColor[5]+hexColor[6] ] 
        let i = b.map( code => (parseInt( code, 16 )) )
        i[0] = Math.round(i[0] / (1 + (force)))
        i[1] = Math.round(i[1] / (1 + (force)))
        i[2] = Math.round(i[2] / (1 + (force)))
        // global.popUp("test", `#${i.map(e=>e.toString(16)).join("")}`)
        return `#${i.map(e=>e.toString(16)).join("")}`
    }
}