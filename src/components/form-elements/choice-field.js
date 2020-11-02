import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import './style.scss';

class ChoiceFieldNotExtended extends Component {
    onChange = e => {
        const { onChangeText } = this.props;
        onChangeText && onChangeText( e.target.value );
    };

    render() {
        const { t, id, label, name, options, placeholder, errorText } = this.props;
        let formGroupClassName = 'form-group';
        if ( '' !== errorText ) {
            formGroupClassName += ' has-error';
        }

        return (
            <div className='comp_fe_choice-field'>
                <div className={formGroupClassName}>
                    { '' !== label ? <label className='form-label' htmlFor={name}>{label}</label> : null}

                    <select id={name} onChange={this.onChange} value={id} className='form-control'>
                        <option>{placeholder}</option>
                        {
                            options.map( ( val, index ) => {
                                return <option key={`choice_${index}`} value={val}>{ t( val.charAt( 0 ).toUpperCase() + val.slice( 1 ) ) }</option>;
                            })
                        }
                    </select>

                    { '' !== errorText ? <label className='error-label' htmlFor={name}>{errorText}</label> : null}
                </div>
            </div>
        );
    }
}

ChoiceFieldNotExtended.defaultProps = {
    label: '',
    errorText: '',
    options: []
};

ChoiceFieldNotExtended.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    onChangeText: PropTypes.func,
    errorText: PropTypes.string
};

const ChoiceField = hoistStatics( withTranslation()( ChoiceFieldNotExtended ), ChoiceFieldNotExtended );

export default ChoiceField;
