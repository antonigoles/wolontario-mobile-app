import { useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import StyleStatics from "../StyleStatics";
import LibraryIcon from '../../assets/icons/galery.svg'

export default function WImage({ url, externalStyle, resizeMode }) {
    const [ randomKey, setRandomKey ] = useState(1)
    const [ imageLoadFailed, setImageLoadFailed ] = useState(false);
    const style = StyleSheet.create({
        view: {
            backgroundColor: StyleStatics.disabled,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    })

    const onImageLoadError = () => {
        setImageLoadFailed(true);
    }

    const img = { uri: url, cache: 'reload' }

    useEffect(()=>{
        setRandomKey( Math.ceil(Math.random()*100) )
        
    },[])

    useEffect(() => {
        if ( imageLoadFailed ) setImageLoadFailed(false);
    })

    const iconOptions = {
        fill: StyleStatics.lightText,
        width: 30,
        height: 30,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }
    
    if ( imageLoadFailed ) {
        return (
            <View 
                style={ {...style.view, ...externalStyle} }
            >
                <LibraryIcon { ...iconOptions } />
            </View>
        )
    } else {
        return (
            <Image 
                source={img} 
                key={randomKey}
                style={ {...externalStyle} }
                resizeMode={resizeMode ? resizeMode: 'cover' }
                onError={onImageLoadError}
                onLoad={()=>setImageLoadFailed(false)}
            ></Image>
        )
    }
    

}