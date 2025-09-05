import * as React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";

export default function Pencil_Edit(props) {
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
          <Path
            d="M11.7650164,0.162314096 L13.7100162,1.74531414 C13.8978076,1.92829816 14.0030542,2.17981962 14.0015621,2.44201505 C14.0000371,2.70421047 13.8919013,2.95450403 13.7020166,3.13531426 L12.2240164,4.93531438 L7.19401662,11.0723146 C7.10692562,11.1748606 6.98969006,11.2473006 6.85901637,11.2793145 L4.2510166,11.8793142 C3.90496489,11.8936295 3.60654279,11.6383996 3.5670166,11.2943141 L3.68901661,8.72131446 C3.69805846,8.58994666 3.75006493,8.4652019 3.83701659,8.3663149 L8.65001658,2.5013141 L10.3450167,0.43331408 C10.6743414,-0.0149497972 11.2937527,-0.133161379 11.7650164,0.162314096 Z"
            id="Vector-14"
          ></Path>
          <Path
            d="M0,14.9913428 L13.7,14.9913428 M8.65,2.5013428 C9.05000001,3.49234278 10.325,5.36734281 12.224,4.93834288"
            id="Vector-15"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}
