import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import SvgIcon from '../svgicon';
import RecipeListItem from '../recipe-list-item';
import RecipeTable from '../recipe-table';
import './style.scss';

class RecipeListNotExtended extends React.Component {
	sortTable = n => {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.querySelector( '#recipe-table' );
		switching = true;
		dir = 'asc';
		while ( switching ) {
			switching = false;
			rows = table.rows;
			for ( i = 1; i < ( rows.length - 1 ); i++ ) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName( 'td' )[n];
				y = rows[i + 1].getElementsByTagName( 'td' )[n];
				if ( 'asc' === dir ) {
					if ( x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() ) {
						shouldSwitch = true;
						break;
					}
				} else if ( 'desc' === dir ) {
					if ( x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() ) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if ( shouldSwitch ) {
				rows[i].parentNode.insertBefore( rows[i + 1], rows[i] );
				switching = true;
				switchcount++;
			} else {
				if ( 0 === switchcount && 'asc' === dir ) {
					dir = 'desc';
					switching = true;
				}
			}
		}
	};

    render() {
        const { t, items } = this.props;

        return (
            <span>
				<div className='comp_recipe-table'>
					<table id='recipe-table'>
						<thead className='comp_recipe-table-head'>
							<tr>
								<th className='th-modals'></th>
								<th className='th-title' onClick={ () => this.sortTable( 1 ) }>
									<span>
										{ t( 'Name' ) }
									</span>
									<SvgIcon name='sort'/>
								</th>
								<th className='th-servings'>
									<span>
										{ t( 'Servings' ) }
									</span>
								</th>
								<th className='th-difficulty' onClick={ () => this.sortTable( 3 ) }>
									<span>
										{ t( 'Difficulty' ) }
									</span>
									<SvgIcon name='sort'/>
								</th>
								<th className='th-prep' onClick={ () => this.sortTable( 4 ) }>
									<span>
										{ t( 'Prep time' ) }
									</span>
									<SvgIcon name='sort'/>
								</th>
								<th className='th-cook' onClick={ () => this.sortTable( 5 ) }>
									<span>
										{ t( 'Cook time' ) }
									</span>
									<SvgIcon name='sort'/>
								</th>
								<th className='th-rating' onClick={ () => this.sortTable( 6 ) }>
									<span>
										{ t( 'Rating' ) }
									</span>
									<SvgIcon name='sort'/>
								</th>
								<th className='th-favorite'></th>
							</tr>
						</thead>
						<tbody>
							{
								items.map( ( value, index ) => {
									return <RecipeTable key={ index } item={ value }/>;
								} )
							}
						</tbody>
					</table>
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
