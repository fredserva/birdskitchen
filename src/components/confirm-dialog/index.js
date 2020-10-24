import React, {Component} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import './style.scss';

class ConfirmDialogNotExtended extends Component {
    handleClickButton = button => {
        if ( button.onClick ) {
            button.onClick();
        }
        removeElementReconfirm();
    };

    render() {
        const { t, title, text, buttons } = this.props;

        return (
            <div className='comp_confirm-dialog'>
                <div className='confirm-dialog-content'>
                    <div className='confirm-dialog-header'>
                        <div className='title'>{ t( title ) }</div>
                    </div>
                    <div className='confirm-dialog-body'>
                        <div className='text'>{ t( text ) }</div>
                    </div>
                    <div className='confirm-dialog-footer'>
                        {
                            buttons.map( ( button, index ) => {
                                return (
                                    <button key={index} onClick={() => this.handleClickButton( button )}
                                            className={button.className}>
                                        { t( button.label ) }
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ConfirmDialogNotExtended.defaultProps = {
    buttons: [
        {
            label: 'Cancel',
            onClick: () => {
                alert( 'Cancel' );
            },
            className: null
        },
        {
            label: 'Confirm',
            onClick: () => {
                alert( 'Confirm' );
            },
            className: null
        }
    ]
};

ConfirmDialogNotExtended.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    buttons: PropTypes.array
};

const ConfirmDialog = hoistStatics( withTranslation()( ConfirmDialogNotExtended ), ConfirmDialogNotExtended );

export default ConfirmDialog;

function createElementReconfirm( properties ) {
    let divTarget = document.getElementById( 'react-custom-confirm-dialog' );

    if ( null === divTarget ) {
        divTarget = document.createElement( 'div' );
        divTarget.id = 'react-custom-confirm-dialog';
        document.body.appendChild( divTarget );
    }

    render( <ConfirmDialog {...properties} />, divTarget );
}

function removeElementReconfirm() {
    const target = document.getElementById( 'react-custom-confirm-dialog' );
    if ( target ) {
        unmountComponentAtNode( target );
        target.parentNode.removeChild( target );
    }
};

export function openConfirmDialog( properties ) {
    createElementReconfirm( properties );
};
