import styled from '@emotion/styled';
import { Link as RLink } from 'react-router-dom';

export const Header = styled.header`
  width: 100%;
  background: white;
  padding: ${({ theme: { spacings } }) =>
    `${spacings[9]} 0px ${spacings[3]} 0`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 425px;
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: ${({ theme: { spacings } }) => spacings[1]};
    background: ${({ theme, isTablet }) =>
      isTablet ? theme.colors.primaryLight : theme.colors.white};
  }
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme: { spacings } }) => `40px ${spacings[7]} 40px 0`};
  }
  ${({ theme }) => theme.media.mobile} {
    max-width: auto;
    padding: ${({ theme: { spacings } }) =>
      `${spacings[6]} 37px ${spacings[4]} 24px`};
  }
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.media.mobile} {
    justify-content: flex-start;
  }
`;

export const Content = styled.main`
  width: 100%;
  overflow: hidden;
  padding: ${({ theme: { spacings } }) => `${spacings[8]} 0`};
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme: { spacings } }) => `${spacings[7]} 0`};
  }
  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme: { spacings } }) =>
      `${spacings[6]} 0 ${spacings[8]} 0`};
  }
`;

export const Link = styled(RLink)`
  color: ${({ theme }) => theme.colors.neutralMain};
  display: flex;
`;
