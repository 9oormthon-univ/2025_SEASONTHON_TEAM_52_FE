import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ShieldCheck(props) {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6428 5.07764C14.7678 11.9226 10.6848 14.8346 8.36982 15.5216C8.21648 15.5673 8.05317 15.5673 7.89982 15.5216C5.62282 14.8466 1.65682 12.0206 1.64282 5.41864C1.65654 4.84813 1.97741 4.32954 2.48182 4.06264C6.00582 2.07264 7.70082 1.55664 8.13182 1.55664C8.56282 1.55664 10.3918 2.10564 14.1498 4.25664C14.4474 4.42431 14.6347 4.73622 14.6428 5.07764Z"
        stroke="#3A87FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.14282 8.57148L7.14282 10.5715L11.1428 6.56348"
        stroke="#3A87FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
