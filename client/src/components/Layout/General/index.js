import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';
import { useAccessibility } from '../../../context/accessibility';

import Language from '../../Language';

// import Navbar from '../../Navbar';
import GoBack from '../../GoBack';
import theme from '../../../theme';

const General = ({
  children,
  goBack,
  maxWidth,
  showHelp,
  showBack,
  ...props
}) => {
  const { layoutColor } = useAccessibility();

  return (
    <S.Container bgColor={layoutColor}>
      <Language showBack={showBack} />
      <S.Content maxWidth={maxWidth}>
        {goBack && (
          <GoBack
            mb="6"
            mbM="5"
            ml={`${theme.constants.gridGutter.desktop / 2}px`}
            mlT={`${theme.constants.gridGutter.tablet / 2}px`}
            mlM={`${theme.constants.gridGutter.mobile / 2}px`}
          />
        )}
        {children}
      </S.Content>
    </S.Container>
  );
};

General.propTypes = {
  children: PropTypes.node.isRequired,
};

export default General;
