'use strict';

var $__0=     require('./utils'),sort=$__0.sort,filter=$__0.filter;

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
      pageLength: this.props.initialPageLength
    };
  },

  getDefaultProps:function() {
    return {
      initialPageLength: 5,
      pageLengthMax: 20,
      pageLengthOptions: [ 5, 10, 20 ],
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
    var $__0=    this.state,data=$__0.data,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var start = pageLength * currentPage;
    var end = start + pageLength;

    return {
      data: data.slice(start, end),
      dataLength: data.length,
      currentPage: currentPage,
      startIndex: start,
      endIndex: end,
      totalPages: Math.ceil(data.length / pageLength)
    };
  },

  onChangePage:function(pageNumber) {
    var pageLength = this.state.pageLength;
    var start = pageLength * pageNumber;
    var end = start + pageLength;

    this.setState({
      currentPage: pageNumber,
      startIndex: start,
      endIndex: end
    });
  },

  onPageLengthChange:function(value) {
    var newPageLength = +value;
    var $__0=   this.state,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    var start = newPageLength * currentPage;
    var end = start + newPageLength;

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
