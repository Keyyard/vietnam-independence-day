import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, className = '', ...rest }: Props) {
  return (
    <button
      className={("btn-primary shadow-sm px-3 py-2 rounded ") + className}
      {...rest}
    >
      {children}
    </button>
  );
}
