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
