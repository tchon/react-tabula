'use strict';

var React = require('react');
var _ = require('lodash');

class ConfigureTable {
  constructor() {
    this.onChangeQuickConfig = this.onChangeQuickConfig.bind(this);
    this.handleChangeLeaf = this.handleChangeLeaf.bind(this);
  }

  onChangeQuickConfig(e) {
    e.preventDefault();
    var title = e.target.textContent;
    this.props.onChangeQuickConfig(title);
  }

  handleChangeLeaf(e) {
    var current = e.currentTarget;
    var parent = current.dataset.parent;
    var section = current.dataset.section;
    var leaf = current.dataset.leaf;

    this.props.onChangeConfigLeaf(current, parent, section, leaf);
    return e;
  }

  render() {
    if (!this.props.enabled) {
      return null;
    }

    var {columns, columnsPossible, configGroup, config} = this.props;
    var configPrimary = this.props.configPrimary;

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
    var isDisabled = (obj) => { return obj.disabled ? "disabled" : ""; };

    var makeRef = (conf, sect, leaf) => { return [conf.prop, sect.prop, leaf.prop].join(':'); }

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

    var onClickPrimary = this.props.onClickPrimary;
    var tabHeaders = config.children.map((conf) => {
      return (
        <li className={isActive(conf.title)}>
          <a href={toId(conf.title)}
            onClick={onClickPrimary}
            data-toggle="tab">{conf.title}</a>
        </li>
      );
    });

    var handleChangeLeaf = this.handleChangeLeaf;
    var tabPanes = config.children.map((conf) => {

      var sectChildren = [];
      conf.children.map((sect) => {
        if (!sect.selected) { return; }

        var leaves = sect.children.filter((o) => { return o; }).map((leaf) => {
          return (
            <div className="checkbox"><label><input type="checkbox"
              defaultChecked={isChecked(leaf)}
              disabled={isDisabled(leaf)}
              onChange={handleChangeLeaf}
              data-parent={conf.prop}
              data-section={sect.prop}
              data-leaf={leaf.prop}
            />{leaf.title}</label></div>
          );
        });
        sectChildren.push(leaves);
      }).filter((o) => { return o; });

      var counter = 0;
      var sections = conf.children.map((sect) => {
        if (!sect.selected) { return; }

        return (
          <div className="panel panel-default ns-panel-default">
            <div className="panel panel-heading ns-panel-heading">{sect.title}</div>
            <div className="panel panel-body ns-panel-body">
              {sectChildren[counter++]}
            </div>
          </div>
        )
      }).filter((o) => { return o; });

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

        <div className="modal fade"
          id="configure-table-modal"
          tabIndex="-1" role="dialog"
          onClick={this.props.onConfigCancel}
          aria-labelledby={this.props.configHeader}
          aria-hidden="true">
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
                <div className="alert alert-danger" role="alert" hidden></div>
                <button className="btn btn-default" type="button" data-dismiss="modal" onClick={this.props.onConfigCancel}>Cancel</button>
                <button className="btn btn-primary" onClick={this.props.onConfigSave}>Save changes</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = ConfigureTable;
