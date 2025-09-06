import * as React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";

export default function More(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(4,10) rotate(90, 8, 2)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M4,2 C4,3.10456944 3.10456944,4 2,4 C0.89543052,4 0,3.10456944 0,2 C0,0.89543052 0.89543052,0 2,0 C2.53043292,0 3.0391408,0.21071368 3.4142136,0.58578648 C3.7892864,0.9608592 4,1.46956708 4,2 Z"
            id="Vector-11"
          ></Path>
          <Path
            d="M10,2 C10,3.10456944 9.10456944,4 8,4 C6.89543052,4 6,3.10456944 6,2 C6,0.89543052 6.89543052,0 8,0 C9.10456944,0 10,0.89543052 10,2 Z"
            id="Vector-12"
          ></Path>
          <Path
            d="M16,2 C16,3.10456944 15.1045694,4 14,4 C12.8954305,4 12,3.10456944 12,2 C12,0.89543052 12.8954305,0 14,0 C15.1045694,0 16,0.89543052 16,2 Z"
            id="Vector-13"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}
