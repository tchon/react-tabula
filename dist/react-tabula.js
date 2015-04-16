(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabula"] = factory(require("react"));
	else
		root["ReactTabula"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	exports.ConfigureTable = __webpack_require__(1);
	exports.DataMixin = __webpack_require__(2);
	exports.DataTable = __webpack_require__(3);
	exports.PageItems = __webpack_require__(4);
	exports.PageSize = __webpack_require__(5);
	exports.Pagination = __webpack_require__(6);
	exports.SearchField = __webpack_require__(7);
	exports.Table = __webpack_require__(8);
	exports.utils = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);

	function ConfigureTable(){}

	  Object.defineProperty(ConfigureTable.prototype,"render",{writable:true,configurable:true,value:function() {
	    var $__0=    this.props,columns=$__0.columns,columnsPossible=$__0.columnsPossible,configGroup=$__0.configGroup;
	    var primaryTitle = columns.length ? columns[0].title : '';

	    var isActive = function(title)  {
	      return title === primaryTitle ? 'active' : '';
	    };

	    var possible = columnsPossible && columnsPossible.length ?
	      columnsPossible : columns;
	    var shortCutColumns = possible.map(function(col)  {
	      return col.group === configGroup ? col : null;
	    }).filter(function(col)  { return col; });

	    var shortCutConfigs = shortCutColumns.map(function(col)  {
	      return (React.createElement("li", {className: isActive(col.title)}, React.createElement("a", {href: "#"}, col.title)));
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
	        React.createElement("div", {className: "modal fade", id: "configure-table-modal", tabindex: "-1", role: "dialog", "aria-labelledby": "Configure Table", "aria-hidden": "true"}, 
	          React.createElement("div", {className: "modal-dialog"}, 
	            React.createElement("div", {className: "modal-content"}, 
	              React.createElement("div", {className: "modal-header"}, 
	                React.createElement("button", {className: "close", type: "button", "data-dismiss": "modal", 
	                  "aria-label": "Close"}, 
	                  React.createElement("span", {"aria-hidden": "true"}, "×")
	                ), 
	                React.createElement("h4", {className: "modal-title", id: "configure-table-modal-title"}, "Configure Table")
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $__0=     __webpack_require__(9),sort=$__0.sort,filter=$__0.filter;

	var containsIgnoreCase = function(a, b) {
	  a = (a + '').toLowerCase().trim();
	  b = (b + '').toLowerCase().trim();
	  return b.indexOf(a) >= 0;
	};

	module.exports = {

	  getInitialState:function() {
	    return {
	      // Clone the initialData.
	      data: this.props.initialData.slice(0),
	      sortBy: this.props.initialSortBy,
	      filterValues: {},
	      currentPage: 0,
	      pageSize: this.props.initialPageSize
	    };
	  },

	  getDefaultProps:function() {
	    return {
	      columns: [],
	      columnsPossible: [],
	      configGroup: '',
	      initialPageSize: 5,
	      keys: [],
	      pageSizeMax: 20,
	      pageSizeOptions: [ 5, 10, 20 ],
	      filters: {
	        globalSearch: {
	          filter: containsIgnoreCase
	        }
	      }
	    };
	  },

	  componentWillMount:function() {
	    // Do the initial sorting if specified.
	    var $__0=   this.state,sortBy=$__0.sortBy,data=$__0.data;
	    if (sortBy) {
	      this.setState({ data: sort(sortBy, data) });
	    }
	  },

	  onSort:function(sortBy) {
	    this.setState({
	      sortBy: sortBy,
	      data: sort(sortBy, this.state.data)
	    });
	  },

	  onFilter:function(filterName, filterValue) {
	    var $__0=   this.state,filterValues=$__0.filterValues,sortBy=$__0.sortBy;
	    var $__1=   this.props,initialData=$__1.initialData,filters=$__1.filters;

	    filterValues[filterName] = filterValue;
	    var newData = filter(filters, filterValues, initialData);
	    newData = sort(sortBy, newData);

	    this.setState({
	      data: newData,
	      filterValues: filterValues,
	      currentPage: 0
	    });
	  },

	  // Pagination
	  buildPage:function() {
	    var $__0=    this.state,data=$__0.data,currentPage=$__0.currentPage,pageSize=$__0.pageSize;
	    var start = pageSize * currentPage;
	    var end = start + pageSize;
	    var endIndex = data.length > end ? end : data.length;

	    return {
	      data: data.slice(start, end),
	      dataSize: data.length,
	      currentPage: currentPage,
	      startIndex: start,
	      endIndex: endIndex,
	      totalPages: Math.ceil(data.length / pageSize)
	    };
	  },

	  onChangePage:function(pageNumber) {
	    var pageSize = this.state.pageSize;
	    var start = pageSize * pageNumber;
	    var end = start + pageSize;

	    this.setState({
	      currentPage: pageNumber,
	      startIndex: start,
	      endIndex: end
	    });
	  },

	  onPageSizeChange:function(value) {
	    var newPageSize = +value;
	    var $__0=   this.state,currentPage=$__0.currentPage,pageSize=$__0.pageSize;
	    var newPage = Math.floor((currentPage * pageSize) / newPageSize);

	    var start = newPageSize * currentPage;
	    var end = start + newPageSize;

	    this.setState({
	      pageSize: newPageSize,
	      currentPage: newPage,
	      startIndex: start,
	      endIndex: end
	    });
	  }

	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);

	var ConfigureTable = __webpack_require__(1);
	var PageItems = __webpack_require__(4);
	var PageSize = __webpack_require__(5);
	var Pagination = __webpack_require__(6);
	var SearchField = __webpack_require__(7);
	var Table = __webpack_require__(8);

	var DataMixin = __webpack_require__(2);

	var DataTable = React.createClass({displayName: "DataTable",

	  mixins: [ DataMixin ],

	  render:function() {
	    var page = this.buildPage();

	    return (
	      React.createElement("div", {className: this.props.className}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-xs-8"}, 

	            React.createElement("div", {className: "btn-toolbar", role: "toolbar", "aria-label": "..."}, 
	              React.createElement(ConfigureTable, {
	                columns: this.props.columns, 
	                columnsPossible: this.props.columnsPossible, 
	                configGroup: this.props.configGroup}
	              ), 

	              React.createElement("div", {className: "btn-group"}, 
	                React.createElement("button", {type: "button", className: "btn btn-default"}, "Export")
	              )
	            )

	          ), 
	          React.createElement("div", {className: "col-xs-4 pull-right"}, 
	            React.createElement(SearchField, {
	              id: "search-field", 
	              className: "input-group pull-right", 
	              placeholder: "Search Table", 
	              value: this.state.filterValues.globalSearch, 
	              onChange: this.onFilter.bind(this, 'globalSearch')}
	            )
	          )
	        ), 
	        React.createElement("div", {className: "row ns-spacer-vertical"}), 
	        React.createElement(Table, {
	          className: "table table-bordered", 
	          dataArray: page.data, 
	          columns: this.props.columns, 
	          keys: this.props.keys, 
	          sortBy: this.state.sortBy, 
	          onSort: this.onSort}
	        ), 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-xs-7"}, 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "col-xs-12 ns-page-items-size"}, 
	                React.createElement(PageItems, {
	                  id: "page-items", 
	                  className: "page-items pull-left", 
	                  dataSize: page.dataSize, 
	                  startIndex: page.startIndex, 
	                  endIndex: page.endIndex}
	                ), 
	                React.createElement(PageSize, {
	                  id: "page-size", 
	                  className: "page-size pull-left", 
	                  label: "Show:", 
	                  value: this.state.pageSize, 
	                  max: this.props.pageSizeMax, 
	                  options: this.props.pageSizeOptions, 
	                  onChange: this.onPageSizeChange}
	                )
	              )
	              )
	            ), 


	          React.createElement("div", {className: "col-xs-5"}, 
	            React.createElement(Pagination, {
	              className: "pagination pagination-sm pull-right ns-pagination-top", 
	              currentPage: page.currentPage, 
	              totalPages: page.totalPages, 
	              onChangePage: this.onChangePage}
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = DataTable;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);
	var numeral = __webpack_require__(11);

	function prettyInt(num) {
	  return numeral(num).format('0,0');
	}

	function PageItems(){}

	  Object.defineProperty(PageItems.prototype,"render",{writable:true,configurable:true,value:function() {
	    var $__0=    this.props,dataSize=$__0.dataSize,startIndex=$__0.startIndex,endIndex=$__0.endIndex;
	    var start = dataSize ? startIndex + 1 : 0;

	    return (
	      React.createElement("div", {className: "ns-inline-block pull-left ns-page-items"}, 
	        "Items ", prettyInt(start), " – ", prettyInt(endIndex), " of ", prettyInt(dataSize), 
	        React.createElement("span", {className: "ns-spacer-horizontal"})
	      )
	    );
	  }});



	module.exports = PageItems;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);



	  function PageSize() {
	    this.onChange = this.onChange.bind(this);
	  }

	  Object.defineProperty(PageSize.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
	    this.props.onChange(e.target.textContent);
	  }});

	  Object.defineProperty(PageSize.prototype,"render",{writable:true,configurable:true,value:function() {
	    var self = this;
	    var $__0=   this.props,options=$__0.options,value=$__0.value;
	    var isActive = function(size)  {return size === value ? "active" : "";};
	    var mappedOpts =
	      options.map(
	        function(size) 
	          {return React.createElement("li", {role: "presentation", key: size, className: isActive(size)}, 
	            React.createElement("a", {className: "ns-page-size-option", href: "#", onClick: self.onChange}, size)
	          );}
	      );

	    return (
	      React.createElement("div", {className: "ns-inline ns-page-size-width"}, 
	        React.createElement("div", {className: "ns-page-size-text pull-left"}, 
	          React.createElement("span", {className: "ns-pipe-separator"}, "|"), 
	          React.createElement("span", {className: "ns-spacer-horizontal"}), 
	          React.createElement("span", {className: "ns-label"}, "Show:")
	        ), 
	        React.createElement("ul", {className: "nav nav-pills pull-left"}, 
	        mappedOpts
	        )
	      )
	    );
	  }});



	module.exports = PageSize;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);
	var $__0=    React,PropTypes=$__0.PropTypes;

	// Used to cancel events.
	var preventDefault = function(e)  {return e.preventDefault();};

	function Pagination(){}

	  Object.defineProperty(Pagination.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps) {
	    var props = this.props;

	    return props.totalPages !== nextProps.totalPages ||
	      props.currentPage !== nextProps.currentPage ||
	      props.showPages !== nextProps.showPages;
	  }});

	  Object.defineProperty(Pagination.prototype,"onChangePage",{writable:true,configurable:true,value:function(pageNumber, event) {
	    event.preventDefault();
	    this.props.onChangePage(pageNumber);
	  }});

	  Object.defineProperty(Pagination.prototype,"render",{writable:true,configurable:true,value:function() {
	    var $__0=      this.props,totalPages=$__0.totalPages,showPages=$__0.showPages,currentPage=$__0.currentPage;

	    if (totalPages === 0) {
	      return null;
	    }

	    var diff = Math.floor(showPages / 2),
	        start = Math.max(currentPage - diff, 0),
	        end = Math.min(start + showPages, totalPages);

	    if (totalPages >= showPages && end >= totalPages) {
	      start = totalPages - showPages;
	    }

	    var buttons = [], btnEvent, isCurrent;
	    for (var i = start; i < end; i++) {
	      isCurrent = currentPage === i;
	      // If the button is for the current page then disable the event.
	      if (isCurrent) {
	        btnEvent = preventDefault;
	      } else {
	        btnEvent = this.onChangePage.bind(this, i);
	      }
	      buttons.push(
	        React.createElement("li", {key: i, className: isCurrent ? 'active' : null}, 
	          React.createElement("a", {role: "button", href: "#", onClick: btnEvent, tabIndex: "0"}, 
	            React.createElement("span", null, i + 1), 
	            isCurrent ?
	              React.createElement("span", {className: "sr-only"}, "(current)") : null
	          )
	        )
	      );
	    }

	    // First and Prev button handlers and class.
	    var firstHandler = preventDefault;
	    var prevHandler = preventDefault;
	    var isNotFirst = currentPage > 0;
	    if (isNotFirst) {
	      firstHandler = this.onChangePage.bind(this, 0);
	      prevHandler = this.onChangePage.bind(this, currentPage - 1);
	    }

	    // Next and Last button handlers and class.
	    var nextHandler = preventDefault;
	    var lastHandler = preventDefault;
	    var isNotLast = currentPage < totalPages - 1;
	    if (isNotLast) {
	      nextHandler = this.onChangePage.bind(this, currentPage + 1);
	      lastHandler = this.onChangePage.bind(this, totalPages - 1);
	    }

	    return (
	      React.createElement("ul", {className: this.props.className, "aria-label": "Pagination"}, 
	        React.createElement("li", {className: !isNotFirst ? 'disabled' : null}, 
	          React.createElement("a", {role: "button", href: "#", tabIndex: "0", 
	            onClick: prevHandler, 
	            "aria-disabled": !isNotFirst, 
	            "aria-label": "Previous"}, 
	            React.createElement("span", {className: "fa fa-angle-left", "aria-hidden": "true"})
	          )
	        ), 

	        buttons, 

	        React.createElement("li", {className: !isNotLast ? 'disabled' : null}, 
	          React.createElement("a", {role: "button", href: "#", tabIndex: "0", 
	            onClick: nextHandler, 
	            "aria-disabled": !isNotLast, 
	            "aria-label": "Next"}, 
	            React.createElement("span", {className: "fa fa-angle-right", "aria-hidden": "true"})
	          )
	        )
	      )
	    );
	  }});


	Pagination.propTypes = {
	  onChangePage: PropTypes.func.isRequired,
	  totalPages: PropTypes.number.isRequired,
	  currentPage: PropTypes.number.isRequired,
	  showPages: PropTypes.number
	};

	Pagination.defaultProps = {
	  showPages: 5
	};


	module.exports = Pagination;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);



	  function SearchField() {
	    this.onChange = this.onChange.bind(this);
	  }

	  Object.defineProperty(SearchField.prototype,"onChange",{writable:true,configurable:true,value:function(e) {
	    this.props.onChange(e.target.value);
	  }});

	  Object.defineProperty(SearchField.prototype,"render",{writable:true,configurable:true,value:function() {
	    return (
	      React.createElement("form", {role: "form", className: this.props.className}, 
	        React.createElement("div", {className: "form-group has-feedback"}, 
	          React.createElement("input", {
	            id: this.props.id, 
	            className: "form-control", 
	            describedby: "sizing-addon2", 
	            type: "text", 
	            value: this.props.value, 
	            placeholder: this.props.placeholder, 
	            onChange: this.onChange}
	          ), 
	          React.createElement("i", {className: "form-control-feedback glyphicon glyphicon-search"})
	        )
	      )
	    );
	  }});



	module.exports = SearchField;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(10);
	var $__0=    React,PropTypes=$__0.PropTypes;

	var simpleGet = function(key)  {return function(data)  {return data[key];};};
	var keyGetter = function(keys)  {return function(data)  {return keys.map(function(key)  {return data[key];});};};

	var isEmpty = function(value)  {return value === undefined || value === null || value === '';};

	var getCellValue =
	  function($__0    , row) 
	           
	    {var prop=$__0.prop,defaultContent=$__0.defaultContent,render=$__0.render;return !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
	      // Use the render function for the value.
	      render ? render(row[prop], row) :
	      // Otherwise just return the value.
	      row[prop];};

	var getCellClass =
	  function($__0   , row) 
	    {var prop=$__0.prop,className=$__0.className;return !isEmpty(prop) && isEmpty(row[prop]) ? 'empty-cell' :
	      typeof className === 'function' ? className(row[prop], row) :
	      className;};

	function buildSortProps(col, sortBy, onSort) {
	  var order = sortBy.prop === col.prop ? sortBy.order : 'none';
	  var nextOrder = order === 'ascending' ? 'descending' : 'ascending';
	  var sortEvent = onSort.bind(null, { prop: col.prop, order: nextOrder });

	  return {
	    'onClick': sortEvent,
	    // Fire the sort event on enter.
	    'onKeyDown': function(e)  { if (e.keyCode === 13) sortEvent(); },
	    // Prevents selection with mouse.
	    'onMouseDown': function(e)  {return e.preventDefault();},
	    'tabIndex': 0,
	    'aria-sort': order,
	    'aria-label': (col.title + ": activate to sort column " + nextOrder)
	  };
	}



	  function Table() {
	    this.$Table_headers = [];
	  }

	  Object.defineProperty(Table.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	    // If no width was specified, then set the width that the browser applied
	    // initially to avoid recalculating width between pages.
	    this.$Table_headers.forEach(function(header)  {
	      var thDom = React.findDOMNode(header);
	      if (!thDom.style.width) {
	        thDom.style.width = (thDom.offsetWidth + "px");
	      }
	    });
	  }});

	  Object.defineProperty(Table.prototype,"render",{writable:true,configurable:true,value:function() {
	    var $__0=        this.props,columns=$__0.columns,keys=$__0.keys,buildRowOptions=$__0.buildRowOptions,sortBy=$__0.sortBy,onSort=$__0.onSort;

	    var headers = columns.map(function(col, idx)  {
	      var sortProps, order;
	      // Only add sorting events if the column has a property and is sortable.
	      if (typeof onSort === 'function' &&
	          col.sortable !== false &&
	          'prop' in col) {
	        sortProps = buildSortProps(col, sortBy, onSort);
	        order = sortProps['aria-sort'];
	      }

	      return (
	        React.createElement("th", React.__spread({
	          ref: function(c)  {return this.$Table_headers[idx] = c;}.bind(this), 
	          key: idx, 
	          style: {width: col.width}, 
	          role: "columnheader", 
	          scope: "col"}, 
	          sortProps), 
	          React.createElement("span", null, col.title), 
	          typeof order !== 'undefined' ?
	            React.createElement("span", {className: ("sort-icon sort-" + order), "aria-hidden": "true"}) :
	            null
	        )
	      );
	    }.bind(this));

	    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
	    var rows = this.props.dataArray.map(
	      function(row) 
	        {return React.createElement("tr", React.__spread({key: getKeys(row)},  buildRowOptions(row)), 
	          columns.map(
	            function(col, i) 
	              {return React.createElement("td", {key: i, className: getCellClass(col, row)}, 
	                getCellValue(col, row)
	              );}
	          )
	        );});

	    return (
	      React.createElement("table", {className: this.props.className}, 
	        React.createElement("caption", {className: "sr-only", role: "alert", "aria-live": "polite"}, 
	          ("Sorted by " + sortBy.prop + ": " + sortBy.order + " order")
	        ), 
	        React.createElement("thead", null, 
	          React.createElement("tr", null, 
	            headers
	          )
	        ), 
	        React.createElement("tbody", null, 
	          rows.length > 0 ? rows :
	            React.createElement("tr", null, 
	              React.createElement("td", {colSpan: columns.length, className: "text-center"}, "No data")
	            )
	        )
	      )
	    );
	  }});



	Table.propTypes = {

	  keys: PropTypes.oneOfType([
	    PropTypes.arrayOf(PropTypes.string),
	    PropTypes.string
	  ]).isRequired,

	  columns: PropTypes.arrayOf(PropTypes.shape({
	    title: PropTypes.string.isRequired,
	    prop: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.number
	    ]),
	    render: PropTypes.func,
	    sortable: PropTypes.bool,
	    defaultContent: PropTypes.string,
	    width: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.number
	    ]),
	    className: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.func
	    ])
	  })).isRequired,

	  dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
	    PropTypes.array,
	    PropTypes.object
	  ])).isRequired,

	  buildRowOptions: PropTypes.func,

	  sortBy: PropTypes.shape({
	    prop: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.number
	    ]),
	    order: PropTypes.oneOf([ 'ascending', 'descending' ])
	  }),

	  onSort: PropTypes.func
	};

	Table.defaultProps = {
	  buildRowOptions: function()  {return {};},
	  sortBy: {}
	};

	module.exports = Table;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Determines if at least one element in the object matches a truth test.
	 *
	 * @param {function(val, key)} pred Predicate function.
	 * @param {object|array} obj
	 * @return {boolean}
	 */
	function some(pred, obj) {
	  for (var key in obj) {
	    if (pred(obj[key], key) === true) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Creates a compare function with a property to sort on.
	 *
	 * @param {string} prop Property to sort.
	 * @return {function(object, object)} Compare function.
	 */
	var sortByFunc =
	    function(prop) 
	        {return function(a, b)  {return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;};};

	/**
	 * @param {object} sortBy Object containing `prop` and `order`.
	 * @param {array} data Array to sort.
	 * @return {array} Sorted array.
	 */
	function sort(sortBy, data) {
	  var sortedData = data.sort(sortByFunc(sortBy.prop));
	  if (sortBy.order === 'descending') {
	    sortedData.reverse();
	  }
	  return sortedData;
	}

	/**
	 * @param {!object} filters
	 * @param {!array} data
	 * @return {function(*, string)} Function to be executed for each entry in data.
	 */
	function filterPass(filters, data) {
	  return function(filterValue, key) {
	    var filterDef = filters[key];
	    var partial = filterDef.filter.bind(null, filterValue);
	    if (!filterDef.prop) {
	      // Filter is for all properties
	      return some(function(each)  {return partial(each);}, data);
	    } else {
	      // Filter is for one property
	      return partial(data[filterDef.prop]);
	    }
	  };
	}

	/**
	 * Example of filter and filterValues.
	 * filters = { globalSearch: { filter: containsIgnoreCase } }
	 * filterValues = { globalSearch: 'filter value' }
	 *
	 * @param {object} filters Definition of the filters.
	 * @param {object} filterValues Values of the filters.
	 * @param {array} data Array to filter.
	 * @return {array} Filtered array.
	 */
	function filter(filters, filterValues, data) {
	  var filterFunc = filterPass.bind(null, filters);
	  return data.filter(function(each)  {return some(filterFunc(each), filterValues);});
	}

	module.exports = { filter:filter, filterPass:filterPass, sort:sort, sortByFunc:sortByFunc, some:some };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numeral.js
	 * version : 1.5.3
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */

	(function () {

	    /************************************
	        Constants
	    ************************************/

	    var numeral,
	        VERSION = '1.5.3',
	        // internal storage for language config files
	        languages = {},
	        currentLanguage = 'en',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module.exports);


	    /************************************
	        Constructors
	    ************************************/


	    // Numeral prototype object
	    function Numeral (number) {
	        this._value = number;
	    }

	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     */
	    function toFixed (value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	            
	        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
	        // Multiply up by precision, round accurately, then divide and use native toFixed():
	        output = (roundingFunction(value * power) / power).toFixed(precision);

	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }

	        return output;
	    }

	    /************************************
	        Formatting
	    ************************************/

	    // determine what type of formatting we need to do
	    function formatNumeral (n, format, roundingFunction) {
	        var output;

	        // figure out what kind of format we are dealing with
	        if (format.indexOf('$') > -1) { // currency!!!!!
	            output = formatCurrency(n, format, roundingFunction);
	        } else if (format.indexOf('%') > -1) { // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (format.indexOf(':') > -1) { // time
	            output = formatTime(n, format);
	        } else { // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }

	        // return string
	        return output;
	    }

	    // revert to number
	    function unformatNumeral (n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;

	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (languages[currentLanguage].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
	                }

	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= suffixes.length; power++) {
	                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

	                    if (bytesMultiplier) {
	                        break;
	                    }
	                }

	                // do some math to create our number
	                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

	                // round if we are talking about bytes
	                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
	            }
	        }
	        return n._value;
	    }

	    function formatCurrency (n, format, roundingFunction) {
	        var symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            spliceIndex,
	            output;

	        // check for space before or after currency
	        if (format.indexOf(' $') > -1) {
	            space = ' ';
	            format = format.replace(' $', '');
	        } else if (format.indexOf('$ ') > -1) {
	            space = ' ';
	            format = format.replace('$ ', '');
	        } else {
	            format = format.replace('$', '');
	        }

	        // format the number
	        output = formatNumber(n._value, format, roundingFunction);

	        // position the symbol
	        if (symbolIndex <= 1) {
	            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                output = output.split('');
	                spliceIndex = 1;
	                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
	                    // the symbol appears before the "(" or "-"
	                    spliceIndex = 0;
	                }
	                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
	                output = output.join('');
	            } else {
	                output = languages[currentLanguage].currency.symbol + space + output;
	            }
	        } else {
	            if (output.indexOf(')') > -1) {
	                output = output.split('');
	                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
	                output = output.join('');
	            } else {
	                output = output + space + languages[currentLanguage].currency.symbol;
	            }
	        }

	        return output;
	    }

	    function formatPercentage (n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;

	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }

	        output = formatNumber(value, format, roundingFunction);
	        
	        if (output.indexOf(')') > -1 ) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }

	        return output;
	    }

	    function formatTime (n) {
	        var hours = Math.floor(n._value/60/60),
	            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
	            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
	        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
	    }

	    function unformatTime (string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }

	    function formatNumber (value, format, roundingFunction) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            abbrK = false, // force abbreviation to thousands
	            abbrM = false, // force abbreviation to millions
	            abbrB = false, // force abbreviation to billions
	            abbrT = false, // force abbreviation to trillions
	            abbrForce = false, // force abbreviation
	            bytes = '',
	            ord = '',
	            abs = Math.abs(value),
	            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            w,
	            precision,
	            thousands,
	            d = '',
	            neg = false;

	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        } else {
	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (format.indexOf('(') > -1) {
	                negP = true;
	                format = format.slice(1, -1);
	            } else if (format.indexOf('+') > -1) {
	                signed = true;
	                format = format.replace(/\+/g, '');
	            }

	            // see if abbreviation is wanted
	            if (format.indexOf('a') > -1) {
	                // check if abbreviation is specified
	                abbrK = format.indexOf('aK') >= 0;
	                abbrM = format.indexOf('aM') >= 0;
	                abbrB = format.indexOf('aB') >= 0;
	                abbrT = format.indexOf('aT') >= 0;
	                abbrForce = abbrK || abbrM || abbrB || abbrT;

	                // check for space before abbreviation
	                if (format.indexOf(' a') > -1) {
	                    abbr = ' ';
	                    format = format.replace(' a', '');
	                } else {
	                    format = format.replace('a', '');
	                }

	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + languages[currentLanguage].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }

	            // see if we are formatting bytes
	            if (format.indexOf('b') > -1) {
	                // check for space before
	                if (format.indexOf(' b') > -1) {
	                    bytes = ' ';
	                    format = format.replace(' b', '');
	                } else {
	                    format = format.replace('b', '');
	                }

	                for (power = 0; power <= suffixes.length; power++) {
	                    min = Math.pow(1024, power);
	                    max = Math.pow(1024, power+1);

	                    if (value >= min && value < max) {
	                        bytes = bytes + suffixes[power];
	                        if (min > 0) {
	                            value = value / min;
	                        }
	                        break;
	                    }
	                }
	            }

	            // see if ordinal is wanted
	            if (format.indexOf('o') > -1) {
	                // check for space before
	                if (format.indexOf(' o') > -1) {
	                    ord = ' ';
	                    format = format.replace(' o', '');
	                } else {
	                    format = format.replace('o', '');
	                }

	                ord = ord + languages[currentLanguage].ordinal(value);
	            }

	            if (format.indexOf('[.]') > -1) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }

	            w = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');

	            if (precision) {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }

	                w = d.split('.')[0];

	                if (d.split('.')[1].length) {
	                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
	                } else {
	                    d = '';
	                }

	                if (optDec && Number(d.slice(1)) === 0) {
	                    d = '';
	                }
	            } else {
	                w = toFixed(value, null, roundingFunction);
	            }

	            // format number
	            if (w.indexOf('-') > -1) {
	                w = w.slice(1);
	                neg = true;
	            }

	            if (thousands > -1) {
	                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
	            }

	            if (format.indexOf('.') === 0) {
	                w = '';
	            }

	            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
	        }
	    }

	    /************************************
	        Top Level Functions
	    ************************************/

	    numeral = function (input) {
	        if (numeral.isNumeral(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numeral.fn.unformat(input);
	        }

	        return new Numeral(Number(input));
	    };

	    // version number
	    numeral.version = VERSION;

	    // compare numeral object
	    numeral.isNumeral = function (obj) {
	        return obj instanceof Numeral;
	    };

	    // This function will load languages and then set the global language.  If
	    // no arguments are passed in, it will simply return the current global
	    // language key.
	    numeral.language = function (key, values) {
	        if (!key) {
	            return currentLanguage;
	        }

	        if (key && !values) {
	            if(!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            currentLanguage = key;
	        }

	        if (values || !languages[key]) {
	            loadLanguage(key, values);
	        }

	        return numeral;
	    };
	    
	    // This function provides access to the loaded language data.  If
	    // no arguments are passed in, it will simply return the current
	    // global language object.
	    numeral.languageData = function (key) {
	        if (!key) {
	            return languages[currentLanguage];
	        }
	        
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	        
	        return languages[key];
	    };

	    numeral.language('en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (~~ (number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });

	    numeral.zeroFormat = function (format) {
	        zeroFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.defaultFormat = function (format) {
	        defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };

	    /************************************
	        Helpers
	    ************************************/

	    function loadLanguage(key, values) {
	        languages[key] = values;
	    }

	    /************************************
	        Floating-point helpers
	    ************************************/

	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function (callback, opt_initialValue) {
	            'use strict';
	            
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	            
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }

	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;

	            if (1 < arguments.length) {
	                value = opt_initialValue;
	                isValueSet = true;
	            }

	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }

	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }

	            return value;
	        };
	    }

	    
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }

	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function (prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	        return mp > mn ? mp : mn;
	        }, -Infinity);
	    }        


	    /************************************
	        Numeral Prototype
	    ************************************/


	    numeral.fn = Numeral.prototype = {

	        clone : function () {
	            return numeral(this);
	        },

	        format : function (inputString, roundingFunction) {
	            return formatNumeral(this, 
	                  inputString ? inputString : defaultFormat, 
	                  (roundingFunction !== undefined) ? roundingFunction : Math.round
	              );
	        },

	        unformat : function (inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
	                return inputString; 
	            }
	            return unformatNumeral(this, inputString ? inputString : defaultFormat);
	        },

	        value : function () {
	            return this._value;
	        },

	        valueOf : function () {
	            return this._value;
	        },

	        set : function (value) {
	            this._value = Number(value);
	            return this;
	        },

	        add : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },

	        subtract : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
	            return this;
	        },

	        multiply : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) * (curr * corrFactor) /
	                    (corrFactor * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },

	        divide : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);            
	            return this;
	        },

	        difference : function (value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }

	    };

	    /************************************
	        Exposing Numeral
	    ************************************/

	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numeral;
	    }

	    /*global ender:false */
	    if (typeof ender === 'undefined') {
	        // here, `this` means `window` in the browser, or `global` on the server
	        // add `numeral` as a global object via a string identifier,
	        // for Closure Compiler 'advanced' mode
	        this['numeral'] = numeral;
	    }

	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return numeral;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}).call(this);


/***/ }
/******/ ])
});
;