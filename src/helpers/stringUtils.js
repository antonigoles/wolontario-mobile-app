import WHyperLink from "../components/WHyperLink";
import { Text } from "react-native";

export default class {
    static hightlightUrls( str ) {
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const regex = new RegExp(urlRegex);
        return str.split(" ").map( (word, idx) => {
            return word.match( regex ) ? 
                <WHyperLink key={idx} url={word}>{word}&nbsp;</WHyperLink> 
                : 
                `${word} `;
        })
    }
}