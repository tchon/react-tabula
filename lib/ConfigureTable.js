'use strict';

var React = require('react');


  function ConfigureTable() {
    this.onChangeQuickConfig = this.onChangeQuickConfig.bind(this);
  }

  Object.defineProperty(ConfigureTable.prototype,"onChangeQuickConfig",{writable:true,configurable:true,value:function(e) {
    e.preventDefault();
    var title = e.target.textContent;
    this.props.onChangeQuickConfig(title);
  }});

  Object.defineProperty(ConfigureTable.prototype,"render",{writable:true,configurable:true,value:function() {
    var $__0=     this.props,columns=$__0.columns,columnsPossible=$__0.columnsPossible,configGroup=$__0.configGroup,configPrimary=$__0.configPrimary;

    var isActive = function(title)  {
      return title === configPrimary ? 'active' : '';
    };

    var possible = columnsPossible && columnsPossible.length ?
      columnsPossible : columns;
    var shortCutColumns = possible.map(function(col)  {
      return col.group === configGroup ? col : null;
    }).filter(function(col)  { return col; });

    var shortCutConfigs = shortCutColumns.map(function(col)  {
      return (
        React.createElement("li", {className: col.title === configPrimary ? 'active':'', onClick: this.onChangeQuickConfig}, 
          React.createElement("a", {href: "#"}, col.title)
        )
      );
    }.bind(this));

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
        React.createElement("div", {className: "modal fade", id: "configure-table-modal", tabIndex: "-1", role: "dialog", "aria-labelledby": "Configure Table", "aria-hidden": "true"}, 
          React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
                React.createElement("h4", {className: "modal-title", id: "configure-table-modal-title"}, "Configure")
              ), 
              React.createElement("div", {className: "modal-body"}, 
                "NOTE: Configure Table Tree Optoins Go Here."
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
