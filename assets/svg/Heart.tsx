import * as React from "react";
import Svg, { Rect, G, Path } from "react-native-svg";

export default function Heart(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(5, 6)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M6.99969789,12.991086 L4.07669734,9.99108569 L1.17669731,6.99108538 C-0.392232455,5.33307802 -0.392232455,2.73809404 1.17669731,1.08008604 C1.94493832,0.341749796 2.98548128,-0.0440862312 4.04936869,0.0148921885 C5.11325595,0.0738706056 6.10477486,0.5723575 6.78669715,1.39108601 L6.99969789,1.60008595 L7.21069729,1.38208604 C7.89261958,0.563357496 8.88413905,0.0648706112 9.94802701,0.00589218786 C11.0119134,-0.0530862282 12.052457,0.332749792 12.8206978,1.07108607 C14.3896272,2.72909395 14.3896272,5.32407793 12.8206978,6.98208567 L9.9206971,9.98208546 L6.99969789,12.991086 Z"
            id="vector-18"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}
