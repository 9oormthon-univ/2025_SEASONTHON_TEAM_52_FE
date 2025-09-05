import * as React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";

export default function Comment_Alt_Lines(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <Rect fill="#FFFFFF" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(5, 5)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M3.5000997,4.267 L10.5000997,4.267 M4.3750997,6.826 L9.6250997,6.826 M3.66309939,0 L10.3380998,0 C12.3756611,0.015406643 14.0150664,1.67943468 14.000201,3.717 L14.000201,8.2299994 C14.0072851,9.2086568 13.625396,10.1500822 12.938444,10.8471608 C12.2514927,11.5442396 11.3157563,11.939865 10.3370998,11.947 L3.66309939,11.947 L0,14 L0,3.717 C-0.00708746497,2.7383433 0.374803189,1.79691764 1.06175452,1.09983909 C1.74870589,0.402760694 2.6844425,0.0071347052 3.66309939,0 Z"
            id="Vector-5"
          />
        </G>
      </G>
    </Svg>
  );
}
