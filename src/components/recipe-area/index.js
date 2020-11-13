import React from 'react';
import {connect} from 'react-redux';

import ContentHeader from '../content-header';
import RecipeList from '../recipe-list';

import './style.scss';

class RecipeArea extends React.Component {
    render() {
        const { selectedMenu, recipes } = this.props;

        return (
            <div className='comp_recipe-area'>
                <div className='header-container'>
                    <ContentHeader
                        title={selectedMenu?.name}
                        itemLength={recipes.length}
                        icon={selectedMenu?.icon}
                    />
                </div>
                <div className='body-container'>
                    <RecipeList
                        items={recipes}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedMenu } = state.sidebar;
    const { recipes } = state.recipe;
    return { selectedMenu, recipes };
};

export default connect( mapStateToProps )( RecipeArea );
