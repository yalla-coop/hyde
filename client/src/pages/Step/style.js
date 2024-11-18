import styled from '@emotion/styled';
import { Link as RLink } from 'react-router-dom';
import setMargin from '../../helpers/set-margin';

export const Container = styled.div`
  // overflow: hidden;
  position: relative;
`;

export const PageHead = styled.div`
  width: ${({
    theme: {
      spacings: s,
      constants: {
        layout: { step },
      },
    },
  }) =>
    `calc(100% - ${step.leftPadding.desktop} - ${step.rightPadding.desktop} - ${step.menu.desktop})`};
  display: flex;
  justify-content: space-between;
  position: fixed;
  min-height: 50px;
  background: ${({ theme }) => theme.colors.white};
  z-index: 2;
  top: 0;
  padding-top: ${({ theme }) => theme.spacings[7]};
  padding-bottom: ${({ theme }) => theme.spacings[3]};
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    width: ${({
      theme: {
        spacings: s,
        constants: {
          layout: { step },
        },
      },
    }) =>
      `calc(100% - ${step.leftPadding.mobile} - ${step.rightPadding.mobile})`};
    padding-top: ${({ theme }) => theme.spacings[5]};
  }
`;

export const Link = styled(RLink)`
  color: ${({ theme }) => theme.colors.neutralMain};
  display: flex;
`;

export const InnerContainer = styled.div`
  max-width: 700px;
  padding-top: ${({ theme }) => theme.spacings[5]};
`;

export const SectionHeader = styled.div`
  ${setMargin};
  display: flex;
  align-items: center;
  width: 100%;
`;

export const CloseWrapper = styled.div`
  background: none;
  cursor: pointer;
  border: none;
  z-index: 1000;
  padding: ${({ padding }) => padding};
`;
