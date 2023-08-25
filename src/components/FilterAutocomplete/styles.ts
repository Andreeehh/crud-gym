import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};;
    width: 100%;
    margin-bottom: ${theme.spacings.large};

  `}
`;
