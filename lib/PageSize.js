'use strict';

var React = require('react');



  function PageSize() {
    this.onChange = this.onChange.bind(this);
  }

  Object.defineProperty(PageSize.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
    this.props.onChange(e.target.textContent);
  }});

  Object.defineProperty(PageSize.prototype,"render",{writable:true,configurable:true,value:function() {
    var self = this;
    var $__0=    this.props,options=$__0.options,value=$__0.value,dataSize=$__0.dataSize;

    if (!dataSize) {
      return null;
    }

    var isActive = function(size)  {return size === value ? "active" : "";};
    var mappedOpts =
      options.map(
        function(size) 
          {return React.createElement("li", {role: "presentation", key: size, className: isActive(size)}, 
            React.createElement("a", {className: "ns-page-size-option", href: "#", onClick: self.onChange}, size)
          );}
      );

    return (
      React.createElement("div", {className: "ns-inline ns-page-size-width"}, 
        React.createElement("div", {className: "ns-page-size-text pull-left"}, 
          React.createElement("span", {className: "ns-pipe-separator"}, "|"), 
          React.createElement("span", {className: "ns-spacer-horizontal"}), 
          React.createElement("span", {className: "ns-label"}, "Show:")
        ), 
        React.createElement("ul", {className: "nav nav-pills pull-left"}, 
        mappedOpts
        )
      )
    );
  }});



module.exports = PageSize;
