import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { ReactComponent as HelpIcon } from 'assets/images/HelpIcon1.svg';
import { useTranslation } from 'react-i18next';
import { useActiveWeb3React } from 'hooks';
import 'pages/styles/bonds.scss';
import { getConfig } from 'config';
import { useHistory } from 'react-router-dom';
import { CustomSwitch, HypeLabAds, SearchInput } from 'components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import BillNFTImage from 'assets/images/bonds/bill-nfts.gif';
import ApeSwapLogo from 'assets/images/bonds/apeSwapLogo.svg';
import { ReactComponent as BillSvg1 } from 'assets/images/bonds/billSvg1.svg';
import { ReactComponent as BillSvg2 } from 'assets/images/bonds/billSvg2.svg';
import { ReactComponent as BillSvg3 } from 'assets/images/bonds/billSvg3.svg';
import BondsList from './BondsList';

const BondsPage: React.FC = () => {
  const { t } = useTranslation();
  const { chainId } = useActiveWeb3React();

  const config = getConfig(chainId);
  const showBonds = config['bonds']['available'];
  const history = useHistory();
  const helpURL = process.env.REACT_APP_HELP_URL;

  useEffect(() => {
    if (!showBonds) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBonds]);

  const parsedQuery = useParsedQueryString();
  const bondsStatus =
    parsedQuery && parsedQuery.status
      ? (parsedQuery.status as string)
      : 'available';
  const bondsType =
    parsedQuery && parsedQuery.bondType
      ? (parsedQuery.bondType as string)
      : 'availableBonds';

  const redirectWithBondsType = (bondType: string) => {
    const currentPath = history.location.pathname + history.location.search;
    let redirectPath;
    if (parsedQuery && parsedQuery.bondType) {
      redirectPath = currentPath.replace(
        `bondType=${parsedQuery.bondType}`,
        `bondType=${bondType}`,
      );
    } else {
      redirectPath = `${currentPath}${
        history.location.search === '' ? '?' : '&'
      }bondType=${bondType}`;
    }
    history.push(redirectPath);
  };

  const bondsTypeItems = [
    {
      text: t('availableBonds'),
      onClick: () => {
        redirectWithBondsType('availableBonds');
      },
      condition: bondsType === 'availableBonds',
    },
    {
      text: t('myBonds'),
      onClick: () => {
        redirectWithBondsType('myBonds');
      },
      condition: bondsType === 'myBonds',
    },
  ];

  const redirectWithBondsStatus = (status: string) => {
    const currentPath = history.location.pathname + history.location.search;
    let redirectPath;
    if (parsedQuery && parsedQuery.status) {
      redirectPath = currentPath.replace(
        `status=${parsedQuery.status}`,
        `status=${status}`,
      );
    } else {
      redirectPath = `${currentPath}${
        history.location.search === '' ? '?' : '&'
      }status=${status}`;
    }
    history.push(redirectPath);
  };

  const bondsStatusItems = [
    {
      text: t('available'),
      onClick: () => {
        redirectWithBondsStatus('available');
      },
      condition: bondsStatus === 'available',
    },
    {
      text: t('soldout'),
      onClick: () => {
        redirectWithBondsStatus('soldout');
      },
      condition: bondsStatus === 'soldout',
    },
  ];

  const [search, setSearch] = useState('');

  return (
    <Box width='100%' id='bondsPage'>
      <Box className='pageHeading'>
        <h1 className='h4'>{t('bonds')}</h1>

        {helpURL && (
          <Box
            className='helpWrapper'
            onClick={() => window.open(helpURL, '_blank')}
          >
            <small>{t('help')}</small>
            <HelpIcon />
          </Box>
        )}
      </Box>
      <Box margin='0 auto 24px'>
        <HypeLabAds />
      </Box>
      <Box className='bg-palette' borderRadius={10} mb={4}>
        <Box className='flex justify-between border-bottom' px={3} py={3}>
          <CustomSwitch
            height={36}
            items={bondsTypeItems}
            activeItemClass='availableBondsSwitch'
          />
          <Box className='flex'>
            <Box mr={3}>
              <SearchInput
                placeholder={t('search')}
                value={search}
                setValue={setSearch}
                height={36}
              />
            </Box>
            <CustomSwitch width={214} height={36} items={bondsStatusItems} />
          </Box>
        </Box>
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <img src={BillNFTImage} width='100%' />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <h5>{t('tipsBuyBonds')}</h5>
              <Box className='flex items-center' mt={2}>
                <Box className='flex' mr={1}>
                  <BillSvg1 />
                </Box>
                <p>{t('tipBuyBond1Desc')}</p>
              </Box>
              <Box className='flex items-center' mt={2}>
                <Box className='flex' mr={1}>
                  <BillSvg2 />
                </Box>
                <p>{t('tipBuyBond2Desc')}</p>
              </Box>
              <Box className='flex items-center' mt={2}>
                <Box className='flex' mr={1}>
                  <BillSvg3 />
                </Box>
                <p>{t('tipBuyBond3Desc')}</p>
              </Box>
              <Box mt={2}>
                <span>{t('tipBuyBondComment')}</span>
              </Box>
            </Grid>
          </Grid>
          <Box my={3} className='flex justify-center items-center'>
            <p>{t('poweredBy')}</p>
            <Box className='flex' ml='5px'>
              <img src={ApeSwapLogo} />
            </Box>
          </Box>
        </Box>
        <BondsList search={search} />
      </Box>
    </Box>
  );
};

export default BondsPage;
