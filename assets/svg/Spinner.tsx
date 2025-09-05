import * as React from "react";
import Svg, { Rect, G, Path, Line } from "react-native-svg";

export default function Spinner(props) {
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
          <Line
            x1="0"
            y1="7"
            x2="3"
            y2="7"
            id="Vector_96"
            stroke={props.stroke}
          />
          <Line
            x1="7"
            y1="0"
            x2="7"
            y2="3"
            id="Vector_93"
            stroke={props.stroke}
          />
          <Line
            x1="11"
            y1="7"
            x2="14"
            y2="7"
            id="Vector_97"
            stroke={props.stroke}
            transform="translate(12.500000, 7.000000) rotate(-180.000000) translate(-12.500000, -7.000000) "
          />
          <Line
            x1="7"
            y1="11"
            x2="7"
            y2="14"
            id="Vector_100"
            stroke={props.stroke}
            transform="translate(7.000000, 12.500000) rotate(180.000000) translate(-7.000000, -12.500000) "
          />
          <Line
            x1="1.6106857"
            y1="10.889329"
            x2="4.6106857"
            y2="10.889329"
            id="Vector_101"
            stroke={props.stroke}
            transform="translate(3.110686, 10.889329) rotate(-45.000000) translate(-3.110686, -10.889329) "
          />
          <Line
            x1="3.1106858"
            y1="1.6106713"
            x2="3.1106858"
            y2="4.6106713"
            id="Vector_102"
            stroke={props.stroke}
            transform="translate(3.110686, 3.110671) rotate(-45.000000) translate(-3.110686, -3.110671) "
          />
          <Line
            x1="9.389315"
            y1="3.1106715"
            x2="12.389315"
            y2="3.1106715"
            id="Vector_103"
            stroke={props.stroke}
            transform="translate(10.889315, 3.110672) rotate(135.000000) translate(-10.889315, -3.110672) "
          />
          <Line
            x1="10.889315"
            y1="9.389329"
            x2="10.889315"
            y2="12.389329"
            id="Vector_104"
            stroke={props.stroke}
            transform="translate(10.889315, 10.889329) rotate(135.000000) translate(-10.889315, -10.889329) "
          />
        </G>
      </G>
    </Svg>
  );
}
