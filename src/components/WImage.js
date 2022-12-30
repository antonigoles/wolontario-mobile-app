import { useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"

export default function WImage({ url, externalStyle }) {
    const [ randomKey, setRandomKey ] = useState(1)
    const style = StyleSheet.create({
        view: {}
    })

    const img = { uri: url, cache: 'reload' }

    useEffect(()=>{
        setRandomKey( Math.ceil(Math.random()*100) )
    },[])
    
    return (
        <Image 
            source={img} 
            key={randomKey}
            style={ {...style.view, ...externalStyle} }
        ></Image>
    )

}