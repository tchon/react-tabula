(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactTabula"] = factory(require("react"));
	else
		root["ReactTabula"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
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

	exports.DataTable = __webpack_require__(1);
	exports.Table = __webpack_require__(2);
	exports.PageItems = __webpack_require__(3);
	exports.PageSize = __webpack_require__(4);
	exports.Pagination = __webpack_require__(5);
	exports.SearchField = __webpack_require__(6);
	exports.DataMixin = __webpack_require__(7);
	exports.utils = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(9);
	var Table = __webpack_require__(2);
	var PageItems = __webpack_require__(3);
	var PageSize = __webpack_require__(4);
	var Pagination = __webpack_require__(5);
	var SearchField = __webpack_require__(6);

	var DataMixin = __webpack_require__(7);

	var DataTable = React.createClass({displayName: "DataTable",

	  mixins: [ DataMixin ],

	  render:function() {
	    var page = this.buildPage();

	    return (
	      React.createElement("div", {className: this.props.className}, 
	        React.createElement("div", {className: "row ns-spacer-vertical"}
	        ), 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-xs-8"}, 

	            React.createElement("div", {className: "btn-toolbar", role: "toolbar", "aria-label": "..."}, 

	              React.createElement("div", {className: "btn-group"}, 
	                React.createElement("button", {type: "button", className: "btn btn-default"}, "Configure"), 
	                React.createElement("button", {type: "button", className: "btn btn-default dropdown-toggle", 
	                  "data-toggle": "dropdown", "aria-expanded": "false"}, 
	                  React.createElement("span", {className: "caret"}), 
	                  React.createElement("span", {className: "sr-only"}, "Toggle Dropdown")
	                ), 
	                React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 

	                  React.createElement("li", null, React.createElement("a", {href: "#"}, "Columns 1")), 
	                  React.createElement("li", null, React.createElement("a", {href: "#"}, "Columns 2")), 
	                  React.createElement("li", null, React.createElement("a", {href: "#"}, "Columns 3")), 

	                  React.createElement("li", {class: "divider"}), 
	                  React.createElement("li", null, React.createElement("a", {href: "#"}, "Configure"))
	                )
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(9);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(9);

	function PageItems(){}

	  Object.defineProperty(PageItems.prototype,"render",{writable:true,configurable:true,value:function() {
	    var $__0=    this.props,dataSize=$__0.dataSize,startIndex=$__0.startIndex,endIndex=$__0.endIndex;
	    var start = startIndex + 1;

	    return (
	      React.createElement("div", {className: "ns-inline-block pull-left ns-page-items"}, 
	        "Items ", start, " – ", endIndex, " of ", dataSize, 
	        React.createElement("span", {className: "ns-spacer-horizontal"})
	      )
	    );
	  }});



	module.exports = PageItems;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(9);



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
	          {return React.createElement("li", {role: "presentation", className: isActive(size)}, 
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(9);
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(9);



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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $__0=     __webpack_require__(8),sort=$__0.sort,filter=$__0.filter;

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
	      initialPageSize: 5,
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }
/******/ ])
});
;