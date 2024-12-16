import { useTranslation } from 'react-i18next';
import { Typography as T, TextWithIcon } from '../../components';
import { common, navRoutes } from '../../constants';
import theme from '../../theme';
import * as S from './style';

const CostOfLivingCard = () => {
  const { t } = useTranslation();

  return (
    <S.FullSection color={theme.colors.primaryLight}>
      <S.CardContentWrapper>
        <T.H2 color="neutralMain" ta="center" taM="start" mb="4">
          {t(
            'common.section.costOfLivingHelper.title',
            common.section.costOfLivingHelper.title
          )}
        </T.H2>

        <T.P ta="center" mb={3}>
          {t(
            'common.section.costOfLivingHelper.description',
            common.section.costOfLivingHelper.description
          )}
        </T.P>

        <S.CostOfLivingLink external to={navRoutes.EXTERNAL.COST_OF_LIVING}>
          <TextWithIcon
            size="large"
            text={t(
              'common.buttons.checkUniversalCredit',
              common.buttons.exploreCostOfLiving
            )}
            color="white"
            bgColor="primaryMain"
            jc="center"
            jcT="flex-start"
            mr="6px"
            isText
            iconProps={{
              color: 'white',
              icon: 'forwardArrow',
            }}
          />
        </S.CostOfLivingLink>
      </S.CardContentWrapper>
    </S.FullSection>
  );
};

export default CostOfLivingCard;
