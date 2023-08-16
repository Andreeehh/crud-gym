import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: block;
    width: 100%;
    text-align: center;
    font-size: ${theme.font.sizes.normal};
    color: ${theme.colors.gray6};
  `}
`;
