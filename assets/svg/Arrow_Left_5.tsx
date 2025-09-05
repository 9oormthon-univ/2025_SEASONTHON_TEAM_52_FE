import * as React from "react";
import Svg, { Rect, G, Path, Polyline } from "react-native-svg";

export default function Arrow_Left_5(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(10, 7)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Polyline id="vector-3" points="5 0 0 5 5 10"></Polyline>
        </G>
      </G>
    </Svg>
  );
}
