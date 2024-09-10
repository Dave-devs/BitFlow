import * as React from "react";
import { SvgUri } from 'react-native-svg';


type SvgComponentProps = {
    uri: string;
    height: number;
    width: number;
};

const SvgComponent = ({uri, height, width}: SvgComponentProps) => {
    return(
        <SvgUri
            width={width}
            height={height}
            uri={uri}
            style={{
                borderRadius: 50
            }}
        />
    )
}

export default SvgComponent;