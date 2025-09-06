import * as React from "react";
import Svg, { Rect, G, Path, Polyline } from "react-native-svg";

export default function Stopwatch(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Rect fill="transparent" x={0} y={0} width={24} height={24} />
        <G
          transform="translate(5, 3)"
          stroke={props.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path
            d="M14,10.5 C14,14.365993 10.865993,17.5 7,17.5 C3.13400682,17.5 0,14.365993 0,10.5 C0,6.63400682 3.13400682,3.5 7,3.5 C8.85651522,3.5 10.6369928,4.23749788 11.9497476,5.55025268 C13.2625024,6.8630072 14,8.64348478 14,10.5 Z"
            id="Vector-25"
          ></Path>
          <Path
            d="M8,10.964966 C8,11.7933931 7.32842708,12.464966 6.5,12.464966 C5.67157289,12.464966 5,11.7933931 5,10.964966 C5,10.1365389 5.67157289,9.464966 6.5,9.464966 C7.32842708,9.464966 8,10.1365389 8,10.964966 Z"
            id="Vector-26"
          ></Path>
          <Path
            d="M7,3.5 L7,0.5 M9.965,7.5 L7.565,9.9 M9,0.5 L5,0.5 M14,3.4 L12,5.6 M0,3.4 L2.1,5.5"
            id="Vector-27"
          ></Path>
        </G>
      </G>
    </Svg>
  );
}
