import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';
import * as T from '../../components/Typography';
import backgroundLogo from '../../components/assets/BackgroundHydeLogo.svg';
import { Link } from 'react-router-dom';

export const PageHead = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.gradients.primary};
  background-color: ${({ theme }) => theme.gradients.primaryMain};
  background-image: ${({ showBGImage }) =>
    showBGImage && `url(${backgroundLogo})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: ${({ theme: { spacings } }) => spacings[13]};
  padding-bottom: ${({ theme: { spacings } }) => spacings[8]};

  ${({ theme }) => theme.media.mobile} {
    padding-top: ${({ theme: { spacings } }) => spacings[11]};
    padding-bottom: ${({ theme: { spacings } }) => spacings[7]};
    display: flex;
    justify-content: flex-start;
  }
`;

export const HeaderText = styled.div`
  background: ${({ theme: { colors } }) => `hsla(219, 25%, 14%, 0.8)`};
  border-radius: 8px;
  max-width: 580px;
  padding: ${({ theme: { spacings } }) => `${spacings[8]} ${spacings[7]}`};
  margin: 0 auto;

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme: { spacings } }) => spacings[6]};
    border-radius: 0px 8px 8px 0;
    max-width: 90vw;
    margin: 0;
  }
`;

export const Section = styled.section`
  ${setMargin}
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    max-width: 580px;
    padding: ${({ theme: { spacings } }) =>
      `${spacings[7]} ${spacings[6]} 0 ${spacings[6]}`};
  }
`;

export const StyledText = styled(T.P)`
  max-width: 580px;
  color: ${({ theme: { colors } }) => colors.neutralDark};
  padding: ${({ theme: { spacings } }) =>
    `${spacings[4]} ${spacings[6]} 0  ${spacings[6]}`};
`;

export const Span = styled.span`
  color: ${({ theme: { colors } }) => colors.neutralMain};
`;

export const Container = styled.div`
  ${setMargin};
  width: 100%;
  max-width: 580px;
  padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[6]}`};
  display: flex;
  justify-content: flex-start;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  ${({ theme }) => theme.media.mobile} {
    max-width: 90vw;
    margin: 0;
  }
`;

export const LogoContainer = styled(Link)`
  width: 72px;
  height: 30px;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacings[7]};
  ${({ theme }) => theme.media.mobile} {
    margin-left: 37px;
    margin-bottom: ${({ theme }) => theme.spacings[5]};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const FullSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 56px;
  padding: ${({ theme }) => `${theme.spacings[7]}`};
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, color }) => color ?? theme.colors.neutralSurface};
  ${({ theme }) => theme.media.mobile} {
    margin-top: 24px;
    padding: ${({ theme }) => `${theme.spacings[5]} 37.5px`};
  }
`;

export const CardContentWrapper = styled.div`
  max-width: 583px;
  width: 100%;
`;

export const CostOfLivingLink = styled(T.Link)`
  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.primaryMain};
  cursor: pointer;
  width: 100%;
`;
