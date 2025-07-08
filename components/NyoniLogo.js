
import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

export default function NyoniLogo(props) {
  return (
    <Svg
      width={props.width || 150}
      height={props.height || 150}
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      {/* Crown shape */}
      <Path
        d="M8 24 L20 8 L28 24 L36 8 L44 24 L56 8 L56 56 L8 56 Z"
        fill="#5e239d"
        stroke="#7a44c2"
        strokeWidth={2}
      />
      {/* Nyoni text */}
      <SvgText
        x="32"
        y="50"
        fontSize="12"
        fill="#7a44c2"
        fontWeight="bold"
        fontFamily="Helvetica, Arial, sans-serif"
        textAnchor="middle"
      >
        Nyoni
      </SvgText>
      {/* Tagline */}
      <SvgText
        x="32"
        y="62"
        fontSize="6"
        fill="#7a44c2"
        fontFamily="Helvetica, Arial, sans-serif"
        textAnchor="middle"
      >
        Your Crown. Your Freedom.
      </SvgText>
    </Svg>
  );
}
