import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import SvgIcon from '../svgicon';

import './style.scss';

class UnitConverterNotExtended extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			massValue: '',
			fromMassMeasure: '',
			toMassMeasure: '',
			temperatureValue: '',
			fromTemperatureMeasure: '',
			toTemperatureMeasure: '',
			volumeValue: '',
			fromVolumeMeasure: '',
			toVolumeMeasure: '',
			massOutput: '',
			temperatureOutput: '',
			volumeOutput: '',
		};

		this.massHandleChange = this.massHandleChange.bind(this);
		this.temperatureHandleChange = this.temperatureHandleChange.bind(this);
		this.volumeHandleChange = this.volumeHandleChange.bind(this);
		this.massHandleOutput = this.massHandleOutput.bind(this);
		this.temperatureHandleOutput = this.temperatureHandleOutput.bind(this);
		this.volumeHandleOutput = this.volumeHandleOutput.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevState.massValue !== this.state.massValue ||
			prevState.fromMassMeasure !== this.state.fromMassMeasure ||
			prevState.toMassMeasure !== this.state.toMassMeasure
		) {
			this.massHandleOutput();
		}

		if (
			prevState.temperatureValue !== this.state.temperatureValue ||
			prevState.fromTemperatureMeasure !==
				this.state.fromTemperatureMeasure ||
			prevState.toTemperatureMeasure !== this.state.toTemperatureMeasure
		) {
			this.temperatureHandleOutput();
		}

		if (
			prevState.volumeValue !== this.state.volumeValue ||
			prevState.fromVolumeMeasure !== this.state.fromVolumeMeasure ||
			prevState.toVolumeMeasure !== this.state.toVolumeMeasure
		) {
			this.volumeHandleOutput();
		}
	}

	massHandleChange = (e) => {
		this.setState({ massValue: e.target.value });
	};

	fromMassMeasureHandleChange = (e) => {
		this.setState({ fromMassMeasure: e.target.value });
	};

	toMassMeasureHandleChange = (e) => {
		this.setState({ toMassMeasure: e.target.value });
	};

	temperatureHandleChange = (e) => {
		let temperature = e.target.value;
		this.setState({ temperatureValue: temperature });
	};

	fromTemperatureMeasureHandleChange = (e) => {
		this.setState({ fromTemperatureMeasure: e.target.value });
	};

	toTemperatureMeasureHandleChange = (e) => {
		this.setState({ toTemperatureMeasure: e.target.value });
	};

	volumeHandleChange = (e) => {
		let volume = e.target.value;
		this.setState({ volumeValue: volume });
	};

	fromVolumeMeasureHandleChange = (e) => {
		this.setState({ fromVolumeMeasure: e.target.value });
	};

	toVolumeMeasureHandleChange = (e) => {
		this.setState({ toVolumeMeasure: e.target.value });
	};

	massHandleOutput = () => {
		const mass = this.state.massValue;
		const from = this.state.fromMassMeasure;
		const to = this.state.toMassMeasure;
		const conversion = `${from}2${to}`;

		let massOutput;

		switch (conversion) {
			case '2':
			case '2grams':
			case 'grams2grams':
			case 'grams2':
			case 'kilograms2kilograms':
			case 'ounces2ounces':
			case 'pounds2pounds':
				massOutput = (mass * 1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2kilograms':
			case 'grams2kilograms':
				massOutput = (mass / 1000)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2ounces':
			case 'grams2ounces':
				massOutput = (mass / 28.35)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2pounds':
			case 'grams2pounds':
				massOutput = (mass / 453.59)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'kilograms2grams':
			case 'kilograms2':
				massOutput = (mass * 1000)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'kilograms2ounces':
				massOutput = ((mass * 1000) / 28.35)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'kilograms2pounds':
				massOutput = ((mass * 1000) / 453.59)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'ounces2grams':
			case 'ounces2':
				massOutput = (mass * 28.35)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'ounces2kilograms':
				massOutput = (mass * 0.02835)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'ounces2pounds':
				massOutput = (mass / 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pounds2grams':
			case 'pounds2':
				massOutput = (mass * 453.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pounds2kilograms':
				massOutput = (mass * 0.4535)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pounds2ounces':
				massOutput = (mass * 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			default:
				massOutput = (mass * 1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
		}

		this.setState({
			massOutput: massOutput,
		});
	};

	temperatureHandleOutput = () => {
		const temperature = this.state.temperatureValue;
		const from = this.state.fromTemperatureMeasure;
		const to = this.state.toTemperatureMeasure;
		const conversion = `${from}2${to}`;

		let temperatureOutput;

		switch (conversion) {
			case '2':
			case '2celcius':
			case 'celcius2celcius':
			case 'celcius2':
			case 'fahrenheit2fahrenheit':
				temperatureOutput = (temperature * 1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2fahrenheit':
			case 'celcius2fahrenheit':
				temperatureOutput = (temperature * (9 / 5) + 32)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fahrenheit2celcius':
			case 'fahrenheit2':
				temperatureOutput = (((temperature - 32) * 5) / 9)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			default:
				temperatureOutput = (temperature * 1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
		}

		this.setState({
			temperatureOutput: temperatureOutput,
		});
	};

	volumeHandleOutput = () => {
		const volume = this.state.volumeValue;
		const from = this.state.fromVolumeMeasure;
		const to = this.state.toVolumeMeasure;
		const conversion = `${from}2${to}`;

		let volumeOutput;

		switch (conversion) {
			case '2':
			case '2millilitres':
			case 'millilitres2millilitres':
			case 'centilitres2centilitres':
			case 'decilitres2decilitres':
			case 'litres2litres':
			case 'teaspoons2teaspoons':
			case 'tablespoons2tablespoons':
			case 'cups2cups':
			case 'fluid_ounces_imp2fluid_ounces_imp':
			case 'pints_imp2pints_imp':
			case 'gallons_imp2gallons_imp':
			case 'teaspoons_imp2teaspoons_imp':
			case 'tablespoons_imp2tablespoons_imp':
			case 'cups_imp2cups_imp':
			case 'fluid_ounces_us2fluid_ounces_us':
			case 'pints_us_liquid2pints_us_liquid':
			case 'pints_us_dry2pints_us_dry':
			case 'quarts_us_liquid2quarts_us_liquid':
			case 'quarts_us_dry2quarts_us_dry':
			case 'gallons_us_liquid2gallons_us_liquid':
			case 'gallons_us_dry2gallons_us_dry':
			case 'teaspoons_us2teaspoons_us':
			case 'tablespoons_us2tablespoons_us':
			case 'cups_us2cups_us':
				volumeOutput = (volume * 1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2centilitres':
			case 'millilitres2centilitres':
				volumeOutput = (volume * 0.1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2decilitres':
			case 'millilitres2decilitres':
				volumeOutput = (volume * 0.01)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2litres':
			case 'millilitres2litres':
				volumeOutput = (volume * 0.001)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2teaspoons':
			case 'millilitres2teaspoons':
				volumeOutput = (volume * 0.2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2tablespoons':
			case 'millilitres2tablespoons':
				volumeOutput = (volume * 0.066667)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2cups':
			case 'millilitres2cups':
				volumeOutput = (volume * 0.004)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2fluid_ounces_imp':
			case 'millilitres2fluid_ounces_imp':
				volumeOutput = (volume * 0.035195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2pints_imp':
			case 'millilitres2pints_imp':
				volumeOutput = (volume * 0.0017598)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2quarts_imp':
			case 'millilitres2quarts_imp':
				volumeOutput = (volume * 0.00087988)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2gallons_imp':
			case 'millilitres2gallons_imp':
				volumeOutput = (volume * 0.00021997)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2teaspoons_imp':
			case 'millilitres2teaspoons_imp':
				volumeOutput = (volume * 0, 168936)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2tablespoons_imp':
			case 'millilitres2tablespoons_imp':
				volumeOutput = (volume * 0.05631)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2cups_imp':
			case 'millilitres2cups_imp':
				volumeOutput = (volume * 0.003519)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2fluid_ounces_us':
			case 'millilitres2fluid_ounces_us':
				volumeOutput = (volume * 0.033814)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2pints_us_liquid':
			case 'millilitres2pints_us_liquid':
				volumeOutput = (volume * 0.0021134)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2pints_us_dry':
			case 'millilitres2pints_us_dry':
				volumeOutput = (volume * 0.0018162)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2quarts_us_liquid':
			case 'millilitres2quarts_us_liquid':
				volumeOutput = (volume * 0.0010567)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2quarts_us_dry':
			case 'millilitres2quarts_us_dry':
				volumeOutput = (volume * 0.00090808)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2gallons_us_liquid':
			case 'millilitres2gallons_us_liquid':
				volumeOutput = (volume * 0.00026417)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2gallons_us_dry':
			case 'millilitres2gallons_us_dry':
				volumeOutput = (volume * 0.00022702)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2teaspoons_us':
			case 'millilitres2teaspoons_us':
				volumeOutput = (volume * 0.20288)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2tablespoons_us':
			case 'millilitres2tablespoons_us':
				volumeOutput = (volume * 0.067628)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case '2cups_us':
			case 'millilitres2cups_us':
				volumeOutput = (volume * 0.0042268)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2millilitres':
			case 'centilitres2':
				volumeOutput = (volume * 10)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2decilitres':
				volumeOutput = (volume * 0.1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2litres':
				volumeOutput = (volume * 0.01)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2teaspoons':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2tablespoons':
				volumeOutput = (volume * 0.66667)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2cups':
				volumeOutput = (volume * 0.04)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2fluid_ounces_imp':
				volumeOutput = (volume * 0.35195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2pints_imp':
				volumeOutput = (volume * 0.017598)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2quarts_imp':
				volumeOutput = (volume * 0.0087988)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2gallons_imp':
				volumeOutput = (volume * 0.0021997)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2teaspoons_imp':
				volumeOutput = (volume * 1.68936)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2tablespoons_imp':
				volumeOutput = (volume * 0.56312)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2cups_imp':
				volumeOutput = (volume * 0.035195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2fluid_ounces_us':
				volumeOutput = (volume * 0.33814)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2pints_us_liquid':
				volumeOutput = (volume * 0.021134)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2pints_us_dry':
				volumeOutput = (volume * 0.018162)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2quarts_us_liquid':
				volumeOutput = (volume * 0.010567)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2quarts_us_dry':
				volumeOutput = (volume * 0.0090808)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2gallons_us_liquid':
				volumeOutput = (volume * 0.0026417)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2gallons_us_dry':
				volumeOutput = (volume * 0.0022702)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2teaspoons_us':
				volumeOutput = (volume * 2.0288)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2tablespoons_us':
				volumeOutput = (volume * 0.67628)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'centilitres2cups_us':
				volumeOutput = (volume * 0.042268)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2millilitres':
			case 'decilitres2':
				volumeOutput = (volume * 100)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2centilitres':
				volumeOutput = (volume * 10)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2litres':
				volumeOutput = (volume * 0.1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2teaspoons':
				volumeOutput = (volume * 20)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2tablespoons':
				volumeOutput = (volume * 6.666666)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2cups':
				volumeOutput = (volume * 0.4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2fluid_ounces_imp':
				volumeOutput = (volume * 3.5195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2pints_imp':
				volumeOutput = (volume * 0.17597)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2quarts_imp':
				volumeOutput = (volume * 0.087987)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2gallons_imp':
				volumeOutput = (volume * 0.02199)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2teaspoons_imp':
				volumeOutput = (volume * 16.89363)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2tablespoons_imp':
				volumeOutput = (volume * 5.63121)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2cups_imp':
				volumeOutput = (volume * 0.35195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2fluid_ounces_us':
				volumeOutput = (volume * 3.3814)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2pints_us_liquid':
				volumeOutput = (volume * 0.21133)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2pints_us_dry':
				volumeOutput = (volume * 0.18161)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2quarts_us_liquid':
				volumeOutput = (volume * 0.10566)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2quarts_us_dry':
				volumeOutput = (volume * 0.0908)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2gallons_us_liquid':
				volumeOutput = (volume * 0.02641)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2gallons_us_dry':
				volumeOutput = (volume * 0.0227)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2teaspoons_us':
				volumeOutput = (volume * 20.28841)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2tablespoons_us':
				volumeOutput = (volume * 6.7628)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'decilitres2cups_us':
				volumeOutput = (volume * 0.42267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2millilitres':
			case 'litres2':
				volumeOutput = (volume * 1000)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2centilitres':
				volumeOutput = (volume * 100)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2decilitres':
				volumeOutput = (volume * 10)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2teaspoons':
				volumeOutput = (volume * 200)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2tablespoons':
				volumeOutput = (volume * 66.66666)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2cups':
				volumeOutput = (volume * 4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2fluid_ounces_imp':
				volumeOutput = (volume * 35.195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2pints_imp':
				volumeOutput = (volume * 1.7597)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2quarts_imp':
				volumeOutput = (volume * 0.87987)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2gallons_imp':
				volumeOutput = (volume * 0.2199)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2teaspoons_imp':
				volumeOutput = (volume * 168.9363)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2tablespoons_imp':
				volumeOutput = (volume * 56.3121)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2cups_imp':
				volumeOutput = (volume * 3.5195)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2fluid_ounces_us':
				volumeOutput = (volume * 33.814)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2pints_us_liquid':
				volumeOutput = (volume * 2.1133)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2pints_us_dry':
				volumeOutput = (volume * 1.8161)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2quarts_us_liquid':
				volumeOutput = (volume * 1.0566)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2quarts_us_dry':
				volumeOutput = (volume * 0.908)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2gallons_us_liquid':
				volumeOutput = (volume * 0.2641)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2gallons_us_dry':
				volumeOutput = (volume * 0.227)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2teaspoons_us':
				volumeOutput = (volume * 202.88413)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2tablespoons_us':
				volumeOutput = (volume * 67.628)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'litres2cups_us':
				volumeOutput = (volume * 4.2267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2millilitres':
			case 'teaspoons2':
				volumeOutput = (volume * 5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2centilitres':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2decilitres':
				volumeOutput = (volume * 0.05)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2litres':
				volumeOutput = (volume * 0.005)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2tablespoons':
				volumeOutput = (volume * 0.33333)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2cups':
				volumeOutput = (volume * 0.02)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2fluid_ounces_imp':
				volumeOutput = (volume * 0.17597)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2pints_imp':
				volumeOutput = (volume * 0.00879)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2quarts_imp':
				volumeOutput = (volume * 0.00439)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2gallons_imp':
				volumeOutput = (volume * 0.00109)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2teaspoons_imp':
				volumeOutput = (volume * 0.84468)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2tablespoons_imp':
				volumeOutput = (volume * 0.28156)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2cups_imp':
				volumeOutput = (volume * 0.01759)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2fluid_ounces_us':
				volumeOutput = (volume * 0.16907)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2pints_us_liquid':
				volumeOutput = (volume * 0.01056)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2pints_us_dry':
				volumeOutput = (volume * 0.00908)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2quarts_us_liquid':
				volumeOutput = (volume * 0.00528)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2quarts_us_dry':
				volumeOutput = (volume * 0.00454)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2gallons_us_liquid':
				volumeOutput = (volume * 0.00132)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2gallons_us_dry':
				volumeOutput = (volume * 0.00113)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2teaspoons_us':
				volumeOutput = (volume * 1.01442)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2tablespoons_us':
				volumeOutput = (volume * 0.33814)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons2cups_us':
				volumeOutput = (volume * 0.02113)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2millilitres':
			case 'tablespoons2':
				volumeOutput = (volume * 15)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2centilitres':
				volumeOutput = (volume * 1.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2decilitres':
				volumeOutput = (volume * 0.15)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2litres':
				volumeOutput = (volume * 0.015)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2teaspoons':
				volumeOutput = (volume * 3)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2cups':
				volumeOutput = (volume * 0.06)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2fluid_ounces_imp':
				volumeOutput = (volume * 0.52792)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2pints_imp':
				volumeOutput = (volume * 0.02639)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2quarts_imp':
				volumeOutput = (volume * 0.01319)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2gallons_imp':
				volumeOutput = (volume * 0.00329)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2teaspoons_imp':
				volumeOutput = (volume * 2.53404)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2tablespoons_imp':
				volumeOutput = (volume * 0.84468)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2cups_imp':
				volumeOutput = (volume * 0.05279)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2fluid_ounces_us':
				volumeOutput = (volume * 0.50721)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2pints_us_liquid':
				volumeOutput = (volume * 0.0317)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2pints_us_dry':
				volumeOutput = (volume * 0.02724)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2quarts_us_liquid':
				volumeOutput = (volume * 0.01585)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2quarts_us_dry':
				volumeOutput = (volume * 0.01362)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2gallons_us_liquid':
				volumeOutput = (volume * 0.00396)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2gallons_us_dry':
				volumeOutput = (volume * 0.0034)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2teaspoons_us':
				volumeOutput = (volume * 3.04326)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2tablespoons_us':
				volumeOutput = (volume * 1.01442)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons2cups_us':
				volumeOutput = (volume * 0.0634)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2millilitres':
			case 'cups2':
				volumeOutput = (volume * 250)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2centilitres':
				volumeOutput = (volume * 25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2decilitres':
				volumeOutput = (volume * 2.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2litres':
				volumeOutput = (volume * 0.25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2teaspoons':
				volumeOutput = (volume * 50)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2tablespoons':
				volumeOutput = (volume * 16.66666)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2fluid_ounces_imp':
				volumeOutput = (volume * 8.79876)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2pints_imp':
				volumeOutput = (volume * 0.43993)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2quarts_imp':
				volumeOutput = (volume * 0.21996)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2gallons_imp':
				volumeOutput = (volume * 0.05499)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2teaspoons_imp':
				volumeOutput = (volume * 42.23409)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2tablespoons_imp':
				volumeOutput = (volume * 14.07803)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2cups_imp':
				volumeOutput = (volume * 0.87987)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2fluid_ounces_us':
				volumeOutput = (volume * 8.4535)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2pints_us_liquid':
				volumeOutput = (volume * 0.52834)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2pints_us_dry':
				volumeOutput = (volume * 0.45404)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2quarts_us_liquid':
				volumeOutput = (volume * 0.26417)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2quarts_us_dry':
				volumeOutput = (volume * 0.22702)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2gallons_us_liquid':
				volumeOutput = (volume * 0.066)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2gallons_us_dry':
				volumeOutput = (volume * 0.05675)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2teaspoons_us':
				volumeOutput = (volume * 50.72103)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2tablespoons_us':
				volumeOutput = (volume * 16.907)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups2cups_us':
				volumeOutput = (volume * 1.05668)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2millilitres':
			case 'fluid_ounces_imp2':
				volumeOutput = (volume * 28.41306)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2centilitres':
				volumeOutput = (volume * 2.8413)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2decilitres':
				volumeOutput = (volume * 0.28413)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2litres':
				volumeOutput = (volume * 0.02841)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2teaspoons':
				volumeOutput = (volume * 5.68261)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2tablespoons':
				volumeOutput = (volume * 1.8942)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2cups':
				volumeOutput = (volume * 0.11365)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2pints_imp':
				volumeOutput = (volume * 0.05)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2quarts_imp':
				volumeOutput = (volume * 0.025)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2gallons_imp':
				volumeOutput = (volume * 0.00625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2teaspoons_imp':
				volumeOutput = (volume * 4.8)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2tablespoons_imp':
				volumeOutput = (volume * 1.6)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2cups_imp':
				volumeOutput = (volume * 0.1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2fluid_ounces_us':
				volumeOutput = (volume * 0.96075)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2pints_us_liquid':
				volumeOutput = (volume * 0.06)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2pints_us_dry':
				volumeOutput = (volume * 0.0516)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2quarts_us_liquid':
				volumeOutput = (volume * 0.03)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2quarts_us_dry':
				volumeOutput = (volume * 0.0258)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2gallons_us_liquid':
				volumeOutput = (volume * 0.0075)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2gallons_us_dry':
				volumeOutput = (volume * 0.00645)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2teaspoons_us':
				volumeOutput = (volume * 5.76455)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2tablespoons_us':
				volumeOutput = (volume * 1.92151)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_imp2cups_us':
				volumeOutput = (volume * 0.12009)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2millilitres':
			case 'pints_imp2':
				volumeOutput = (volume * 568.26125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2centilitres':
				volumeOutput = (volume * 56.82612)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2decilitres':
				volumeOutput = (volume * 5.68261)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2litres':
				volumeOutput = (volume * 0.56826)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2teaspoons':
				volumeOutput = (volume * 113.65225)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2tablespoons':
				volumeOutput = (volume * 37.88408)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2cups':
				volumeOutput = (volume * 2.27304)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2fluid_ounces_imp':
				volumeOutput = (volume * 20)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2quarts_imp':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2gallons_imp':
				volumeOutput = (volume * 0.125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2teaspoons_imp':
				volumeOutput = (volume * 96)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2tablespoons_imp':
				volumeOutput = (volume * 32)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2cups_imp':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2fluid_ounces_us':
				volumeOutput = (volume * 19.21519)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2pints_us_liquid':
				volumeOutput = (volume * 1.20094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2pints_us_dry':
				volumeOutput = (volume * 1.03205)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2quarts_us_liquid':
				volumeOutput = (volume * 0.60047)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2quarts_us_dry':
				volumeOutput = (volume * 0.51602)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2gallons_us_liquid':
				volumeOutput = (volume * 0.15011)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2gallons_us_dry':
				volumeOutput = (volume * 0.129)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2teaspoons_us':
				volumeOutput = (volume * 115.29119)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2tablespoons_us':
				volumeOutput = (volume * 38.43039)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_imp2cups_us':
				volumeOutput = (volume * 2.40189)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2millilitres':
			case 'quarts_imp2':
				volumeOutput = (volume * 1136.5225)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2centilitres':
				volumeOutput = (volume * 113.65225)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2decilitres':
				volumeOutput = (volume * 11.365225)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2litres':
				volumeOutput = (volume * 1.13652)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2teaspoons':
				volumeOutput = (volume * 227.3045)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2tablespoons':
				volumeOutput = (volume * 75.76816)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2cups':
				volumeOutput = (volume * 4.54609)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2fluid_ounces_imp':
				volumeOutput = (volume * 40)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2pints_imp':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2gallons_imp':
				volumeOutput = (volume * 0.25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2teaspoons_imp':
				volumeOutput = (volume * 192)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2tablespoons_imp':
				volumeOutput = (volume * 64)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2cups_imp':
				volumeOutput = (volume * 4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2fluid_ounces_us':
				volumeOutput = (volume * 38.43039)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2pints_us_liquid':
				volumeOutput = (volume * 2.40189)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2pints_us_dry':
				volumeOutput = (volume * 2.06411)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2quarts_us_liquid':
				volumeOutput = (volume * 1.20094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2quarts_us_dry':
				volumeOutput = (volume * 1.03205)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2gallons_us_liquid':
				volumeOutput = (volume * 0.30023)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2gallons_us_dry':
				volumeOutput = (volume * 0.25801)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2teaspoons_us':
				volumeOutput = (volume * 230.58238)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2tablespoons_us':
				volumeOutput = (volume * 76.86079)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_imp2cups_us':
				volumeOutput = (volume * 4.80379)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2millilitres':
			case 'gallons_imp2':
				volumeOutput = (volume * 4546.09)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2centilitres':
				volumeOutput = (volume * 454.609)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2decilitres':
				volumeOutput = (volume * 45.4609)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2litres':
				volumeOutput = (volume * 4.54609)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2teaspoons':
				volumeOutput = (volume * 909.218)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2tablespoons':
				volumeOutput = (volume * 303.07266)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2cups':
				volumeOutput = (volume * 18.18436)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2fluid_ounces_imp':
				volumeOutput = (volume * 160)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2pints_imp':
				volumeOutput = (volume * 6144)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2quarts_imp':
				volumeOutput = (volume * 4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2teaspoons_imp':
				volumeOutput = (volume * 768)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2tablespoons_imp':
				volumeOutput = (volume * 256)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2cups_imp':
				volumeOutput = (volume * 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2fluid_ounces_us':
				volumeOutput = (volume * 153.72159)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2pints_us_liquid':
				volumeOutput = (volume * 9.60759)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2pints_us_dry':
				volumeOutput = (volume * 8.25645)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2quarts_us_liquid':
				volumeOutput = (volume * 4.80379)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2quarts_us_dry':
				volumeOutput = (volume * 4.12822)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2gallons_us_liquid':
				volumeOutput = (volume * 1.20094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2gallons_us_dry':
				volumeOutput = (volume * 1.03205)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2teaspoons_us':
				volumeOutput = (volume * 922.32954)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2tablespoons_us':
				volumeOutput = (volume * 307.44318)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_imp2cups_us':
				volumeOutput = (volume * 19.21519)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2millilitres':
			case 'teaspoons_imp2':
				volumeOutput = (volume * 5.91938)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2centilitres':
				volumeOutput = (volume * 0.59193)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2decilitres':
				volumeOutput = (volume * 0.05919)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2litres':
				volumeOutput = (volume * 0.00591)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2teaspoons':
				volumeOutput = (volume * 1.18387)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2tablespoons':
				volumeOutput = (volume * 0.39462)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2cups':
				volumeOutput = (volume * 0.023677)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2fluid_ounces_imp':
				volumeOutput = (volume * 0.20833)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2pints_imp':
				volumeOutput = (volume * 0.01041)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2quarts_imp':
				volumeOutput = (volume * 0.0052)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2gallons_imp':
				volumeOutput = (volume * 0.0013)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2tablespoons_imp':
				volumeOutput = (volume * 0.33333)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2cups_imp':
				volumeOutput = (volume * 0.02083)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2fluid_ounces_us':
				volumeOutput = (volume * 0.20015)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2pints_us_liquid':
				volumeOutput = (volume * 0.0125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2pints_us_dry':
				volumeOutput = (volume * 0.01075)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2quarts_us_liquid':
				volumeOutput = (volume * 0.00625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2quarts_us_dry':
				volumeOutput = (volume * 0.00537)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2gallons_us_liquid':
				volumeOutput = (volume * 0.00156)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2gallons_us_dry':
				volumeOutput = (volume * 0.00134)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2teaspoons_us':
				volumeOutput = (volume * 1.20094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2tablespoons_us':
				volumeOutput = (volume * 0.40031)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_imp2cups_us':
				volumeOutput = (volume * 0.02501)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2millilitres':
			case 'tablespoons_imp2':
				volumeOutput = (volume * 17.75816)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2centilitres':
				volumeOutput = (volume * 1.77581)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2decilitres':
				volumeOutput = (volume * 0.17758)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2litres':
				volumeOutput = (volume * 0.01775)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2teaspoons':
				volumeOutput = (volume * 3.55163)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2tablespoons':
				volumeOutput = (volume * 1.18387)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2cups':
				volumeOutput = (volume * 0.07103)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2fluid_ounces_imp':
				volumeOutput = (volume * 0.625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2pints_imp':
				volumeOutput = (volume * 24)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2quarts_imp':
				volumeOutput = (volume * 0.01562)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2gallons_imp':
				volumeOutput = (volume * 0.0039)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2teaspoons_imp':
				volumeOutput = (volume * 3)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2cups_imp':
				volumeOutput = (volume * 0.0625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2fluid_ounces_us':
				volumeOutput = (volume * 0.60047)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2pints_us_liquid':
				volumeOutput = (volume * 0.03752)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2pints_us_dry':
				volumeOutput = (volume * 0.03225)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2quarts_us_liquid':
				volumeOutput = (volume * 0.01876)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2quarts_us_dry':
				volumeOutput = (volume * 0.01612)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2gallons_us_liquid':
				volumeOutput = (volume * 0.00469)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2gallons_us_dry':
				volumeOutput = (volume * 0.00403)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2teaspoons_us':
				volumeOutput = (volume * 3.60285)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2tablespoons_us':
				volumeOutput = (volume * 1.20094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_imp2cups_us':
				volumeOutput = (volume * 0.07505)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2millilitres':
			case 'cups_imp2':
				volumeOutput = (volume * 284.13062)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2centilitres':
				volumeOutput = (volume * 28.41306)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2decilitres':
				volumeOutput = (volume * 2.8413)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2litres':
				volumeOutput = (volume * 0.28413)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2teaspoons':
				volumeOutput = (volume * 56.8261)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2tablespoons':
				volumeOutput = (volume * 18.94204)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2cups':
				volumeOutput = (volume * 1.13652)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2fluid_ounces_imp':
				volumeOutput = (volume * 10)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2pints_imp':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2quarts_imp':
				volumeOutput = (volume * 0.25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2gallons_imp':
				volumeOutput = (volume * 0.0625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2teaspoons_imp':
				volumeOutput = (volume * 48)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2tablespoons_imp':
				volumeOutput = (volume * 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2fluid_ounces_us':
				volumeOutput = (volume * 9.6076)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2pints_us_liquid':
				volumeOutput = (volume * 0.60047)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2pints_us_dry':
				volumeOutput = (volume * 0.51602)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2quarts_us_liquid':
				volumeOutput = (volume * 0.30023)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2quarts_us_dry':
				volumeOutput = (volume * 0.25801)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2gallons_us_liquid':
				volumeOutput = (volume * 0.07506)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2gallons_us_dry':
				volumeOutput = (volume * 0.0645)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2teaspoons_us':
				volumeOutput = (volume * 57.6456)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2tablespoons_us':
				volumeOutput = (volume * 19.2152)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_imp2cups_us':
				volumeOutput = (volume * 1.20094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2millilitres':
			case 'fluid_ounces_us2':
				volumeOutput = (volume * 29.57352)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2centilitres':
				volumeOutput = (volume * 2.95735)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2decilitres':
				volumeOutput = (volume * 0.29573)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2litres':
				volumeOutput = (volume * 0.02957)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2teaspoons':
				volumeOutput = (volume * 5.9147)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2tablespoons':
				volumeOutput = (volume * 1.97156)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2cups':
				volumeOutput = (volume * 0.1183)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2fluid_ounces_imp':
				volumeOutput = (volume * 1.04084)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2pints_imp':
				volumeOutput = (volume * 0.05204)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2quarts_imp':
				volumeOutput = (volume * 0.02602)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2gallons_imp':
				volumeOutput = (volume * 0.0065)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2teaspoons_imp':
				volumeOutput = (volume * 4.99604)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2tablespoons_imp':
				volumeOutput = (volume * 1.66534)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2cups_imp':
				volumeOutput = (volume * 0.10408)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2pints_us_liquid':
				volumeOutput = (volume * 0.0625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2pints_us_dry':
				volumeOutput = (volume * 0.05371)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2quarts_us_liquid':
				volumeOutput = (volume * 0.03125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2quarts_us_dry':
				volumeOutput = (volume * 0.02685)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2gallons_us_liquid':
				volumeOutput = (volume * 0.00781)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2gallons_us_dry':
				volumeOutput = (volume * 0.00671)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2teaspoons_us':
				volumeOutput = (volume * 6)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2tablespoons_us':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'fluid_ounces_us2cups_us':
				volumeOutput = (volume * 0.125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2millilitres':
			case 'pints_us_liquid2':
				volumeOutput = (volume * 473.17647)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2centilitres':
				volumeOutput = (volume * 47.31764)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2decilitres':
				volumeOutput = (volume * 4.73176)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2litres':
				volumeOutput = (volume * 0.47317)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2teaspoons':
				volumeOutput = (volume * 94.6353)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2tablespoons':
				volumeOutput = (volume * 31.5451)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2cups':
				volumeOutput = (volume * 1.8927)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2fluid_ounces_imp':
				volumeOutput = (volume * 16.65348)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2pints_imp':
				volumeOutput = (volume * 0.83267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2quarts_imp':
				volumeOutput = (volume * 0.41633)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2gallons_imp':
				volumeOutput = (volume * 0.10408)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2teaspoons_imp':
				volumeOutput = (volume * 79.93672)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2tablespoons_imp':
				volumeOutput = (volume * 26.64557)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2cups_imp':
				volumeOutput = (volume * 1.66534)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2fluid_ounces_us':
				volumeOutput = (volume * 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2pints_us_dry':
				volumeOutput = (volume * 0.85936)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2quarts_us_liquid':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2quarts_us_dry':
				volumeOutput = (volume * 0.42968)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2gallons_us_liquid':
				volumeOutput = (volume * 0.125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2gallons_us_dry':
				volumeOutput = (volume * 0.10742)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2teaspoons_us':
				volumeOutput = (volume * 96)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2tablespoons_us':
				volumeOutput = (volume * 32)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_liquid2cups_us':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2millilitres':
			case 'pints_us_dry2':
				volumeOutput = (volume * 550.61047)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2centilitres':
				volumeOutput = (volume * 55.06104)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2decilitres':
				volumeOutput = (volume * 5.5061)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2litres':
				volumeOutput = (volume * 0.55061)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2teaspoons':
				volumeOutput = (volume * 110.12209)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2tablespoons':
				volumeOutput = (volume * 36.70736)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2cups':
				volumeOutput = (volume * 2.20244)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2fluid_ounces_imp':
				volumeOutput = (volume * 19.37877)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2pints_imp':
				volumeOutput = (volume * 0.96893)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2quarts_imp':
				volumeOutput = (volume * 0.48446)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2gallons_imp':
				volumeOutput = (volume * 0.12111)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2teaspoons_imp':
				volumeOutput = (volume * 93.01814)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2tablespoons_imp':
				volumeOutput = (volume * 31.00604)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2cups_imp':
				volumeOutput = (volume * 1.93787)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2fluid_ounces_us':
				volumeOutput = (volume * 18.61835)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2pints_us_liquid':
				volumeOutput = (volume * 1.16364)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2quarts_us_liquid':
				volumeOutput = (volume * 0.58182)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2quarts_us_dry':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2gallons_us_liquid':
				volumeOutput = (volume * 0.145455)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2gallons_us_dry':
				volumeOutput = (volume * 0.125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2teaspoons_us':
				volumeOutput = (volume * 111.71012)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2tablespoons_us':
				volumeOutput = (volume * 37.23671)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'pints_us_dry2cups_us':
				volumeOutput = (volume * 2.32729)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2millilitres':
			case 'quarts_us_liquid2':
				volumeOutput = (volume * 946.35294)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2centilitres':
				volumeOutput = (volume * 94.63529)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2decilitres':
				volumeOutput = (volume * 9.46353)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2litres':
				volumeOutput = (volume * 0.94635)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2teaspoons':
				volumeOutput = (volume * 189.27059)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2tablespoons':
				volumeOutput = (volume * 63.0902)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2cups':
				volumeOutput = (volume * 3.78541)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2fluid_ounces_imp':
				volumeOutput = (volume * 33.30696)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2pints_imp':
				volumeOutput = (volume * 1.66534)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2quarts_imp':
				volumeOutput = (volume * 0.83267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2gallons_imp':
				volumeOutput = (volume * 0.20816)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2teaspoons_imp':
				volumeOutput = (volume * 159.87344)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2tablespoons_imp':
				volumeOutput = (volume * 53.29114)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2cups_imp':
				volumeOutput = (volume * 3.33069)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2fluid_ounces_us':
				volumeOutput = (volume * 32)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2pints_us_liquid':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2pints_us_dry':
				volumeOutput = (volume * 1.71873)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2quarts_us_dry':
				volumeOutput = (volume * 0.85936)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2gallons_us_liquid':
				volumeOutput = (volume * 0.25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2gallons_us_dry':
				volumeOutput = (volume * 0.21484)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2teaspoons_us':
				volumeOutput = (volume * 192)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2tablespoons_us':
				volumeOutput = (volume * 64)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_liquid2cups_us':
				volumeOutput = (volume * 4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2millilitres':
			case 'quarts_us_dry2':
				volumeOutput = (volume * 1101.22094)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2centilitres':
				volumeOutput = (volume * 110.12209)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2decilitres':
				volumeOutput = (volume * 11.012209)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2litres':
				volumeOutput = (volume * 1.101221)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2teaspoons':
				volumeOutput = (volume * 220.24418)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2tablespoons':
				volumeOutput = (volume * 73.41473)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2cups':
				volumeOutput = (volume * 4.40488)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2fluid_ounces_imp':
				volumeOutput = (volume * 38.75755)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2pints_imp':
				volumeOutput = (volume * 1.93787)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2quarts_imp':
				volumeOutput = (volume * 0.96893)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2gallons_imp':
				volumeOutput = (volume * 0.24223)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2teaspoons_imp':
				volumeOutput = (volume * 186.03628)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2tablespoons_imp':
				volumeOutput = (volume * 62.01209)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2cups_imp':
				volumeOutput = (volume * 3.87575)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2fluid_ounces_us':
				volumeOutput = (volume * 37.23671)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2pints_us_liquid':
				volumeOutput = (volume * 2.32729)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2pints_us_dry':
				volumeOutput = (volume * 2)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2quarts_us_liquid':
				volumeOutput = (volume * 1.16364)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2gallons_us_liquid':
				volumeOutput = (volume * 0.29091)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2gallons_us_dry':
				volumeOutput = (volume * 0.25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2teaspoons_us':
				volumeOutput = (volume * 223.42026)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2tablespoons_us':
				volumeOutput = (volume * 74.47342)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'quarts_us_dry2cups_us':
				volumeOutput = (volume * 4.65458)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2millilitres':
			case 'gallons_us_liquid2':
				volumeOutput = (volume * 3785.41178)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2centilitres':
				volumeOutput = (volume * 378.54117)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2decilitres':
				volumeOutput = (volume * 37.85411)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2litres':
				volumeOutput = (volume * 3.78541)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2teaspoons':
				volumeOutput = (volume * 757.08235)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2tablespoons':
				volumeOutput = (volume * 252.36078)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2cups':
				volumeOutput = (volume * 15.14164)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2fluid_ounces_imp':
				volumeOutput = (volume * 133.22786)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2pints_imp':
				volumeOutput = (volume * 6.66139)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2quarts_imp':
				volumeOutput = (volume * 3.33069)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2gallons_imp':
				volumeOutput = (volume * 0.83267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2teaspoons_imp':
				volumeOutput = (volume * 639.49377)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2tablespoons_imp':
				volumeOutput = (volume * 213.1646)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2cups_imp':
				volumeOutput = (volume * 13.32278)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2fluid_ounces_us':
				volumeOutput = (volume * 128)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2pints_us_liquid':
				volumeOutput = (volume * 8)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2pints_us_dry':
				volumeOutput = (volume * 6.87493)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2quarts_us_liquid':
				volumeOutput = (volume * 4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2quarts_us_dry':
				volumeOutput = (volume * 3.43746)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2gallons_us_dry':
				volumeOutput = (volume * 0.85936)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2teaspoons_us':
				volumeOutput = (volume * 768)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2tablespoons_us':
				volumeOutput = (volume * 256)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_liquid2cups_us':
				volumeOutput = (volume * 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2millilitres':
			case 'gallons_us_dry2':
				volumeOutput = (volume * 4404.88377)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2centilitres':
				volumeOutput = (volume * 440.48837)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2decilitres':
				volumeOutput = (volume * 44.04883)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2litres':
				volumeOutput = (volume * 4.40488)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2teaspoons':
				volumeOutput = (volume * 880.97675)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2tablespoons':
				volumeOutput = (volume * 293.65891)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2cups':
				volumeOutput = (volume * 17.61953)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2fluid_ounces_imp':
				volumeOutput = (volume * 155.03023)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2pints_imp':
				volumeOutput = (volume * 7.75151)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2quarts_imp':
				volumeOutput = (volume * 3.87575)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2gallons_imp':
				volumeOutput = (volume * 0.96893)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2teaspoons_imp':
				volumeOutput = (volume * 744.14513)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2tablespoons_imp':
				volumeOutput = (volume * 248.04837)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2cups_imp':
				volumeOutput = (volume * 15.50302)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2fluid_ounces_us':
				volumeOutput = (volume * 148.94683)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2pints_us_liquid':
				volumeOutput = (volume * 9.30917)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2pints_us_dry':
				volumeOutput = (volume * 8)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2quarts_us_liquid':
				volumeOutput = (volume * 4.65458)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2quarts_us_dry':
				volumeOutput = (volume * 4)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2gallons_us_liquid':
				volumeOutput = (volume * 1.16364)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2teaspoons_us':
				volumeOutput = (volume * 893.68103)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2tablespoons_us':
				volumeOutput = (volume * 297.89367)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'gallons_us_dry2cups_us':
				volumeOutput = (volume * 18.61835)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2millilitres':
			case 'teaspoons_us2':
				volumeOutput = (volume * 4.92892)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2centilitres':
				volumeOutput = (volume * 0.49289)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2decilitres':
				volumeOutput = (volume * 0.04928)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2litres':
				volumeOutput = (volume * 0.00492)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2teaspoons':
				volumeOutput = (volume * 0.98578)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2tablespoons':
				volumeOutput = (volume * 0.32859)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2cups':
				volumeOutput = (volume * 0.01971)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2fluid_ounces_imp':
				volumeOutput = (volume * 0.17347)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2pints_imp':
				volumeOutput = (volume * 0.00867)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2quarts_imp':
				volumeOutput = (volume * 0.00433)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2gallons_imp':
				volumeOutput = (volume * 0.00108)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2teaspoons_imp':
				volumeOutput = (volume * 0.83267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2tablespoons_imp':
				volumeOutput = (volume * 0.27755)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2cups_imp':
				volumeOutput = (volume * 0.01734)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2fluid_ounces_us':
				volumeOutput = (volume * 0.16666)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2pints_us_liquid':
				volumeOutput = (volume * 0.01041)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2pints_us_dry':
				volumeOutput = (volume * 0.00895)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2quarts_us_liquid':
				volumeOutput = (volume * 0.00521)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2quarts_us_dry':
				volumeOutput = (volume * 0.00447)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2gallons_us_liquid':
				volumeOutput = (volume * 0.0013)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2gallons_us_dry':
				volumeOutput = (volume * 0.00111)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2tablespoons_us':
				volumeOutput = (volume * 0.33333)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'teaspoons_us2cups_us':
				volumeOutput = (volume * 0.02083)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2millilitres':
			case 'tablespoons_us2':
				volumeOutput = (volume * 14.78676)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2centilitres':
				volumeOutput = (volume * 1.47867)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2decilitres':
				volumeOutput = (volume * 0.14786)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2litres':
				volumeOutput = (volume * 0.01478)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2teaspoons':
				volumeOutput = (volume * 2.95735)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2tablespoons':
				volumeOutput = (volume * 0.98578)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2cups':
				volumeOutput = (volume * 0.05914)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2fluid_ounces_imp':
				volumeOutput = (volume * 0.52042)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2pints_imp':
				volumeOutput = (volume * 0.026021)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2quarts_imp':
				volumeOutput = (volume * 0.01301)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2gallons_imp':
				volumeOutput = (volume * 0.00325)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2teaspoons_imp':
				volumeOutput = (volume * 2.49802)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2tablespoons_imp':
				volumeOutput = (volume * 0.83267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2cups_imp':
				volumeOutput = (volume * 0.05204)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2fluid_ounces_us':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2pints_us_liquid':
				volumeOutput = (volume * 0.03125)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2pints_us_dry':
				volumeOutput = (volume * 0.02685)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2quarts_us_liquid':
				volumeOutput = (volume * 0.01562)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2quarts_us_dry':
				volumeOutput = (volume * 0.01342)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2gallons_us_liquid':
				volumeOutput = (volume * 0.0039)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2gallons_us_dry':
				volumeOutput = (volume * 0.00335)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2teaspoons_us':
				volumeOutput = (volume * 3)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'tablespoons_us2cups_us':
				volumeOutput = (volume * 0.0625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2millilitres':
			case 'cups_us2':
				volumeOutput = (volume * 236.58823)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2centilitres':
				volumeOutput = (volume * 23.65882)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2decilitres':
				volumeOutput = (volume * 2.36588)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2litres':
				volumeOutput = (volume * 0.23658)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2teaspoons':
				volumeOutput = (volume * 47.31764)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2tablespoons':
				volumeOutput = (volume * 15.77254)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2cups':
				volumeOutput = (volume * 0.94635)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2fluid_ounces_imp':
				volumeOutput = (volume * 8.32674)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2pints_imp':
				volumeOutput = (volume * 0.41633)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2quarts_imp':
				volumeOutput = (volume * 0.20816)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2gallons_imp':
				volumeOutput = (volume * 0.05204)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2teaspoons_imp':
				volumeOutput = (volume * 39.96836)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2tablespoons_imp':
				volumeOutput = (volume * 13.32278)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2cups_imp':
				volumeOutput = (volume * 0.83267)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2fluid_ounces_us':
				volumeOutput = (volume * 8)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2pints_us_liquid':
				volumeOutput = (volume * 0.5)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2pints_us_dry':
				volumeOutput = (volume * 0.42968)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2quarts_us_liquid':
				volumeOutput = (volume * 0.25)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2quarts_us_dry':
				volumeOutput = (volume * 0.21484)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2gallons_us_liquid':
				volumeOutput = (volume * 0.0625)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2gallons_us_dry':
				volumeOutput = (volume * 0.05371)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2teaspoons_us':
				volumeOutput = (volume * 48)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			case 'cups_us2tablespoons_us':
				volumeOutput = (volume * 16)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
				break;
			default:
				volumeOutput = (volume * 1)
					.toFixed(3)
					.replace(
						/^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/,
						'$1$2$3'
					);
		}

		this.setState({
			volumeOutput: volumeOutput,
		});
	};

	closeUnitConverter = () => {
		this.setState({
			massValue: '',
			fromMassMeasure: '',
			toMassMeasure: '',
			temperatureValue: '',
			fromTemperatureMeasure: '',
			toTemperatureMeasure: '',
			volumeValue: '',
			fromVolumeMeasure: '',
			toVolumeMeasure: '',
			massOutput: '',
			temperatureOutput: '',
			volumeOutput: '',
		});
		const unitConverter = document.querySelector(
			'.comp_unit-converter-modal'
		);
		unitConverter.classList.toggle('visible');
	};

	toggleMassVisibility = () => {
		const mass = document.querySelector('.calc-mass');
		const massLabel = document.querySelector('.mass .label');
		const temperature = document.querySelector('.calc-temperature');
		const temperatureLabel = document.querySelector('.temperature .label');
		const volume = document.querySelector('.calc-volume');
		const volumeLabel = document.querySelector('.volume .label');
		mass.classList.add('visible');
		massLabel.classList.add('visible');
		temperature.classList.remove('visible');
		temperatureLabel.classList.remove('visible');
		volume.classList.remove('visible');
		volumeLabel.classList.remove('visible');
	};

	toggleTemperatureVisibility = () => {
		const mass = document.querySelector('.calc-mass');
		const massLabel = document.querySelector('.mass .label');
		const temperature = document.querySelector('.calc-temperature');
		const temperatureLabel = document.querySelector('.temperature .label');
		const volume = document.querySelector('.calc-volume');
		const volumeLabel = document.querySelector('.volume .label');
		mass.classList.remove('visible');
		massLabel.classList.remove('visible');
		temperature.classList.add('visible');
		temperatureLabel.classList.add('visible');
		volume.classList.remove('visible');
		volumeLabel.classList.remove('visible');
	};

	toggleVolumeVisibility = () => {
		const mass = document.querySelector('.calc-mass');
		const massLabel = document.querySelector('.mass .label');
		const temperature = document.querySelector('.calc-temperature');
		const temperatureLabel = document.querySelector('.temperature .label');
		const volume = document.querySelector('.calc-volume');
		const volumeLabel = document.querySelector('.volume .label');
		mass.classList.remove('visible');
		massLabel.classList.remove('visible');
		temperature.classList.remove('visible');
		temperatureLabel.classList.remove('visible');
		volume.classList.add('visible');
		volumeLabel.classList.add('visible');
	};

	render() {
		const { t, show } = this.props;
		const mass = [
			{
				index: '01',
				unit: 'g',
				name: 'grams',
				label: 'grams',
			},
			{
				index: '02',
				unit: 'kg',
				name: 'kilograms',
				label: 'kilograms',
			},
			{
				index: '03',
				unit: 'oz',
				name: 'ounces',
				label: 'ounces',
			},
			{
				index: '04',
				unit: 'lb',
				name: 'pounds',
				label: 'pounds',
			},
		];

		const temperature = [
			{
				index: '01',
				unit: '°C',
				name: 'celcius',
				label: 'celcius',
			},
			{
				index: '02',
				unit: '°F',
				name: 'fahrenheit',
				label: 'fahrenheit',
			},
		];

		const volume = [
			{
				index: '01',
				unit: 'ml',
				name: 'millilitres',
				label: 'millilitres',
			},
			{
				index: '02',
				unit: 'cl',
				name: 'centilitres',
				label: 'centilitres',
			},
			{
				index: '03',
				unit: 'dl',
				name: 'decilitres',
				label: 'decilitres',
			},
			{
				index: '04',
				unit: 'l',
				name: 'litres',
				label: 'litres',
			},
			{
				index: '05',
				unit: 'tsp',
				name: 'teaspoons',
				label: 'teaspoons (metric)',
			},
			{
				index: '06',
				unit: 'tbsp',
				name: 'tablespoons',
				label: 'tablespoons (metric)',
			},
			{
				index: '07',
				unit: 'C',
				name: 'cups',
				label: 'cups (metric)',
			},
			{
				index: '08',
				unit: 'fl oz',
				name: 'fluid_ounces_imp',
				label: 'fluid ounces (imperial)',
			},
			{
				index: '09',
				unit: 'pt',
				name: 'pints_imp',
				label: 'pints (imperial)',
			},
			{
				index: '10',
				unit: 'qt',
				name: 'quarts_imp',
				label: 'quarts (imperial)',
			},
			{
				index: '11',
				unit: 'gal',
				name: 'gallons_imp',
				label: 'gallons (imperial)',
			},
			{
				index: '12',
				unit: 'tsp',
				name: 'teaspoons_imp',
				label: 'teaspoons (imperial)',
			},
			{
				index: '13',
				unit: 'tbsp',
				name: 'tablespoons_imp',
				label: 'tablespoons (imperial)',
			},
			{
				index: '14',
				unit: 'C',
				name: 'cups_imp',
				label: 'cups (imperial)',
			},
			{
				index: '15',
				unit: 'US fl oz',
				name: 'fluid_ounces_us',
				label: 'fluid ounces (US)',
			},
			{
				index: '16',
				unit: 'US pt',
				name: 'pints_us_liquid',
				label: 'pints - liquid (US)',
			},
			{
				index: '17',
				unit: 'US pt',
				name: 'pints_us_dry',
				label: 'pints - dry (US)',
			},
			{
				index: '18',
				unit: 'US qt',
				name: 'quarts_us_liquid',
				label: 'quarts - liquid (US)',
			},
			{
				index: '19',
				unit: 'US qt',
				name: 'quarts_us_dry',
				label: 'quarts - dry (US)',
			},
			{
				index: '20',
				unit: 'US gal',
				name: 'gallons_us_liquid',
				label: 'gallons - liquid (US)',
			},
			{
				index: '21',
				unit: 'US gal',
				name: 'gallons_us_dry',
				label: 'gallons - dry (US)',
			},
			{
				index: '22',
				unit: 'US tsp',
				name: 'teaspoons_us',
				label: 'teaspoons (US)',
			},
			{
				index: '23',
				unit: 'US tbsp',
				name: 'tablespoons_us',
				label: 'tablespoons (US)',
			},
			{
				index: '24',
				unit: 'US C',
				name: 'cups_us',
				label: 'cups (US)',
			},
		];

		let modalClassName = 'comp_unit-converter-modal';
		if (show) {
			modalClassName += ' visible';
		}

		const { massValue, temperatureValue, volumeValue } = this.state;

		return (
			<div className={modalClassName}>
				<div className="unit-converter-inner">
					<div className="header">
						<span onClick={this.closeUnitConverter}>
							<SvgIcon name="cancel" />
						</span>
					</div>
					<div className="body">
						<div className="buttons">
							<span
								className="mass"
								onClick={this.toggleMassVisibility}
							>
								<SvgIcon name="mass" />
								<span className="label visible">
									{t('weight')}
								</span>
							</span>
							<span
								className="temperature"
								onClick={this.toggleTemperatureVisibility}
							>
								<SvgIcon name="temperature" />
								<span className="label">
									{t('temperature')}
								</span>
							</span>
							<span
								className="volume"
								onClick={this.toggleVolumeVisibility}
							>
								<SvgIcon name="volume" />
								<span className="label">{t('volume')}</span>
							</span>
						</div>
						<div className="calcs">
							<div className="calc-mass visible">
								<div className="left">
									<input
										name="massInput"
										type="number"
										min="0"
										step="0.01"
										value={massValue}
										onChange={this.massHandleChange}
										onInput={
											(this.value =
												!!this.value &&
												Math.abs(this.value) >= 0
													? Math.abs(this.value)
													: null)
										}
									/>
									<span>
										<select
											onChange={
												this.fromMassMeasureHandleChange
											}
										>
											{mass.map((option) => (
												<option
													key={option.index}
													value={option.name}
												>
													{t(option.label)} - {option.unit}
												</option>
											))}
										</select>
									</span>
								</div>
								<div className="middle">=</div>
								<div className="right">
									<input
										className="massConverted"
										type="text"
										value={this.state.massOutput}
										disabled
									/>
									<span>
										<select
											onChange={
												this.toMassMeasureHandleChange
											}
										>
											{mass.map((option) => (
												<option
													key={option.index}
													value={option.name}
												>
													{t(option.label)} - {option.unit}
												</option>
											))}
										</select>
									</span>
								</div>
							</div>
							<div className="calc-temperature">
								<div className="left">
									<input
										name="temperatureInput"
										type="number"
										step="0.01"
										value={temperatureValue}
										onChange={this.temperatureHandleChange}
									/>
									<span>
										<select
											onChange={
												this
													.fromTemperatureMeasureHandleChange
											}
										>
											{temperature.map((option) => (
												<option
													key={option.index}
													value={option.name}
												>
													{t(option.label)} - {option.unit}
												</option>
											))}
										</select>
									</span>
								</div>
								<div className="middle">=</div>
								<div className="right">
									<input
										className="temperatureConverted"
										type="text"
										value={this.state.temperatureOutput}
										disabled
									/>
									<span>
										<select
											onChange={
												this
													.toTemperatureMeasureHandleChange
											}
										>
											{temperature.map((option) => (
												<option
													key={option.index}
													value={option.name}
												>
													{t(option.label)} - {option.unit}
												</option>
											))}
										</select>
									</span>
								</div>
							</div>
							<div className="calc-volume">
								<div className="left">
									<input
										name="volumeInput"
										type="number"
										step="0.01"
										value={volumeValue}
										onChange={this.volumeHandleChange}
									/>
									<span>
										<select
											onChange={
												this
													.fromVolumeMeasureHandleChange
											}
										>
											{volume.map((option) => (
												<option
													key={option.index}
													value={option.name}
												>
													{t(option.label)} - {option.unit}
												</option>
											))}
										</select>
									</span>
								</div>
								<div className="middle">=</div>
								<div className="right">
									<input
										className="volumeConverted"
										type="text"
										value={this.state.volumeOutput}
										disabled
									/>
									<span>
										<select
											onChange={
												this.toVolumeMeasureHandleChange
											}
										>
											{volume.map((option) => (
												<option
													key={option.index}
													value={option.name}
												>
													{t(option.label)} - {option.unit}
												</option>
											))}
										</select>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

UnitConverterNotExtended.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
};

const UnitConverter = hoistStatics(
	withTranslation()(UnitConverterNotExtended),
	UnitConverterNotExtended
);

export default connect(null)(UnitConverter);
