import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ChevronRight(props) {
  return (
    <Svg
      width={props.width || 8}
      height={props.height || 13}
      viewBox="0 0 8 13"
      fill="none"
      {...props}
    >
      <Path
        d="M1.64282 1.55664L6.64282 6.55664L1.64282 11.5566"
        stroke={props.stroke || "#1F1F1F"} // ✅ 외부에서 받은 stroke 적용
        strokeWidth={props.strokeWidth || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
