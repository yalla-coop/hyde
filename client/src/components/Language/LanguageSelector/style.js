import styled from '@emotion/styled';
import theme from '../../../theme';

export const Container = styled('div')`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: ${theme.constants.translationBar.desktop.paddingTop};

  ${({ theme }) => theme.media.tablet} {
    padding: ${theme.constants.translationBar.tablet.paddingTop};
  }
`;

export const Wrapper = styled('div')`
  display: grid;
  width: 100%;
  margin-top: 8px;
  grid-gap: 4px;
  grid-template-columns: repeat(auto-fill, 300px);
  padding: ${theme.constants.translationBar.desktop.padding};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    padding: ${theme.constants.translationBar.tablet.padding};
  }
`;

export const LanguageWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  outline: none;
  min-width: 100%;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  align-items: center;
  background-color: ${theme.colors.neutralSurface};
  justify-content: ${({ jc }) => jc || 'flex-start'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${theme.colors.neutralLight};
  }
`;
