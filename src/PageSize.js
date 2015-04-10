'use strict';

var React = require('react');

class PageSize {

  constructor() {
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.textContent);
  }

  render() {
    var self = this;
    var {options, value} = this.props;
    var isActive = (size) => size === value ? "active" : "";
    var mappedOpts =
      options.map(
        (size) =>
          <li role="presentation" className={isActive(size)}>
            <a className="ns-page-size-option" href="#" onClick={self.onChange}>{size}</a>
          </li>
      );

    return (
      <div className="ns-inline ns-page-size-width">
        <div className="ns-page-size-text pull-left">
          <span className="ns-pipe-separator">|</span>
          <span className="ns-spacer-horizontal"></span>
          <span className="ns-label">Show:</span>
        </div>
        <ul className="nav nav-pills pull-left">
        {mappedOpts}
        </ul>
      </div>
    );
  }

}

module.exports = PageSize;
