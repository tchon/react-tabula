'use strict';

var React = require('react');

class PageItems {

  render() {
    var self = this;
    var {id, dataLength, startIndex, endIndex} = this.props;
    var start = startIndex + 1;

    return (
      <div className="ns-inline-block pull-left ns-page-items">
        Items {start} &ndash; {endIndex} of {dataLength}
        <span className="ns-spacer-horizontal"></span>
      </div>
    );
  }

}

module.exports = PageItems;
