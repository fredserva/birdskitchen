import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class NumberField extends Component {
    render() {
        const { label, name, value, min, step, onChangeNumber, errorNumber, readOnly } = this.props;

        // eslint-disable-next-line
        let formGroupClassName = 'form-group' + ` ${name}`;
        if ( '' !== errorNumber ) {
            formGroupClassName += ' has-error';
        }

        return (
            <div className='comp_fe_number-field'>
                <div className={formGroupClassName}>
                    { '' !== label ? <label className='form-label' htmlFor={name}>{label}</label> : null}
                    <input
                        name={name}
                        type='number'
                        min={ min || 1 }
                        step={ step || 1 }
                        className='form-control'
                        value={ value || 1 }
                        id={name}
                        onChange={e => {
                            onChangeNumber && onChangeNumber( e.target.value );
                        }}
                        readOnly={readOnly}
                    />
                    { '' !== errorNumber ? <label className='error-label' htmlFor={name}>{errorNumber}</label> : null}
                </div>
            </div>
        );
    }
}

NumberField.defaultProps = {
    label: '',
    value: 1,
    min: 1,
    step: 1,
    errorNumber: '',
    readOnly: false
};

NumberField.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number,
    step: PropTypes.number,
    onChangeNumber: PropTypes.func,
    errorNumber: PropTypes.string,
    readOnly: PropTypes.bool
};

export default NumberField;
