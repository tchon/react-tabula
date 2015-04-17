'use strict';

var React = require('react');

function ExportButton(){}

  Object.defineProperty(ExportButton.prototype,"render",{writable:true,configurable:true,value:function() {
    if (!this.props.enabled) {
      return null;
    }

    return (
      React.createElement("div", {className: "btn-group"}, 
        React.createElement("button", {type: "button", className: "btn btn-default"}, "Export")
      )
    );
  }});



module.exports = ExportButton;
