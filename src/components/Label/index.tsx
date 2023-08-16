import * as Styled from './styles';

export type LabelProps = {
  title?: string;
};

export const Label = ({ title }: LabelProps) => {
  return <Styled.Wrapper>{title}</Styled.Wrapper>;
};
