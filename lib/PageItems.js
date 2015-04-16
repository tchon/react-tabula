'use strict';

var React = require('react');
var numeral = require('numeral');

function prettyInt(num) {
  return numeral(num).format('0,0');
}

function PageItems(){}

  Object.defineProperty(PageItems.prototype,"render",{writable:true,configurable:true,value:function() {
    var $__0=    this.props,dataSize=$__0.dataSize,startIndex=$__0.startIndex,endIndex=$__0.endIndex;
    var start = dataSize ? startIndex + 1 : 0;

    if (!dataSize) {
      return null;
    }

    return (
      React.createElement("div", {className: "ns-inline-block pull-left ns-page-items"}, 
        "Items ", prettyInt(start), " – ", prettyInt(endIndex), " of ", prettyInt(dataSize), 
        React.createElement("span", {className: "ns-spacer-horizontal"})
      )
    );
  }});



module.exports = PageItems;
