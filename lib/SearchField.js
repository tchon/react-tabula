'use strict';

var React = require('react');



  function SearchField() {
    this.onChange = this.onChange.bind(this);
  }

  Object.defineProperty(SearchField.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
    this.props.onChange(e.target.value);
  }});

  Object.defineProperty(SearchField.prototype,"render",{writable:true,configurable:true,value:function() {
    return (
      React.createElement("form", {role: "form", className: this.props.className}, 
        React.createElement("div", {className: "form-group has-feedback"}, 
          React.createElement("input", {
            id: this.props.id, 
            className: "form-control", 
            describedby: "sizing-addon2", 
            type: "text", 
            value: this.props.value, 
            placeholder: this.props.placeholder, 
            onChange: this.onChange}
          ), 
          React.createElement("i", {className: "form-control-feedback glyphicon glyphicon-search"})
        )
      )
    );
  }});



module.exports = SearchField;
