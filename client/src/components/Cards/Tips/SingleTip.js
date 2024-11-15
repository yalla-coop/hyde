import * as S from './style';
import * as T from '../../Typography';
import Icon from '../../Icon';
import { useTranslation } from 'react-i18next';
import { common } from '../../../constants';

const SingleTip = ({
  bgColor = 'primaryMain',
  icon = 'bulb',
  iconColor,
  tip,
  textColor,
  borderColor,
  ...props
}) => {
  const { t } = useTranslation();
  const _borderColor = borderColor || textColor || iconColor;
  const _tip = t('common.heading.tip', common.heading.tip);
  return (
    <S.Tip bgColor={bgColor} borderColor={_borderColor} {...props}>
      {icon && <Icon icon="bulb" color={iconColor} mr="2" />}
      {typeof tip === 'string' ? (
        <T.P color={textColor} mb="7px">
          {_tip} {tip}
        </T.P>
      ) : (
        <S.TipContent>{tip}</S.TipContent>
      )}
    </S.Tip>
  );
};

export default SingleTip;
