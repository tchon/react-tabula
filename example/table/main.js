require('../../css/table-twbs.css');

var React = require('react');
var { DataTable } = require('react-tabula');
var d3 = require('d3');

function buildTable(data) {
  var renderMapUrl =
    (val, row) =>
      <a href={`https://www.google.com/maps?q=${row['LAT']},${row['LON']}`}>
        Google Maps
      </a>;

  var tableColumns = [
    { title: 'Phylum', prop: 'PHYLUM' },
    { title: 'Animal Genus', prop: 'ANIMAL GENUS' },
    { title: 'Animal', prop: 'ANIMAL' },
    { title: 'No. of Walks', prop: 'WALKS', defaultContent: '<none>' },
    { title: 'Meals per day', prop: 'EATS', defaultContent: '<none>' },
    { title: 'Naps per day', prop: 'SLEEPS', defaultContent: '<none>' }
    ],
    columnKeys = [ 'PHYLUM', 'ANIMAL GENUS', 'WALKS', 'EATS', 'SLEEPS' ];

  return (
    <DataTable
      className="container"
      keys={columnKeys}
      columns={tableColumns}
      initialData={data}
      initialPageSize={15}
      initialSortBy={{ prop: 'PHYLUM', order: 'ascending' }}
      pageSizeOptions={[ 5, 15, 50, 100 ]}
      pageSizeMax={100}
    />
  );
}

d3.csv('/dupe_data.csv', function(error, rows) {
  window.tabula = React.render(buildTable(rows), document.body);
});
