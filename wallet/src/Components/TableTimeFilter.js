import { useEffect, useState } from 'react';

import TransactionTable from './TransactionTable';

function TableTimeFilter({
  setSearchText, searchText,
}) {
  const [transactionData, setTransactionData] = useState([]);
  const [shownData, setShownData] = useState([]);
  const [error, setError] = useState(null);

  const sortByOption = [
    { key: 'Date' },
    { key: 'Amount' },
  ];

  const sortStyleOption = [
    { key: 'Descending' },
    { key: 'Ascending' },
  ];

  const showOption = [
    { key: 'Last 10 transaction' },
    { key: 'This month' },
    { key: 'Last month' },
    { key: 'This year' },
    { key: 'Last year' },
  ];

  const [defaultFilter, setDefaultFilter] = useState(showOption[0].key);
  const [defaultStyle, setDefaultStyle] = useState(sortStyleOption[0].key);
  const [defaultSortBy, setDefaultSortBy] = useState(sortByOption[0].key);

  const getThisMonth = () => {
    const thisMonth = new Date();
    return thisMonth.getMonth();
  };

  const getThisYear = () => {
    const thisYear = new Date();
    return thisYear.getFullYear();
  };

  const getOnlyMonth = (date) => {
    const d = new Date(date);
    return d.getMonth();
  };

  const getOnlyYear = (date) => {
    const d = new Date(date);
    return d.getFullYear();
  };

  const lastTenTransaction = (data) => {
    data.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    return data.slice(0, 10);
  };

  const thisMonth = (data) => {
    const temp = [];

    for (let i = 0; i < data.length; i += 1) {
      if (getOnlyMonth(data[i].date) === getThisMonth()) {
        temp.push(data[i]);
      }
    }
    return temp;
  };

  const lastMonth = (data) => {
    const temp = [];

    for (let i = 0; i < data.length; i += 1) {
      if (getOnlyMonth(data[i].date) === getThisMonth() - 1) {
        temp.push(data[i]);
      }
    }
    return temp;
  };

  const thisYear = (data) => {
    const temp = [];

    for (let i = 0; i < data.length; i += 1) {
      if (getOnlyYear(data[i].date) === getThisYear()) {
        temp.push(data[i]);
      }
    }
    return temp;
  };

  const lastYear = (data) => {
    const temp = [];

    for (let i = 0; i < data.length; i += 1) {
      if (getOnlyYear(data[i].date) === getThisYear() - 1) {
        temp.push(data[i]);
      }
    }
    return temp;
  };

  const sortDate = (data, style) => {
    if (style === 'Ascending') {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (style === 'Descending') {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return data;
  };

  const sortAmount = (data, style) => {
    if (style === 'Ascending') {
      data.sort((a, b) => Number(b.amount) - Number(a.amount));
    }
    if (style === 'Descending') {
      data.sort((a, b) => a.amount - b.amount);
    }
    return data;
  };

  const searching = (data, text) => {
    const temp = [];
    const tempText = new RegExp(text, 'i');

    for (let i = 0; i < data.length; i += 1) {
      if (tempText.test(data[i].description)) {
        temp.push(data[i]);
      }
    }
    return temp;
  };

  const sortAll = (data) => {
    const newFormData = [];
    const newFormData2 = [];
    const newFormData3 = [];

    if (data === null) {
      return newFormData;
    }

    if (defaultFilter === showOption[0].key) {
      newFormData.push(...lastTenTransaction(data));
    }
    if (defaultFilter === showOption[1].key) {
      newFormData.push(...thisMonth(data));
    }
    if (defaultFilter === showOption[2].key) {
      newFormData.push(...lastMonth(data));
    }
    if (defaultFilter === showOption[3].key) {
      newFormData.push(...thisYear(data));
    }
    if (defaultFilter === showOption[4].key) {
      newFormData.push(...lastYear(data));
    }

    if (defaultSortBy === sortByOption[0].key) {
      newFormData2.push(...sortDate(newFormData, defaultStyle));
    }
    if (defaultSortBy === sortByOption[1].key) {
      newFormData2.push(...sortAmount(newFormData, defaultStyle));
    }

    if (searchText !== '') {
      newFormData3.push(...searching(newFormData2, searchText));
      return newFormData3;
    }

    return newFormData2;
  };

  useEffect(() => {
    fetch('http://localhost:8080/wallets/9009090/transactions')
      .then((response) => response.json())
      .then((data) => setTransactionData(data))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    setShownData(sortAll(transactionData));
  }, [transactionData, defaultFilter, defaultStyle, defaultSortBy, searchText]);

  const tableComponent = (
    <div>
      <form>
        <div>
          <label>Show</label>
          <select id="show-field" onChange={(e) => setDefaultFilter(e.target.value)}>
            {showOption.map((option) => (
              <option key={option.key} value={option.key}>
                {option.key}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-end">
          <label>Sort By</label>
          <select className="col" id="sortBy-field" onChange={(e) => setDefaultSortBy(e.target.value)}>
            {sortByOption.map((option) => (
              <option key={option.key} value={option.key}>
                {option.key}
              </option>
            ))}
          </select>
          <select id="sortStyle-field" onChange={(e) => setDefaultStyle(e.target.value)}>
            {sortStyleOption.map((option) => (
              <option key={option.key} value={option.key}>
                {option.key}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="search"
            required="required"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
      </form>
      <TransactionTable transactionData={shownData} />
    </div>
  );
  return (
    error ? error.message : tableComponent
  );
}

export default TableTimeFilter;
