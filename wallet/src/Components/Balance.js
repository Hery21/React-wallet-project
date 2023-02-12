import { useEffect, useState } from 'react';

function Balance() {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/wallets/9009090')
      .then((response) => response.json())
      .then((data) => {
        setBalance(data.balance);
        setName(data.customerName);
        setAccount(data.id);
      })
      .catch((err) => setError(err));
  }, []);

  const balanceComponent = (
    <div>
      <div>
        <h2>
          Good Morning,
          {name}
          !
        </h2>
      </div>
      <div>
        <p>
          Account:
          {account}
        </p>
        <h5 className="d-flex justify-content-end">Balance:</h5>
        <h1 className="d-flex justify-content-end">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(balance).replace('Rp', 'IDR')}
        </h1>
      </div>
    </div>
  );
  return (
    error ? error.message : balanceComponent
  );
}

export default Balance;
