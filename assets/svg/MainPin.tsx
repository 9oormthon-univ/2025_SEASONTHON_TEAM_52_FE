import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function MapPin(props) {
  return (
    <Svg width={17} height={19} viewBox="0 0 17 19" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.593 3.11875C16.3266 5.87528 16.3266 10.3202 13.593 13.0767L8.64301 18.0567L3.69301 13.0777C0.959428 10.3212 0.959428 5.87628 3.69301 3.11975C5.00184 1.79955 6.78378 1.05683 8.6428 1.05664C10.5018 1.05645 12.2839 1.79882 13.593 3.11875Z"
        stroke={props.stroke || "#1F1F1F"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4429 7.66796C11.4248 9.20993 10.1632 10.447 8.6212 10.4349C7.07917 10.4228 5.83717 9.16616 5.84316 7.62409C5.84915 6.08202 7.10087 4.83507 8.64295 4.83496C10.1984 4.84432 11.4518 6.11255 11.4429 7.66796Z"
        stroke={props.stroke || "#1F1F1F"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
