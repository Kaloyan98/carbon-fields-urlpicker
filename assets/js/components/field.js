/**
 * The external dependencies.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, setStatic } from 'recompose';

/**
 * The internal dependencies.
 */
import { Component } from '@wordpress/element'

import {
	maybeLoadTinyMcerPicker,
	openTinyMceLinkEditor,
} from './LinkPicker.js';

import '../../scss/field.scss';

class UrlPickerField extends Component {
	resetFieldValues = (event) => {
		const { id, onChange } = this.props;

		onChange(id, {
			url: '',
			anchor: '',
			blank: false,
		});
	}

	openURLModal = (event) => {
		let target = event.currentTarget;

		const { id, field, onChange } = this.props;

		maybeLoadTinyMcerPicker()
			.then(() => {
				return openTinyMceLinkEditor(target, field);
			})
			.then((data) => {
				onChange(id, { ...data });
			});
		return false;
	}

	render() {
		const { id, name, field, value } = this.props;

		let fieldData = {
			url: '',
			anchor: '',
			blank: false
		};

		// merge the objects
		if (value.url) {
			fieldData = {...value};
		}

		return(
			<div id={ id }>
			{fieldData.url.length > 0 ? (
				<span
					className="carbon-fields--urlpicker"
					data-is-blank={fieldData.blank ? 1 : 0}>
					<span onClick={this.openURLModal}>
						<strong>{fieldData.url.replace(`${carbonFieldsUrlPickerData.home_url}`, '')}</strong>
						<br />
						<small><em>{fieldData.anchor}</em></small>
					</span>

					<span
						className="carbon-fields--urlpicker__remove"
						onClick={this.resetFieldValues}
						title={carbonFieldsUrlPickerData.remove_link}>
						&times;
					</span>
				</span>
			) : (
				<span className="button button-secondary" onClick={this.openURLModal}>
					{carbonFieldsUrlPickerData.select_link}
				</span>
			)}

			<input
				name={`${name}[url]`}
				value={fieldData.url}
				type="hidden"
				readOnly
			/>

			<input
				name={`${name}[anchor]`}
				value={fieldData.anchor}
				type="hidden"
				readOnly
			/>

			<input
				name={`${name}[blank]`}
				value={fieldData.blank}
				type="hidden"
				readOnly
			/>
		</div>
		);
	}
}

UrlPickerField.propTypes = {
	name: PropTypes.string,
	field: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.shape({
			url: PropTypes.string,
			anchor: PropTypes.string,
			blank: PropTypes.boolean,
		}),
	})
};

export default UrlPickerField;
