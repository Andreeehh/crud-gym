import { ButtonHTMLAttributes } from 'react';
import * as Styled from './styles';
import { type } from 'os';

export type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event?: React.FormEvent) => void;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary';
  type?: 'submit' | 'button' | 'reset';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  disabled = false,
  onClick,
  icon,
  color = 'primary',
  type = 'button',
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Styled.Button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      color={color}
    >
      {children}
      {!!icon && icon}
    </Styled.Button>
  );
};
