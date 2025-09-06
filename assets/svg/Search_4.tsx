import * as React from "react";
import Svg, { Rect, G, Path, Line } from "react-native-svg";

export default function Search_4(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(5, 5)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M0,6.14553645 C-0.000442728267,3.21436625 2.06975314,0.691076775 4.94452145,0.118831356 C7.81928963,-0.453414051 10.6979533,1.08476601 11.8200122,3.79266918 C12.9420723,6.50057267 11.9950121,9.62399741 9.55802602,11.2527555 C7.12103895,12.8815135 3.87287164,12.5619652 1.80000001,10.4895363 C0.647626962,9.33756476 0.000136356254,7.77495439 0,6.14553645 Z"
            id="vector-3"
          ></Path>
          <Line
            x1="10.489014"
            y1="10.49054"
            x2="14.000014"
            y2="14.00154"
            id="vector-4"
          ></Line>
        </G>
      </G>
    </Svg>
  );
}
