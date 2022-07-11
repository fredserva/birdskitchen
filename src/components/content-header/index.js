import React from 'react';
import PropTypes from 'prop-types';
import { StorageHelpers } from '../../core/helpers';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import SvgIcon from '../svgicon';

import './style.scss';

class ContentHeaderNotExtended extends React.Component {
  state = {
    recipesdisplay: 'grid'
  };

  getItemLengthText = (itemLength) => {
    const { t } = this.props;
    let text;

    if (0 === itemLength) {
      text = t('no') + ' ' + t('item');
    } else if (1 === itemLength) {
      text = '1 ' + t('item');
    } else {
      text = `${itemLength} ` + t('items');
    }

    return text;
  };

  // StorageHelpers line 208 --- src\core\helpers.js
  changeDisplay = (display) => {
    document.body.classList.remove('grid-display');
    document.body.classList.remove('imglist-display');
    document.body.classList.remove('simplelist-display');
    document.body.classList.add(`${display}-display`);
    StorageHelpers.preference.set('recipesdisplay', display);
    this.setState({ display });
  };

  render() {
    const { t, icon, title, itemLength } = this.props;
    const itemLengthText = this.getItemLengthText(itemLength);

    return (
      <div className='comp_content-header'>
        <div className='left-side'>
          <div className='title-header'>
            <SvgIcon name={icon} />
            <div className='title'>{t(title)}</div>
          </div>
          <div className='sub-text'>{t(itemLengthText)}</div>
        </div>
        <div className='right-side'>
          <div className='icons-header'>
            <div className='icon-wrapper' title={t("Thumbnail List View")} onClick={() => this.changeDisplay('imglist')}>
              <SvgIcon name='imglist' />
            </div>
            <div className='icon-wrapper' title={t("List View")} onClick={() => this.changeDisplay('simplelist')}>
              <SvgIcon name='simplelist' />
            </div>
            <div className='icon-wrapper' title={t("Grid View")} onClick={() => this.changeDisplay('grid')}>
              <SvgIcon name='grid' />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

ContentHeaderNotExtended.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  itemLength: PropTypes.number
};

const ContentHeader = hoistStatics(withTranslation()(ContentHeaderNotExtended), ContentHeaderNotExtended);

export default ContentHeader;
