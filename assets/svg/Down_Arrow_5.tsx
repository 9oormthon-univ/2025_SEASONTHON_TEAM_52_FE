import * as React from "react";
import Svg, { Rect, G, Path, Polyline } from "react-native-svg";

export default function Down_Arrow_5(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(7, 10)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Polyline id="vector-5" points="0 0 5 5 10 0"></Polyline>
        </G>
      </G>
    </Svg>
  );
}
