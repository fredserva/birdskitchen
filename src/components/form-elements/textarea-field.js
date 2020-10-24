import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class TextareaField extends Component {
    render() {
        const { label, name, value, onChangeText, errorText, readOnly } = this.props;

        // eslint-disable-next-line
        let formGroupClassName = 'form-group' + ` ${name}`;
        if ( '' !== errorText ) {
            formGroupClassName += ' has-error';
        }

        return (
            <div className='comp_fe_textarea-field'>
                <div className={formGroupClassName}>
                    { '' !== label ? <label className='form-label' htmlFor={name}>{label}</label> : null}
                    <textarea
                        name={name}
                        className='form-control'
                        value={value || ''}
                        id={name}
                        onChange={e => {
                            onChangeText && onChangeText( e.target.value );
                        }}
                        readOnly={readOnly}
                    />
                    { '' !== errorText ? <label className='error-label' htmlFor={name}>{errorText}</label> : null}
                </div>
            </div>
        );
    }
}

TextareaField.defaultProps = {
    label: '',
    errorText: '',
    readOnly: false
};

TextareaField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    errorText: PropTypes.string,
    readOnly: PropTypes.bool
};

export default TextareaField;
