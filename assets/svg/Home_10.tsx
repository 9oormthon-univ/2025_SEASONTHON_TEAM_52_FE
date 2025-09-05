// components/icons/Home10.tsx
import * as React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";

export default function Home_10(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(3, 5)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M6.6,14.0000702 L6.6,11.76907 C6.64880861,10.4913856 7.7221763,9.49404808 9,9.53907023 C10.2778238,9.49404808 11.3511915,10.4913856 11.4,11.76907 L11.4,14.0000702 M6.6,14.000071 L11.4,14.000071 M6.6,14.0000709 L6.00000005,14.0000709 C4.08288868,14.0675962 2.47267674,12.5709936 2.4,10.6540713 L2.4,3.948071 M0,5.577071 L2.4,3.948071 M2.4,3.948071 L7.6160002,0.408070921 C8.45845376,-0.13602364 9.54154624,-0.13602364 10.3840002,0.408070921 L15.6,3.948071 M11.4,14.0000709 L12,14.0000709 C13.9171112,14.0675962 15.5273232,12.5709936 15.6,10.6540713 L15.6,3.948071 M18,5.576071 L15.6,3.948071"
            id="Vector-16"
          />
        </G>
      </G>
    </Svg>
  );
}
