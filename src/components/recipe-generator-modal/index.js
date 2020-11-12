import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import Parser from 'html-react-parser';
import { shell } from 'electron';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import Modal from '../modal';
import SvgIcon from '../svgicon';
import { StorageHelpers } from '../../core/helpers';

import './style.scss';

class RecipeGeneratorModalNotExtended extends React.Component {
    mdParser = new MarkdownIt();

    state = {
        formValues: {},
        initialCount: +this.props.item.servings,
        count: +this.props.item.servings,
        ingredients: this.props.item.ingredients,
        formElements: []
    };

    nToBr = ( data ) => {
        if ( undefined === data || '' === data ) {
            return ' ';
        } else {
            let formatted = data.replace( /(?:\r\n|\r|\n)/g, '<br/>' );
            return formatted;
        }
    };

    printThis = () => {
        window.print();
    };

    plusQty = () => {
        this.setState( {
            count: +this.props.item.servings++,
            ingredients: this.props.item.ingredients.replace( /\d*\.?\d+/g, k => ( k * +this.props.item.servings / this.state.initialCount ).toFixed( 2 ).replace( /\.0+$/, '' ) )
        } );
    };

    minusQty = () => {
        if ( +this.props.item.servings >  1 ) {
            this.setState( {
                count: +this.props.item.servings--
            } );
        }
        this.setState( {
            ingredients: this.props.item.ingredients.replace( /\d*\.?\d+/g, k => ( k * +this.props.item.servings / this.state.initialCount ).toFixed( 2 ).replace( /\.0+$/, '' ) )
        } );
    };

    openLinkInBrowser = async url => {
		await shell.openExternal( url );
	};

    onClose = () => {
        const { onClose } = this.props;
        this.setState( { formValues: {} } );
        onClose && onClose();

		// BUG: Lag
        // window.location.reload();
    };

    _footer = () => {
        return (
            <div className='footer-buttons'>
                <span onClick={this.printThis}>
                    <SvgIcon name='print'/>
                </span>
                <span onClick={this.onClose}>
                    <SvgIcon name='cancel'/>
                </span>
                <style>
                    {/* F... inline style */}
                    {`
                        @media print {
                            body {
                                padding: 0;
                                margin: 0;
                            }
                            .modal-header {
                                position: absolute;
                                top: 200px;
                                padding: 0;
                                left: 50%;
                            }
                            .modal-header .title {
                                color: #000 !important;
                            }
                            .modal-header span,
                            .modal-footer {
                                visibility: hidden;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper {
                                width: 100%;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper .image {
                                max-height: 200px;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper .tech {
                                font-size: .25rem;
                                color: #000 !important;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper .tech svg,
                            .comp_recipe-generator-modal .modal-content .modal-body .ingredients-wrapper svg,
                            .comp_recipe-generator-modal .modal-content .modal-body .directions-wrapper svg {
                                color: #000 !important;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .ingredients-wrapper {
                                color: #000 !important;
                                font-size: .35rem;
                                line-height: 180%;
                                width: 20%;
                                padding: 0 20px 0 0;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .directions-wrapper {
                                color: #000 !important;
                                font-size: .4rem;
                                width: 80%;
                                padding: 0;
                            }
							.comp_recipe-generator-modal .modal-content .modal-body .ingredients-wrapper label .plus-minus,
                            .comp_recipe-generator-modal .modal-content .modal-body .ingredients-wrapper label .qty {
								display: none;
							}
                        }
                    `}
                </style>
            </div>
        );
    };

    render() {
        const { t, show, item } = this.props;

        return (
            <div className='comp_recipe-generator-modal'>
                <Modal
                    show={show}
                    onClose={this.onClose}
                    title={item.title}
                    footerTemplate={this._footer}
                >
                    <div className='image-tech-wrapper'>
                        <div className='image'>
                            <img src={ StorageHelpers.readImg( item.picName ) } alt=''/>
                        </div>
                        <div className='tech'>
                            <div className='difficulty'>
                                <label>
                                    <span><SvgIcon name='difficulty'/></span>{ t( 'Difficulty' ) }
                                </label>
                                {item.difficultylevel}
                            </div>
                            <div className='prep'>
                                <label>
                                    <span><SvgIcon name='clock'/></span>{ t( 'Prep time' ) }
                                </label>
                                {item.prep}
                                </div>
                            <div className='cook'>
                                <label>
                                    <span><SvgIcon name='clock'/></span>{ t( 'Cook time' ) }
                                </label>
                                {item.cook}
                            </div>
                        </div>
                        <div className='tech'>
                            <div className='source-url'>
                                <label>
                                    <span><SvgIcon name='global'/></span>{ t( 'Source url' ) }
                                </label>
                                <div className='ext-link' onClick={() => this.openLinkInBrowser( item.sourceurl )}>{item.sourceurl}</div>
                            </div>
                        </div>
                    </div>
                    <div className='ingredients-wrapper'>
                        <label>
                            <div className='plus-minus'>
                                <div className='plus' onClick={this.plusQty}><SvgIcon name='plus'/></div>
                                <div className='minus' onClick={this.minusQty}><SvgIcon name='minus'/></div>
                            </div>
                            <span><SvgIcon name='ingredients'/></span>
                            { t( 'Ingredients' ) }
                            <span className='qty'><SvgIcon name='servings'/> <span id='qtynb'>{item.servings}</span></span>
                        </label>
                        { Parser( this.nToBr( this.state.ingredients ) ) }
                    </div>
                    <div className='directions-wrapper'>
                        <label>
                            <span><SvgIcon name='concierge'/></span>{ t( 'Directions' ) }
                        </label>
                        { Parser( this.mdParser.render( item.directions ) ) }
                    </div>
                </Modal>
            </div>
        );
    }
}

RecipeGeneratorModalNotExtended.propTypes = {
    show: PropTypes.bool,
    item: PropTypes.object
};

const RecipeGeneratorModal = hoistStatics( withTranslation()( RecipeGeneratorModalNotExtended ), RecipeGeneratorModalNotExtended );

export default RecipeGeneratorModal;
