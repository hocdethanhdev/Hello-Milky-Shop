import React from "react";
import "./Termofuse.css";
import { useTranslation } from 'react-i18next';

function Termofuse() {
  const { t } = useTranslation();
  return (
    <main id="main" className="main-container-termofuse">
      <div className="row page-wrapper">
        <div id="content" className="large-12 col" role="main">
          <header className="entry-header text-center">
            <h1 className="entry-title">{t('termOf')}</h1>
            <div className="is-divider medium"></div>
          </header>
          <div className="entry-content">
            <p>
            {t('whenYouVisit')}
            </p>
            <p>
            {t('theWebsiiteReserves')}
            </p>
            <p>
            {t('andWhenYouContinue')}
            </p>
            <p>{t('pleaseCheckBack')}</p>
            <p>
              <strong>{t('webManual')}</strong>
            </p>
            <p>
            {t('whenAccessing')}
            </p>
            <p>
              &#8211;{t('itIsStricly')}
            </p>
            <p>
              &#8211;{t('thisWebsite')}
            </p>
            <p>
              &#8211;{t('youMustRegister')}
            </p>
            <p>
            {t('inAddition')}
            </p>
            <p>
              <strong>{t('customerOpinion')}</strong>
            </p>
            <p>
              &#8211;{t('allWebsiteContent')}
            </p>
            <p>
              <strong>3.&nbsp;{t('orderAndOrderComfirmation')}</strong><br/>
              
              &#8211;{t('whenYouPlace')} &nbsp;HelloMilky.shop.
            </p>
            <p>
              &#8211;{t('inOrderTo')}
            </p>
            <p>
              <strong>{t('orderValue')}</strong>
            </p>
            <p>
              &#8211;{t('helloMilkyShop')}
            </p>
            <p>
              &#8211;{t('unless')}
            </p>
            <p>
              <strong>{t('promotions')}</strong>
            </p>
            <p>
              &#8211;{t('theRulesOfThePromotion')}
            </p>
            <p>
              &#8211;{t('HelloMilky.shop')}
            </p>
            <p>
              <strong>{t('voucher')}</strong>
            </p>
            <p>
              &#8211;{t('aDiscountCode')}
            </p>
            <p>
              &#8211;{t('discountCodes')}
            </p>
            <p>
              &#8211;{t('toTheCustomer')}
            </p>
            <p>
              <strong>{t('informationSercurity')}</strong>
            </p>
            <p>
              &#8211;{t('atHelloMilkyShop')}
            </p>
            <p>
              &#8211;{t('storePersonalInformation')}
            </p>
            <p>
              &#8211;{t('allFormOfPersonal')}
            </p>
            <p>
              <strong>{t('productWarranty')}</strong>
            </p>
            <p>
              &#8211;{t('withEachProduct')}
            </p>
            <p>
              &#8211;{t('isNotResponsible')}
            </p>
            <p>
              <strong>{t('changes')}</strong>
            </p>
            <p>
              &#8211;{t('ifYouWant')}
            </p>
            <p>
              &#8211;{t('weWillHelpYou')}
            </p>
            <p>
              <strong>{t('updatesAndNotifications')}</strong>
            </p>
            <p>
              &#8211;{t('youCanUnsubscribe')}
            </p>
            <p>
              &#8211;{t('thisClause')}
            </p>
            <p>
              <strong>{t('miscellaneous')}</strong>
            </p>
            <p>
              &#8211;{t('weReserve')}
            </p>
            <p>
              &#8211;{t('weAreYou')}
            </p>
            <p>
              <strong>{t('disputeResolution')}</strong>
            </p>
            <p>
              &#8211;{t('inCaseOf')}
            </p>
            <p>
              &#8211;{t('24Hours')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Termofuse;
