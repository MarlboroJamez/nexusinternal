import React, { useState } from 'react';
import FilterBuilder from 'react-filter-builder';

function Searchbuilder({ searches }) {
  const [query, setQuery] = useState(null);

  const filteredData = query ?
    searches.filter(obj => query.evaluate(obj)) :
    searches.map(obj => {
      return Object.fromEntries(Object.entries(obj).filter(([key, value]) => key !== 'search'));
    });

    const myFilterDefs = [
        {
          field: 'name',
          label: 'Name',
          operators: [
            {
              label: 'Is',
              operator: 'eq',
              inputType: 'text',
            }
          ],
        }
    ];

  const customOperations = [
    {
      name: 'anyof',
      caption: 'Is any of',
      icon: 'check',
      calculateFilterExpression: calculateFilterExpression,
    },
  ];

  function calculateFilterExpression(filterValue, field) {
    return filterValue && filterValue.length
      && Array.prototype.concat.apply([], filterValue.map((value) => [[field.name, '=', value], 'or'])).slice(0, -1);
  }

  return (
    <div>
      <FilterBuilder value={filteredData} customOperations={customOperations} onValueChanged={setQuery} />
    </div>
  );
}

export default Searchbuilder;
