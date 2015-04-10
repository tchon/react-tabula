'use strict';

var React = require('react');
var numeral = require('numeral');

function prettyInt(num) {
  return numeral(num).format('0,0');
}

class PageItems {

  render() {
    var {dataSize, startIndex, endIndex} = this.props;
    var start = startIndex + 1;

    return (
      <div className="ns-inline-block pull-left ns-page-items">
        Items {prettyInt(start)} &ndash; {prettyInt(endIndex)} of {prettyInt(dataSize)}
        <span className="ns-spacer-horizontal"></span>
      </div>
    );
  }

}

module.exports = PageItems;
