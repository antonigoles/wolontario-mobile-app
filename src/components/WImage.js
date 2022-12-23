import { Image, StyleSheet } from "react-native"

export default function WImage({ url, externalStyle }) {
    const style = StyleSheet.create({
        view: {}
    })

    const img = { uri: url }

    
    return (
        <Image 
            source={img} 
            style={ {...style.view, ...externalStyle} }
        ></Image>
    )

}