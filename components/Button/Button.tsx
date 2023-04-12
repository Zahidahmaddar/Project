import React from 'react';
interface Props {
  children: string | JSX.Element | JSX.Element[];
  type: 'primary' | 'secondary';
  classNames: string;
}
function Button(props: Props) {
  return (
    <button
      className={`px-8 py-2 rounded-lg font-semibold ${
        props.type === 'primary'
          ? 'bg-[#008080] text-white'
          : props.type === 'secondary'
          ? 'bg-white border border-[#008080] text-[#008080]'
          : ''
      }`}
    >
      {props.children}
    </button>
  );
}

export default Button;
