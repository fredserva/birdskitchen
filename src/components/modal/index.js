import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import SvgIcon from '../svgicon';

import './style.scss';

class ModalNotExtended extends Component {
    render() {
        const { t, show, title, onClose, children, footerTemplate, headerIconsTemplate } = this.props;
        let modalClassName = 'comp_modal';
        if ( show ) {
            modalClassName += ' visible';
        }

        return (
            <div className={modalClassName}>
                <div className='modal-content'>
                    <div className='wrapper'>
                        <div className='modal-header'>
                            <div className='title'>{ t( title ) }</div>
                            {
                                headerIconsTemplate && <span className='header-icons'>{headerIconsTemplate()}</span>
                            }
                        </div>
                        <div className='modal-body'>{children}</div>
                    </div>
                    {
                        footerTemplate && <div className='modal-footer'>{footerTemplate()}</div>
                    }
                </div>
                <div onClick={onClose && onClose} className='modal-overlay'/>
            </div>
        );
    }
}

ModalNotExtended.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    footerTemplate: PropTypes.any,
    headerIconsTemplate: PropTypes.any
};

const Modal = hoistStatics( withTranslation()( ModalNotExtended ), ModalNotExtended );

export default Modal;
