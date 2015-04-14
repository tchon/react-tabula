require('../../css/table-twbs.css');

var React = require('react');
var { DataTable } = require('react-tabula');


function buildTable(data) {
  var columnKeys = [ 'PHYLUM', 'ANIMAL GENUS', 'ANIMAL', 'WALKS', 'EATS', 'SLEEPS' ],
    tableColumns = [
    { title: 'Phylum', prop: 'PHYLUM' },
    { title: 'Animal Genus', prop: 'ANIMAL GENUS' },
    { title: 'Animal', prop: 'ANIMAL' },
    { title: 'No. of Walks', prop: 'WALKS', defaultContent: '<none>' },
    { title: 'Meals per day', prop: 'EATS', defaultContent: '<none>' },
    { title: 'Naps per day', prop: 'SLEEPS', defaultContent: '<none>' }
    ];

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


var records = [
  {
    'PHYLUM': 'Canidae',
    'ANIMAL GENUS': 'Canis',
    'ANIMAL': 'Labrador',
    'WALKS': 2,
    'EATS': 3,
    'SLEEPS': 5
  },
  {
    'PHYLUM': 'Canidae',
    'ANIMAL GENUS': 'Canis',
    'ANIMAL': 'Beagle',
    'WALKS': 5,
    'EATS': 2,
    'SLEEPS': 1
  },
  {
    'PHYLUM': 'Felidae',
    'ANIMAL GENUS': 'Felis',
    'ANIMAL': 'Tabby',
    'WALKS': 1,
    'EATS': 6,
    'SLEEPS': 10
  },
  {
    'PHYLUM': 'Felidae',
    'ANIMAL GENUS': 'Felis',
    'ANIMAL': 'Balinese',
    'WALKS': 3,
    'EATS': 2,
    'SLEEPS': 12
  },
  {
    'PHYLUM': 'Chordata',
    'ANIMAL GENUS': 'Aves',
    'ANIMAL': 'Finch',
    'WALKS': 0,
    'EATS': 10,
    'SLEEPS': 2
  },
  {
    'PHYLUM': 'Chordata',
    'ANIMAL GENUS': 'Aves',
    'ANIMAL': 'Crow',
    'WALKS': 11,
    'EATS': 3,
    'SLEEPS': 1
  }
];

window.tabula = React.render(buildTable(records), document.body);
