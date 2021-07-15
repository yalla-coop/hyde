import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';

const renderChild = (isCompleted, title) => {
  if (isCompleted) {
    return (
      <>
        <Icon icon="tick" color="white" />
        <T.P
          weight="bold"
          color="white"
          mt="4"
          ta="center"
          style={{ maxWidth: 150 }}
        >
          {title}
        </T.P>
      </>
    );
  }
  return (
    <T.H1 weight="bold" color="white" ta="center">
      {title}
    </T.H1>
  );
};

const Card = forwardRef(
  (
    {
      variant = 'primary',
      direction = 'right',
      content,
      children,
      title,
      isCompleted,
      handleClick,
      isJustCompletedOne,
      to = '/',
      ...props
    },
    ref
  ) => {
    const bgColor = `${variant}Light`;
    const borderColor = `${variant}Mid`;
    const circleColor = `${variant}Main`;
    return (
      <S.Wrapper bgColor={bgColor} onClick={handleClick} {...props} ref={ref}>
        <Link to={to} style={{ color: 'transparent' }}>
          <S.Container direction={direction}>
            {isCompleted && (
              <T.P
                weight="bold"
                color="neutralTertiary"
                style={{ alignSelf: 'flex-start' }}
                mb="2"
              >
                Completed!
              </T.P>
            )}
            <T.P isSmall color="neutralTertiary">
              {content}
            </T.P>
            <S.Circle
              circleColor={circleColor}
              borderColor={borderColor}
              direction={direction}
              isJustCompletedOne={isJustCompletedOne}
            >
              {renderChild(isCompleted, title)}
            </S.Circle>
          </S.Container>
        </Link>
      </S.Wrapper>
    );
  }
);

export default Card;