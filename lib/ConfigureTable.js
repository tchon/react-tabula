'use strict';

var React = require('react');
var _ = require('lodash');


  function ConfigureTable() {
    //this.onChangeConfig = this.onChangeConfig.bind(this);
    this.onChangeQuickConfig = this.onChangeQuickConfig.bind(this);
  }

  Object.defineProperty(ConfigureTable.prototype,"onChangeQuickConfig",{writable:true,configurable:true,value:function(e) {
    e.preventDefault();
    var title = e.target.textContent;
    this.props.onChangeQuickConfig(title);
  }});

  Object.defineProperty(ConfigureTable.prototype,"render",{writable:true,configurable:true,value:function() {
    if (!this.props.enabled) {
      return null;
    }

    var $__0=      this.props,columns=$__0.columns,columnsPossible=$__0.columnsPossible,configGroup=$__0.configGroup,configPrimary=$__0.configPrimary,config=$__0.config;

    if (_.isEmpty(config) || _.isEmpty(config.children)) {
      return null;
    }

    var isActive = function(title)  {
      return title === configPrimary ? 'active' : '';
    };

    var isActivePane = function(title)  {
      return title === configPrimary ? 'tab-pane active' : 'tab-pane';
    };

    var toKey = function(key)  { return key.toLowerCase().replace(' ', '_'); };
    var toId = function(key)  { return "#" + toKey(key); };
    var isChecked = function(obj)  { return obj.selected ? "checked" : ""; };

    var possible = columnsPossible && columnsPossible.length ?
      columnsPossible : columns;

    // TODO move shortCutConfigs to separate component class
    var shortCutColumns = possible.map(function(col)  {
      return col.group === configGroup ? col : null;
    }).filter(function(col)  { return col; });

    var shortCutConfigs = shortCutColumns.map(function(col)  {
      return (
        React.createElement("li", {className: isActive(col.title), onClick: this.onChangeQuickConfig}, 
          React.createElement("a", {href: "#"}, col.title)
        )
      );
    }.bind(this));

    var tabHeaders = config.children.map(function(conf)  {
      return (
        React.createElement("li", {className: isActive(conf.title)}, 
          React.createElement("a", {href: toId(conf.title), "data-toggle": "tab"}, conf.title)
        )
      );
    });

    var tabPanes = config.children.map(function(conf)  {

      var sectChildren = [];
      conf.children.map(function(sect)  {
        var leaves = sect.children.filter(function(o)  { return o; }).map(function(leaf)  {
          return (
            React.createElement("div", {className: "checkbox"}, 
              React.createElement("label", null, 
                React.createElement("input", {type: "checkbox"}), leaf.title
              )
            )
          );
        });
        sectChildren.push(leaves);
      });

      var i = 0;
      var sections = conf.children.map(function(sect)  {
        return (
          React.createElement("div", {className: "panel panel-default ns-panel-default"}, 
            React.createElement("div", {className: "panel panel-heading ns-panel-heading"}, sect.title), 
            React.createElement("div", {className: "panel panel-body ns-panel-body"}, 
              sectChildren[i++]
            )
          )
        )
      });

      return (
        React.createElement("div", {className: isActivePane(conf.title), id: toKey(conf.title)}, 
          sections
        )
      );

    });

    return (
      React.createElement("div", {className: "configure-table-wrapper"}, 
        React.createElement("div", {className: "btn-group"}, 
          React.createElement("button", {type: "button", className: "btn btn-default", "data-toggle": "modal", "data-target": "#configure-table-modal"}, "Configure"), 

          React.createElement("button", {type: "button", className: "btn btn-default dropdown-toggle", 
            "data-toggle": "dropdown", "aria-expanded": "false"}, 
            React.createElement("span", {className: "caret"}), 
            React.createElement("span", {className: "sr-only"}, "Toggle Dropdown")
          ), 
          React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
            shortCutConfigs, 
            React.createElement("li", {className: "divider"}), 
            React.createElement("li", {"data-toggle": "modal", "data-target": "#configure-table-modal"}, React.createElement("a", {href: "#"}, "Configure"))
          )
        ), 

        React.createElement("div", {className: "modal fade", id: "configure-table-modal", tabIndex: "-1", role: "dialog", "aria-labelledby": this.props.configHeader, "aria-hidden": "true"}, 
          React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 

              React.createElement("div", {className: "modal-header"}, 
                React.createElement("h4", {className: "modal-title", id: "configure-table-modal-title"}, this.props.configHeader)
              ), 

              React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-xs-3"}, 
                    React.createElement("ul", {className: "nav nav-tabs tabs-left"}, 
                      tabHeaders
                    )
                  ), 

                  React.createElement("div", {className: "col-xs-9"}, 
                    React.createElement("div", {className: "tab-content"}, 
                      tabPanes
                    )
                  )

                )

              ), 

              React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {className: "btn btn-default", type: "button", "data-dismiss": "modal"}, "Cancel"), 
                React.createElement("button", {className: "btn btn-primary"}, "Save changes")
              )

            )
          )
        )
      )
    );
  }});



module.exports = ConfigureTable;
