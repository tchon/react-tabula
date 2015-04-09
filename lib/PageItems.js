'use strict';

var React = require('react');

function PageItems(){}

  Object.defineProperty(PageItems.prototype,"render",{writable:true,configurable:true,value:function() {
    var self = this;
    var $__0=     this.props,id=$__0.id,dataLength=$__0.dataLength,startIndex=$__0.startIndex,endIndex=$__0.endIndex;
    var start = startIndex + 1;

    return (
      React.createElement("div", {className: "ns-inline-block pull-left ns-page-items"}, 
        "Items ", start, " – ", endIndex, " of ", dataLength, 
        React.createElement("span", {className: "ns-spacer-horizontal"})
      )
    );
  }});



module.exports = PageItems;