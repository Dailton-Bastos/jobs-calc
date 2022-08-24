import * as Styled from './styles';

export interface ButtonProps {
  children: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  const { bgColor, borderColor, color, hover } = Styled.variantColor[variant];

  return (
    <Styled.Container
      bgColor={bgColor}
      color={color}
      borderColor={borderColor}
      hoverBgColor={hover.bgColor}
      hoverColor={hover.color}
    >
      {children}
    </Styled.Container>
  );
};
