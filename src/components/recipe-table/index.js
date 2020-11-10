import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import {NotyHelpers, ReduxHelpers} from '../../core/helpers';
import SvgIcon from '../svgicon';
import RecipeCrudModal from '../recipe-crud-modal';
import Api from '../../core/api';
import {openConfirmDialog} from '../confirm-dialog';
import RecipeGeneratorModal from '../recipe-generator-modal';

import './style.scss';

class RecipeTableNotExtended extends Component {
	state = {
		showCrudModal: false,
		showGeneratorModal: false,
		confirmDialogTitle: '',
		confirmDialogText: '',
		showConfirmDialog: false
	};

	togglefavorite = () => {
		const { item, selectedMenu, setRecipeList } = this.props;
		let updatedItem = item;
		updatedItem.isfavorite = ! updatedItem.isfavorite;
		new Api().updateRecipeItem( updatedItem );

		setRecipeList( selectedMenu );
	};

	onClickMoveOnTrash = item => {
		const { t, selectedMenu, setRecipeList, setTags } = this.props;
		const feather = require( 'feather-icons' );

		openConfirmDialog({
			title: t( 'Confirmation' ),
			text: t( 'Do you really want to trash this recipe?' ),
			buttons: [
				{
					label: t( 'Yes' ),
					onClick: () => {
						item.isTrash = true;
						new Api().updateRecipeItem( item );
						setRecipeList( selectedMenu );
						setTags();
						NotyHelpers.open( feather.icons.trash.toSvg() + t( 'This recipe has been trashed!' ), 'error', 2000 );
					},
					className: 'btn btn-danger'
				},
				{
					label: t( 'No' ),
					onClick: () => null,
					className: 'btn btn-default'
				}
			]
		});
	};

	onClickRemovePermanently = id => {
		const { t, selectedMenu, setRecipeList, setTags } = this.props;
		const feather = require( 'feather-icons' );

		openConfirmDialog({
			title: t( 'Confirmation' ),
			text: t( 'Do you really want to delete this recipe permanently? This process cannot be undone!' ),
			buttons: [
				{
					label: t( 'Yes' ),
					onClick: () => {
						new Api().deleteRecipeById( id );
						setRecipeList( selectedMenu );
						setTags();
						NotyHelpers.open( feather.icons.zap.toSvg() + t( 'This recipe has been deleted permanently!' ), 'success', 1500 );
					},
					className: 'btn btn-danger'
				},
				{
					label: t( 'No' ),
					onClick: () => null,
					className: 'btn btn-default'
				}
			]
		});
	};

	restoreFromTrash = item => {
		const { t, selectedMenu, setRecipeList, setTags } = this.props;
		const feather = require( 'feather-icons' );

		item.isTrash = false;
		new Api().updateRecipeItem( item );
		setRecipeList( selectedMenu );
		setTags();
		NotyHelpers.open( feather.icons.award.toSvg() + t( 'The recipe has been restored from trash!' ), 'success', 2000 );
	};

	stars = () => {
		const { item } = this.props;

		if ( 1 === item.rating ) {
			return <span><SvgIcon name='star'/></span>;
		} else if ( 2 === item.rating ) {
			return <span><SvgIcon name='star'/><SvgIcon name='star'/></span>;
		} else if ( 3 === item.rating ) {
			return <span><SvgIcon name='star'/><SvgIcon name='star'/><SvgIcon name='star'/></span>;
		} else if ( 4 === item.rating ) {
			return <span><SvgIcon name='star'/><SvgIcon name='star'/><SvgIcon name='star'/><SvgIcon name='star'/></span>;
		} else if ( 5 === item.rating ) {
			return <span><SvgIcon name='star'/><SvgIcon name='star'/><SvgIcon name='star'/><SvgIcon name='star'/><SvgIcon name='star'/></span>;
		} else {
			return;
		}
	};

	favorite = () => {
		const { item } = this.props;

		if ( true === item.isfavorite ) {
			return <span><SvgIcon name='bookmark'/></span>;
		} else {
			return;
		}
	};

	render() {
		const { t, item, selectedMenu } = this.props;
		const { showCrudModal, showGeneratorModal } = this.state;
		const stars = this.stars();

		return (
			<tr className='comp_recipe-table-row'>
				<td className='td-modals'>
					<RecipeCrudModal
						id={item.id}
						show={showCrudModal}
						onClose={ () => this.setState( { showCrudModal: false } ) }
					/>

					<RecipeGeneratorModal
						item={item}
						show={showGeneratorModal}
						onClose={ () => this.setState( { showGeneratorModal: false } ) }
					/>
				</td>
				<td className='td-title' onClick={ () => this.setState( { showGeneratorModal: true } ) } >
					{item.title}
				</td>
				<td className='td-servings' onClick={ () => this.setState( { showGeneratorModal: true } ) } >
					{item.servings}
				</td>
				<td className='td-difficulty' onClick={ () => this.setState( { showGeneratorModal: true } ) } >
					{item.difficultylevel}
				</td>
				<td className='td-prep' onClick={ () => this.setState( { showGeneratorModal: true } ) } >
					{item.prep}
				</td>
				<td className='td-cook' onClick={ () => this.setState( { showGeneratorModal: true } ) } >
					{item.cook}
				</td>
				<td className='td-rating' onClick={ () => this.setState( { showGeneratorModal: true } ) } >
					{stars}
				</td>
				<td className='td-favorite'>
					{
						'trash' === selectedMenu.slug ?
							(
								<ul className='recipe-list-menu'>
									<li className='trash' title='' onClick={() => this.onClickRemovePermanently( item.id )}>
										<SvgIcon name='trash'/>
									</li>
									<li className='restore' title={ t( 'Restore' ) } onClick={() => this.restoreFromTrash( item )}>
										<SvgIcon name='restore'/>
									</li>
								</ul>
							)
							: (
								<ul className='recipe-list-menu'>
									<li
										className={`favorite-${item.isfavorite}`}
										onClick={this.togglefavorite}
										title={ t( 'Favorite / Unfavorite' ) }
									>
										{
											item.isfavorite ? <SvgIcon name='bookmark'/> : <SvgIcon name='bookmark_outline'/>
										}
									</li>
									<li className='edit' title={ t( 'Edit ' ) } onClick={ () => this.setState( { showCrudModal: true } ) }>
										<SvgIcon name='edit'/>
									</li>
									<li onClick={() => this.onClickMoveOnTrash( item )} className='trash' title={ t( 'Move to trash' ) }>
										<SvgIcon name='trash'/>
									</li>
								</ul>
							)
					}
				</td>
			</tr>
		);
	}
}

RecipeTableNotExtended.propTypes = {
	item: PropTypes.object
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

const RecipeTable = hoistStatics( withTranslation()( RecipeTableNotExtended ), RecipeTableNotExtended );

export default connect( mapStateToProps, mapDispatchToProps )( RecipeTable );
