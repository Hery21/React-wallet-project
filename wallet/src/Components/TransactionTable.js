function TransactionTable({ transactionData }) {
  const amountColor = (item) => {
    if (item.transactionType === 'CREDIT') {
      return (
        <td className="text-success">
          +
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount).replace('Rp', '').trim()}
        </td>
      );
    }
    return (
      <td>
        -
        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount).replace('Rp', '').trim()}
      </td>
    );
  };

  const tableRow = transactionData.map((item) => (
    <tr key={item.id}>
      <td>
        {new Date(item.date).toLocaleTimeString('id-ID', {
          hour: 'numeric', minute: 'numeric',
        })}
        {' '}
        -
        {new Date(item.date).toLocaleDateString('id-ID', {
          year: 'numeric', month: 'short', day: 'numeric',
        })}
      </td>
      <td>{item.transactionType}</td>
      <td>{item.sourceWalletID}</td>
      <td>{item.description}</td>
      {amountColor(item)}
    </tr>
  ));

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Date & Time</th>
            <th scope="col">Type</th>
            <th scope="col">From / To</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
