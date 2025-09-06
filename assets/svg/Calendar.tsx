import * as React from "react";
import Svg, { Rect, G, Path, Polyline } from "react-native-svg";

export default function Calendar(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(5, 4)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path d="M0,6 L0,12 C0,14.2091388 1.7908611,16 4,16 L10,16 C12.2091388,16 14,14.2091388 14,12 L14,6 C14,3.7908611 12.2091388,2 10,2 L4,2 C1.7908611,2 0,3.7908611 0,6 Z"></Path>
          <Path
            d="M10,3 L10,0 M4,3 L4,0 M4,7.28600003 C4,5.57199998 7,5.57199998 7,7.28600003 C6.9704677,7.78175296 6.7408222,8.24424358 6.36372478,8.56741631 C5.98662709,8.89058874 5.49442951,9.04671781 5,9 C5.49442951,8.95328243 5.98662709,9.10941126 6.36372478,9.43258393 C6.7408222,9.75575642 6.9704677,10.2182472 7,10.7139999 C7,12.4279996 4,12.4279996 4,10.7139999 M9,6.85700004 L10,6 L10,12"
            id="Vector-2"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}
