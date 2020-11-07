import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import FileInputComponent from 'react-file-input-previews-base64';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
import StarRatingComponent from 'react-star-rating-controlled-component';

import Modal from '../modal';
import Api from '../../core/api';
import { ChoiceField, NumberField, TextareaField, TextField, TagsField, MarkdownField, UrlField } from '../form-elements';
import {isTextValid} from '../../core/utils';
import SvgIcon from '../svgicon';
import { NotyHelpers, ReduxHelpers, TagHelpers } from '../../core/helpers';
import '../i18n';

import './style.scss';

class RecipeCrudModalNotExtended extends React.Component {
    state = {
		formValues: {},
		errorValues: {},
		autoSuggest: []
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
		let regex = /^(http:\/\/www\.|https:\/\/www\.|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;

		if ( ! isTextValid( formValues.title ) ) {
			errorValues.title = t( 'This field is required!' );
			isFormValid = false;
		}

		if ( ( formValues.servings > 1 ) && isNaN( formValues.servings ) ) {
			errorValues.servings = t( 'Not a valid number' );
			isFormValid = false;
		}

		if ( ! regex.test( formValues.sourceurl ) && '' !== formValues.sourceurl ) {
			errorValues.sourceurl = t( 'Non-valid URL' );
			isFormValid = false;
		}

        if ( undefined === formValues.picture || '' === formValues.picture ) {
            formValues.picture = {
                '': 'placeholder.png',
                'type': 'image/png',
                'size': '996',
                'base64': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQAgMAAAAPW/YLAAAACVBMVEVjaWygp6t+hIjGrRbLAAACnUlEQVR42u3bPY7TQBiA4bUlFz7AHsH3yBFSZKyFKkJCQpwiIHEE9zQ0nJIZO/YalKyEKOaLeJ5mtXHzKh6Pxz95egIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeEh9esOhWlb3VtZLtaznB8w6yZL1L1k/76qadbm3qZX10Fnt9Cli1pDyx+Gy2vnEEy5rXlbEyxpK1iVc1lSyzuGy5jPPMVpWHvHvp3SKltXk8d7Fy+pzT5vGeFnHPL7CZXUla0rxss6y/m5sBc2KeCSe8tw1xptOx5IWJOv77uTzOczJpx/3q8Awp+rh9XuLtLCZyvG3WwYeQmS1u/tGZdE8xlg0l5SAlxhlx22D60e5QRkiaz74wl2+Nq83JadLnIv9LqWPy+Bqy/ohStZzSt0yuPr1iAyQVaaHdhlc3XpEBsjK08M5T6gvy/d2iJI136J5nr+naT0iA2RNeVYvX9llnkrHIFnLmacp39M8UwTJmofW0zy45odA5xhZy6ia/wzp/XVerZ91HU5lcOX1zbT8Vz2ruR58+e85Tw9Dug64ylndOlVN6V1O6pfK6lnXvbY8ARrLPj0FyGq3h0798vxpOQJqZ12nh+vy5rju1NpZQ9pdZ5TCZp4iamdtQ2vefZf1XFQ5649rnu3MXTmr24ZW2X2nbZ1TOWt4vRLLu+9lu2isnPXbM+nhvA79yllfdhdim676xf63W+/SNNXv2Oymh51U+/7W7Vdp8udfK2edb3yep4gPlbMuNz4vT8nqZo03N0y137G5/ZbWUDvrcHNDXzvrzpbKWaf7wTWzjne2dCnkqz9NzKw8RYTMGmJm9V4re5isoG9Seh1W1n+V9eavC47VsoL+FgMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeBS/APEipcI05evwAAAAAElFTkSuQmCC',
                'file': {}
            };
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

            NotyHelpers.open( feather.icons.save.toSvg() + t( 'Saved' ), 'success', 2500 );
            this.onClose();
			setTimeout( function() {
				window.location.reload();
			}, 2500 );

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

        // eslint-disable-next-line
        const modalTitle = `${undefined !== id ? t( 'Edit' ) : t( 'New' )}` + ' ' + `${t( 'Recipe' )}`;
        const item = new Api().getRecipeById( id );
        const previewImg = `${ undefined !== id ? item.picture.base64 : '' }`;
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
                            <div className='image-preview'>
                                <img className={id} src={previewImg} alt='' />
                            </div>
                            <FileInputComponent
                                inputName='picture'
                                inputId={'pic-' + id}
                                value={formValues.picture}
                                labelText={t( 'Picture' )}
                                multiple={false}
                                accept='image/*'
                                imagePreview={true}
                                buttonComponent={<span><SvgIcon name='upload'/>{t( 'import a picture' )}</span>}
                                parentStyle={{ margin:'0 0 50px 0' }}
                                callbackFunction={
                                    picture => {
                                        this.setFormValues({ picture });
                                        let target = document.getElementsByClassName( id );
                                        if ( 0 !== target.length ) {
                                            target[0].remove();
                                        }
                                    }
                                }
                            />
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
