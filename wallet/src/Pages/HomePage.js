import Balance from '../Components/Balance';
import TableTimeFilter from '../Components/TableTimeFilter';

function HomePage({
  setSearchText, searchText,
}) {
  return (
    <div className="row">
      <Balance />
      <TableTimeFilter
        setSearchText={setSearchText}
        searchText={searchText}
      />
    </div>
  );
}

export default HomePage;
