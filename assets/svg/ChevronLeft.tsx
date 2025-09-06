// assets/svg/ChevronLeft.tsx
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ChevronLeft(props) {
  return (
    <Svg
      width={props.width || 7}
      height={props.height || 13}
      viewBox="0 0 7 13"
      fill="none"
      {...props}
    >
      <Path
        d="M6 11.3579L1 6.35791L6 1.35791"
        stroke={props.stroke || "#1F1F1F"}
        strokeWidth={props.strokeWidth || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
