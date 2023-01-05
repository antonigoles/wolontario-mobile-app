import { Linking, Text } from 'react-native';
import StyleStatics from '../StyleStatics';

export default function WHyperLink(params) {
    return (<Text style={{ 
        color: StyleStatics.primary
    }} onPress={ () => { 
        Linking.openURL( params.url ) 
    } }>
        {params.children}
    </Text>)
}