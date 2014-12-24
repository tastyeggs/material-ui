var React = require('react');
var Classable = require('./mixins/classable');
var DialogWindow = require('./dialog-window.jsx');
var FlatButton = require('./flat-button.jsx');
var IconButton = require('./icon-button.jsx');

var Dialog = React.createClass({

  mixins: [Classable],

  propTypes: {
    title: React.PropTypes.string,
    actions: React.PropTypes.array,
    showCloseButton: React.PropTypes.bool,
    isHeader: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      actions: []
    };
  },

  render: function() {
    var {
      className,
      title,
      actions,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-dialog');
    var actions = this._getDialogActions();

    var closeButton = this.props.showCloseButton? (
      <IconButton icon="content-clear" onClick={this.dismiss} />
    ) : null;

    var header = true;
    if(typeof this.props.isHeader !== 'undefined'){
      header = this.props.isHeader;
    }

    var isHeader = header? (
      <h3 className="mui-dialog-title">{this.props.title}{closeButton}</h3>
    ) : null;

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}>

        {isHeader}
        <div ref="dialogContent" className="mui-dialog-content">
          {this.props.children}
        </div>

      </DialogWindow>
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  _getDialogActions: function() {
    return this.props.actions.map(function(a, index) {
      var onClickHandler = a.onClick ? a.onClick : this.dismiss;
      return (
        <FlatButton
          key={index}
          secondary={true}
          onClick={onClickHandler}
          label={a.text} />
      );
    }.bind(this));
  }

});

module.exports = Dialog;
