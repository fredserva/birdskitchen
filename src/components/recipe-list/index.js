import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import RecipeListItem from '../recipe-list-item';
import './style.scss';

class RecipeListNotExtended extends React.Component {
    render() {
        const { t, items } = this.props;

        return (
            <span>
                <div className='list-header'>
                    <div className='list-header-title'>
                        { t( 'Name' ) }
                    </div>
                    <div className='list-header-servings'>
                        { t( 'Servings' ) }
                    </div>
                    <div className='list-header-difficulty'>
                        { t( 'Difficulty' ) }
                    </div>
                    <div className='list-header-prep'>
                        { t( 'Prep time' ) }
                    </div>
                    <div className='list-header-cook'>
                        { t( 'Cook time' ) }
                    </div>
                    <div className='list-header-rating'>
                        { t( 'Rating' ) }
                    </div>
                    <div className='list-header-favorite'>
                        { t( 'Favorites' ) }
                    </div>
                </div>
                <div className='comp_recipe-list'>
                    {
                        items.map( ( value, index ) => {
                            return <RecipeListItem key={ index } item={ value }/>;
                        } )
                    }
                </div>
            </span>
        );
    }
}

RecipeListNotExtended.defaultProps = {
    items: []
};

RecipeListNotExtended.propTypes = {
    items: PropTypes.array
};

const RecipeList = hoistStatics( withTranslation()( RecipeListNotExtended ), RecipeListNotExtended );

export default RecipeList;
