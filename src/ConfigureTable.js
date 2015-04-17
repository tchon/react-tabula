'use strict';

var React = require('react');

class ConfigureTable {
  constructor() {
    this.onChangeQuickConfig = this.onChangeQuickConfig.bind(this);
  }

  onChangeQuickConfig(e) {
    e.preventDefault();
    var title = e.target.textContent;
    this.props.onChangeQuickConfig(title);
  }

  render() {
    if (!this.props.enabled) {
      return null;
    }

    var {columns, columnsPossible, configGroup, configPrimary} = this.props;

    var isActive = (title) => {
      return title === configPrimary ? 'active' : '';
    };

    var possible = columnsPossible && columnsPossible.length ?
      columnsPossible : columns;
    var shortCutColumns = possible.map((col) => {
      return col.group === configGroup ? col : null;
    }).filter((col) => { return col; });

    var shortCutConfigs = shortCutColumns.map((col) => {
      return (
        <li className={col.title === configPrimary ? 'active':''} onClick={this.onChangeQuickConfig}>
          <a href="#">{col.title}</a>
        </li>
      );
    });

    return (
      <div className="configure-table-wrapper">
        <div className="btn-group">
          <button type="button" className="btn btn-default" data-toggle="modal" data-target="#configure-table-modal">Configure</button>

          <button type="button" className="btn btn-default dropdown-toggle"
            data-toggle="dropdown" aria-expanded="false">
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu" role="menu">
            {shortCutConfigs}
            <li className="divider"></li>
            <li data-toggle="modal" data-target="#configure-table-modal"><a href="#">Configure</a></li>
          </ul>
        </div>
        <div className="modal fade" id="configure-table-modal" tabIndex="-1" role="dialog" aria-labelledby="Configure Table" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="configure-table-modal-title">Configure</h4>
              </div>
              <div className="modal-body">
                NOTE: Configure Table Tree Optoins Go Here.
              </div>
              <div className="modal-footer">
                <button className="btn btn-default" type="button" data-dismiss="modal">Cancel</button>
                <button className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = ConfigureTable;
