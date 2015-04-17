'use strict';

var React = require('react');

class ExportButton {

  render() {
    if (!this.props.enabled) {
      return null;
    }

    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default">Export</button>
      </div>
    );
  }

}

module.exports = ExportButton;
