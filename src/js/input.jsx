/** @jsx React.DOM */

var React = require('react/addons');
var Classable = require('./mixins/classable.js');

var Input = React.createClass({

  propTypes: {
    multiline: React.PropTypes.bool,
    required: React.PropTypes.bool,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    inputStyle: React.PropTypes.string,
    error: React.PropTypes.string,
    description: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      value: this.props.defaultValue,
      error: false,
      errorText: ""
    };
  },

  getDefaultProps: function() {
    return {
      multiline: false,
      required: true,
      rows: 1
    };
  },

  setError: function(error) {
    this.props.error = error;
    this.setState({ error: true, errorText: error });
  },

  removeError: function() {
    this.props.error = null;
    this.setState({ error: false, errorText: "" });
  },

  render: function() {
    var classes = this.getClasses('mui-input', {
      'mui-floating': this.props.inputStyle === 'floating',
      'mui-text': this.props.type === 'text',
      'mui-error': this.state.error === true
    }),
        inputClasses = {'mui-has-value': !!this.state.value},
        textAreaClasses = {'mui-has-value': !!this.state.value, 'mui-input-textarea': true},
        inputElement = this.props.multiline ?
        this.props.valueLink ?
            <textarea {...this.props} className="mui-input-textarea" placeholder="" className={React.addons.classSet(textAreaClasses)}
                rows={this.state.rows} /> :
            <textarea {...this.props} value={this.state.value} className={React.addons.classSet(textAreaClasses)}
                placeholder="" rows={this.props.rows} onChange={this._onTextAreaChange} /> :
          this.props.valueLink ?
                <input {...this.props} ref="input" placeholder=""  className={React.addons.classSet(textAreaClasses)} /> :
                <input {...this.props} ref="input" value={this.state.value} placeholder="" className={React.addons.classSet(inputClasses)}
                    onChange={this._onInputChange} />;

    return (
      <div ref={this.props.ref} className={classes}>
        {inputElement}
        <span className="mui-input-placeholder"
        	onClick={this._onPlaceholderClick}>{this.props.placeholder}</span>
        <span className="mui-input-highlight"></span>
        <span className="mui-input-bar"></span>
        <span className="mui-input-description">{this.props.description}</span>
        <span className="mui-input-error">{this.state.errorText}</span>
      </div>
    );
  },

  getValue: function() {
    return this.state.value;
  },

  setValue: function(txt) {
    this.setState({value: txt});
  },

  clearValue: function() {
    this.setValue("");
  },

  _onInputChange: function(e) {
    var value = e.target.value;
    this.setState({value: value});
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _onPlaceholderClick: function(e) {
    this.refs.input.getDOMNode().focus();
  },

  _onTextAreaChange: function(e) {
    this._onInputChange(e);
  },

});

module.exports = Input;
