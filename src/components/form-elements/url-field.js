import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class UrlField extends Component {
    render() {
        const { label, name, placeholder, value, onChangeText, errorText, readOnly } = this.props;

        // eslint-disable-next-line
        let formGroupClassName = 'form-group' + ` ${name}`;
        if ( '' !== errorText ) {
            formGroupClassName += ' has-error';
        }

        return (
            <div className='comp_fe_url-field'>
                <div className={formGroupClassName}>
                    { '' !== label ? <label className='form-label' htmlFor={name}>{label}</label> : null}
                    <input
                        name={name}
                        type='url'
                        className='form-control'
                        value={value || ''}
                        id={name}
                        placeholder={placeholder}
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

UrlField.defaultProps = {
    label: '',
    errorText: '',
    readOnly: false
};

UrlField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    errorText: PropTypes.string,
    readOnly: PropTypes.bool
};

export default UrlField;
