'use strict';

var React = require('react');
var _ = require('lodash');

class ConfigureTable {
  constructor() {
    //this.onChangeConfig = this.onChangeConfig.bind(this);
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

    var {columns, columnsPossible, configGroup, configPrimary, config} = this.props;

    if (_.isEmpty(config) || _.isEmpty(config.children)) {
      return null;
    }

    var isActive = (title) => {
      return title === configPrimary ? 'active' : '';
    };

    var isActivePane = (title) => {
      return title === configPrimary ? 'tab-pane active' : 'tab-pane';
    };

    var toKey = (key) => { return key.toLowerCase().replace(' ', '_'); };
    var toId = (key) => { return "#" + toKey(key); };
    var isChecked = (obj) => { return obj.selected ? "checked" : ""; };

    var possible = columnsPossible && columnsPossible.length ?
      columnsPossible : columns;

    // TODO move shortCutConfigs to separate component class
    var shortCutColumns = possible.map((col) => {
      return col.group === configGroup ? col : null;
    }).filter((col) => { return col; });

    var shortCutConfigs = shortCutColumns.map((col) => {
      return (
        <li className={isActive(col.title)} onClick={this.onChangeQuickConfig}>
          <a href="#">{col.title}</a>
        </li>
      );
    });

    var tabHeaders = config.children.map((conf) => {
      return (
        <li className={isActive(conf.title)}>
          <a href={toId(conf.title)} data-toggle="tab">{conf.title}</a>
        </li>
      );
    });

    var tabPanes = config.children.map((conf) => {

      var sectChildren = [];
      conf.children.map((sect) => {
        var leaves = sect.children.filter((o) => { return o; }).map((leaf) => {
          return (
            <div className="checkbox">
              <label>
                <input type="checkbox" />{leaf.title}
              </label>
            </div>
          );
        });
        sectChildren.push(leaves);
      });

      var i = 0;
      var sections = conf.children.map((sect) => {
        return (
          <div className="panel panel-default ns-panel-default">
            <div className="panel panel-heading ns-panel-heading">{sect.title}</div>
            <div className="panel panel-body ns-panel-body">
              {sectChildren[i++]}
            </div>
          </div>
        )
      });

      return (
        <div className={isActivePane(conf.title)} id={toKey(conf.title)}>
          {sections}
        </div>
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

        <div className="modal fade" id="configure-table-modal" tabIndex="-1" role="dialog" aria-labelledby={this.props.configHeader} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title" id="configure-table-modal-title">{this.props.configHeader}</h4>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-3">
                    <ul className="nav nav-tabs tabs-left">
                      <li>
                        <h5 className="ns-primary-header">{config.title}</h5>
                       </li>
                      {tabHeaders}
                    </ul>
                  </div>

                  <div className="col-xs-9">
                    <div className="tab-content">
                      {tabPanes}
                    </div>
                  </div>

                </div>

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
