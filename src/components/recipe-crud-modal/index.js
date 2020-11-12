import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
import StarRatingComponent from 'react-star-rating-controlled-component';
import ImageUploader from 'react-images-upload';
import fs from 'fs';

import Modal from '../modal';
import Api from '../../core/api';
import { ChoiceField, NumberField, TextareaField, TextField, TagsField, MarkdownField, UrlField } from '../form-elements';
import {isTextValid} from '../../core/utils';
import SvgIcon from '../svgicon';
import { NotyHelpers, ReduxHelpers, TagHelpers, StorageHelpers } from '../../core/helpers';
import '../i18n';

import './style.scss';

class RecipeCrudModalNotExtended extends React.Component {
    state = {
		formValues: {},
		errorValues: {},
		autoSuggest: [],
		isMouseInside: false
	};

	componentDidUpdate( prevProps, prevState, snapshot ) {
		const { id, show } = this.props;

		if ( show && id && prevProps.show !== show ) {
			const formValues = new Api().getRecipeById( id );
			this.setState( { formValues } );
		}

		if ( show && prevProps.show !== show ) {
			const autoSuggest = TagHelpers.getAllItems();
			this.setState( { autoSuggest } );
		}
	}

	hideImgPreview = () => {
		this.setState({ isMouseInside: true });
	};

	showImgPreview = () => {
		this.setState({ isMouseInside: false });
	};

    setFormValues = ( obj ) => {
		const { formValues } = this.state;
		this.setState( { formValues: { ...formValues, ...obj } } );
	};

    onClose = () => {
		const { onClose, setTags, setRecipeList, selectedMenu } = this.props;
		this.setState( { formValues: {}, errorValues: {} } );
		setTags();
		setRecipeList( selectedMenu );
		onClose && onClose();
    };

    onSubmit = () => {
        const { formValues } = this.state;
		const { t, id } = this.props;
		const feather = require( 'feather-icons' );
		let isFormValid = true;
		let errorValues = {};

		// eslint-disable-next-line
		let regex = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/igm;

		if ( ! isTextValid( formValues.title ) ) {
			errorValues.title = t( 'This field is required!' );
			isFormValid = false;
		}

		if ( undefined === formValues.ingredients || '' === formValues.ingredients ) {
		} else {
			formValues.ingredients = formValues.ingredients.replace( /,/g, '.' );
			formValues.ingredients = formValues.ingredients.replace( /\d+/g, k => Number( k ).toFixed( 0 ) );
		}

		if ( ( formValues.servings > 1 ) && isNaN( formValues.servings ) ) {
			errorValues.servings = t( 'Not a valid number' );
			isFormValid = false;
		} else if ( '' === formValues.servings || 'undefined' === formValues.servings || isNaN( formValues.servings ) ) {
			formValues.servings = 1;
		}

		if ( undefined === formValues.sourceurl || '' === formValues.sourceurl ) {
		} else {
			if ( ! regex.test( formValues.sourceurl ) ) {
				errorValues.sourceurl = t( 'Non-valid URL' );
				isFormValid = false;
			}
		}

        if ( isFormValid ) {
            let dataToDb = { ...formValues };
            dataToDb.tags = dataToDb.tags || '';
            dataToDb.directions = dataToDb.directions || '';
            dataToDb.isfavorite = dataToDb.isfavorite || false;
            dataToDb.isTrash = dataToDb.isTrash || false;
            dataToDb.id = id || shortid.generate();

            if ( undefined === id ) {
                new Api().addNewRecipeItem( dataToDb );
            } else {
                new Api().updateRecipeItem( dataToDb );
            }

            NotyHelpers.open( feather.icons.save.toSvg() + t( 'Saved' ), 'success', 1500 );
            this.onClose();

			// BUG: Lag
			setTimeout( function() {
				window.location.reload();
			}, 1500 );

        }

        this.setState({ errorValues });
    };

    _footer = () => {
        return (
            <div className='footer-buttons'>
                <span onClick={this.onClose}>
                    <SvgIcon name='cancel'/>
                </span>
                <span onClick={this.onSubmit}>
                    <SvgIcon name='save'/>
                </span>
            </div>
        );
    };

    render() {
        const { formValues, errorValues, autoSuggest } = this.state;
        const { t, id, show } = this.props;
		const picsDirectory = StorageHelpers.preference.get( 'storagePath' ) + '/medias';
		if ( ! fs.existsSync( picsDirectory ) ) {
			fs.mkdirSync( picsDirectory );
		}

        // eslint-disable-next-line
        const modalTitle = `${undefined !== id ? t( 'Edit' ) : t( 'New' )}` + ' ' + `${t( 'Recipe' )}`;
        const item = new Api().getRecipeById( id );
        const previewImg = `${ undefined !== id ? StorageHelpers.readImg( item.picName ) : '' }`;
        const levels = [
            t( 'easy' ),
            t( 'medium' ),
            t( 'difficult' )
        ];
        const categories = [
            t( 'appetizers' ),
            t( 'beverages' ),
            t( 'breakfast' ),
            t( 'desserts' ),
            t( 'main dishes' ),
            t( 'salads' ),
            t( 'sauces' ),
			t( 'side dishes' ),
            t( 'soups' ),
            t( 'vegetables' )
        ];

        return (
            <div className='comp_recipe-crud-modal'>
                <Modal
                    show={show}
                    onClose={this.onClose}
                    title={modalTitle}
                    footerTemplate={this._footer}
                >

                    <div className='title-image-tech-wrapper'>
                        <div className='title-tech-wrapper'>
                            <TextField
                                name='title'
                                label={t( 'Title*' )}
                                value={formValues.title}
                                errorText={errorValues.title}
                                onChangeText={title => this.setFormValues({ title })}
                            />

                            <div className='tech'>
                                <ChoiceField
                                    name='difficultylevel'
                                    label={<SvgIcon name='difficulty'/>}
                                    id={formValues.difficultylevel}
                                    value={'undefined' !== typeof formValues.difficultylevel ? formValues.difficultylevel : ''}
                                    options={levels}
                                    placeholder={''}
                                    errorText={errorValues.difficultylevel}
                                    onChangeText={difficultylevel => this.setFormValues({ difficultylevel })}
                                />
                                <NumberField
                                    name='servings'
                                    label={<span><SvgIcon name='servings'/> {t( 'Servings' )}</span>}
                                    min={1}
                                    step={1}
                                    value={formValues.servings}
                                    errorNumber={errorValues.servings}
                                    onChangeNumber={servings => this.setFormValues({ servings })}
                                />
                                <TextField
                                    name='prep'
                                    label={<span><SvgIcon name='clock'/> {t( 'Prep time' )}</span>}
                                    value={formValues.prep}
                                    errorText={errorValues.prep}
                                    onChangeText={prep => this.setFormValues({ prep })}
                                />
                                <TextField
                                    name='cook'
                                    label={<span><SvgIcon name='clock'/> {t( 'Cook time' )}</span>}
                                    value={formValues.cook}
                                    errorText={errorValues.cook}
                                    onChangeText={cook => this.setFormValues({ cook })}
                                />
                            </div>

                            <div className='tech-two'>
                                <ChoiceField
                                    name='categories'
                                    label={ <span><SvgIcon name='meal'/> { t( 'Category' ) }</span> }
                                    id={formValues.categories}
                                    value={'undefined' !== typeof formValues.categories ? formValues.categories : ''}
                                    options={categories}
									placeholder={''}
                                    errorText={errorValues.categories}
                                    onChangeText={categories => this.setFormValues({ categories })}
                                />
                                <div className='comp_fe_choice-field'>
									<div className='form-group rating'>
										<label className='form-label'>
											<span><SvgIcon name='toque'/> { t( 'Rating' ) }</span>
										</label>
										<StarRatingComponent
											name='rating'
											value={'undefined' !== typeof formValues.rating ? formValues.rating : 0}
                                            renderStarIcon={() => <SvgIcon name='star'/>}
											onStarClick={rating => this.setFormValues({ rating })}
											starColor='#ffb400'
											emptyStarColor='#333'
										/>
									</div>
                                </div>
                            </div>
                        </div>

                        <div className='comp_fe_image-field'>
							<div className='image-preview' onMouseEnter={this.hideImgPreview} onMouseLeave={this.showImgPreview}>
								{this.state.isMouseInside ? null : <img className={id} src={previewImg} alt='' />}
							</div>
								{this.state.isMouseInside ?
									<div className='uploader-wrapper'>
										<div className='uploader-close' onClick={this.showImgPreview}>x</div>
										<ImageUploader
											className='image-uploader'
											name='image'
											accept='image/*'
											withPreview={true}
											withIcon={true}
											singleImage={true}
											buttonText={t( 'Choose an image' )}
											onChange={
												pic => {
													if ( pic[0] ) {
														const picName = pic[0].name;
														const initialPath = pic[0].path;
														const imgPath = picsDirectory + '/' + picName;
														fs.copyFileSync( initialPath, imgPath );
														this.setFormValues({ picName });
													}
												}
											}
											imgExtension={['.jpg', '.jpeg', '.png']}
											maxFileSize={1048576}
											label={t( 'Max file size 1mb - Type accepted jpg or png' )}
											fileSizeError={' ' + t( 'file size is too big' )}
											fileTypeError={' ' + t( 'is not supported file extension' )}
										/>
									</div>
								: null }
                        </div>
                    </div>

                    <UrlField
                        name='sourceurl'
                        label={<span><SvgIcon name='global'/> {t( 'Source url' )}</span>}
                        value={formValues.sourceurl}
                        errorText={errorValues.sourceurl}
                        onChangeText={sourceurl => this.setFormValues({ sourceurl })}
                    />
                    <TagsField
                        name='tags'
                        label={<span><SvgIcon name='tag'/> {t( 'Tags' )}</span>}
                        placeholder={t( 'Add tag...' )}
                        info={t( 'To add multiple tags, separate each one of them with a comma, then press Enter to validate' )}
                        value={formValues.tags || ''}
                        onChangeText={tags => this.setFormValues({ tags })}
                        suggestions={autoSuggest}
                    />

                    <div className='textareas-wrapper'>
                        <TextareaField
                            name='ingredients'
                            label={<span><SvgIcon name='ingredients'/> {t( 'Ingredients' )}</span>}
                            value={formValues.ingredients}
                            errorText={errorValues.ingredients}
                            onChangeText={ingredients => this.setFormValues({ ingredients })}
                        />

                        <MarkdownField
                            name='directions'
                            label={t( 'Directions' )}
                            value={formValues.directions || ''}
                            onChangeText={directions => this.setFormValues({ directions })}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

RecipeCrudModalNotExtended.propTypes = {
    id: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func
};

const mapStateToProps = state => {
    const { selectedMenu } = state.sidebar;
    return { selectedMenu };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setTags: () => ReduxHelpers.fillTags( dispatch ),
        setRecipeList: selectedMenu => ReduxHelpers.fillRecipes( dispatch, selectedMenu )
    };
};

const RecipeCrudModal = hoistStatics( withTranslation()( RecipeCrudModalNotExtended ), RecipeCrudModalNotExtended );

export default connect( mapStateToProps, mapDispatchToProps )( RecipeCrudModal );
