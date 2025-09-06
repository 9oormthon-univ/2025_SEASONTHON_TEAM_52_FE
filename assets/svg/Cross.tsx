import * as React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";

export default function Cross(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(7, 7)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M0,10 L5,5 M5,5 L10,0 M5,5 L10,10 M5,5 L0,0"
            id="Vector-47"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}
