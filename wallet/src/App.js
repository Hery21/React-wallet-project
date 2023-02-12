import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import HomePage from './Pages/HomePage';
import TopUp from './Pages/TopUp';
import Transfer from './Pages/Transfer';
import Games from './Pages/Games';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [walletID, setWalletID] = useState(0);
  const [errorAmount, setErrorAmount] = useState(false);
  const [amount, setAmount] = useState(0);
  const [modal, setModal] = useState([]);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const descriptionOption = [
    { key: 'Bank Transfer', value: 1001 },
    { key: 'Visa Card', value: 1002 },
    { key: 'Cash', value: 1003 },
  ];
  const [description, setDescription] = useState(descriptionOption[0].value);

  const handleAddTopUpData = () => {
    setModalIsOpenToTrue();
    const topUpData = {
      transactionType: 'CREDIT',
      walletID: description,
      amount,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topUpData),
    };

    fetch('http://localhost:8080/wallets/9009090/transactions', requestOptions)
      .then((response) => response.json())
      .then((data) => setModal(data));
  };

  const emptyAmount = (error) => {
    if (error === false) {
      return (
        <input
          type="number"
          id="amount-field"
          required="required"
          placeholder="1.000.000"
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          value={amount}
          className="form-control"
        />
      );
    }
    return (
      <>
        <input
          type="number"
          id="amount-field"
          required="required"
          placeholder="1.000.000"
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          value={amount}
          className="form-control is-invalid"
        />
        <div className="invalid-feedback">
          Please insert amount of transfer
        </div>
      </>
    );
  };

  const notify = (errorText) => toast.error(errorText);

  const handleAddTransferData = () => {
    const transferData = {
      transactionType: 'DEBIT',
      walletID,
      amount,
      description,
    };

    if (amount === 0) {
      setErrorAmount(true);
    }
    setErrorAmount(false);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    };

    fetch('http://localhost:8080/wallets/9009090/transactions', requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setModalIsOpenToTrue();
          return response.json();
        }
        return notify('exceeds balance');
      })
      .then((data) => setModal(data));
  };
  const [searchText, setSearchText] = useState('');

  const [card1, setCard1] = useState(0);
  const [card2, setCard2] = useState(0);
  const [card3, setCard3] = useState(0);
  const [card4, setCard4] = useState(0);
  const [card5, setCard5] = useState(0);
  const [card6, setCard6] = useState(0);
  const [card7, setCard7] = useState(0);
  const [card8, setCard8] = useState(0);
  const [card9, setCard9] = useState(0);

  const reward = [1000, 5000, 10000, 50000, 75000, 100000, 250000, 500000, 1000000];

  useEffect(() => {
    setCard1(reward[Math.floor(Math.random() * reward.length)]);
    setCard2(reward[Math.floor(Math.random() * reward.length)]);
    setCard3(reward[Math.floor(Math.random() * reward.length)]);
    setCard4(reward[Math.floor(Math.random() * reward.length)]);
    setCard5(reward[Math.floor(Math.random() * reward.length)]);
    setCard6(reward[Math.floor(Math.random() * reward.length)]);
    setCard7(reward[Math.floor(Math.random() * reward.length)]);
    setCard8(reward[Math.floor(Math.random() * reward.length)]);
    setCard9(reward[Math.floor(Math.random() * reward.length)]);
  }, []);

  // useEffect((e) => {
  //   // eslint-disable-next-line default-case
  //   switch (e.target.value) {
  //     case 1:
  //       setAmount(card1);
  //       break;
  //     case 2:
  //       setAmount(card2);
  //       break;
  //     case 3:
  //       setAmount(card3);
  //       break;
  //     case 4:
  //       setAmount(card4);
  //       break;
  //     case 5:
  //       setAmount(card5);
  //       break;
  //     case 6:
  //       setAmount(card6);
  //       break;
  //     case 7:
  //       setAmount(card7);
  //       break;
  //     case 8:
  //       setAmount(card8);
  //       break;
  //     case 9:
  //       setAmount(card9);
  //       break;
  //   }
  // }, []);

  const handleGame = () => {
    const topUpData = {
      transactionType: 'CREDIT',
      walletID: description,
      amount,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topUpData),
    };

    fetch('http://localhost:8080/wallets/9009090/transactions', requestOptions)
      .then((response) => response.json())
      .then((data) => setModal(data));
  };

  return (
    <div className="App mx-5">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">DigiWallet</div>
          <div className="d-flex">
            <div className="row">
              <ul className="navbar-nav list-group-horizontal mx-3">
                <li className="nav-item mx-3">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="topup">Top Up</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="transfer">Transfer</a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="games">Games</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="pages">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={(
                <HomePage
                  setSearchText={setSearchText}
                  searchText={searchText}
                />
                              )}
            />
            <Route
              path="/topup"
              element={(
                <TopUp
                  setDescription={setDescription}
                  descriptionOption={descriptionOption}
                  amount={amount}
                  setAmount={setAmount}
                  handleAddTopUpData={handleAddTopUpData}
                  modalIsOpen={modalIsOpen}
                  modal={modal}
                  setModalIsOpenToFalse={setModalIsOpenToFalse}
                />
                              )}
            />
            <Route
              path="/transfer"
              element={(
                <Transfer
                  setModalIsOpenToFalse={setModalIsOpenToFalse}
                  setWalletID={setWalletID}
                  walletID={walletID}
                  emptyAmount={emptyAmount}
                  errorAmount={errorAmount}
                  setDescription={setDescription}
                  description={description}
                  handleAddTransferData={handleAddTransferData}
                  modalIsOpen={modalIsOpen}
                  modal={modal}
                />
                              )}
            />
            <Route
              path="/games"
              element={(
                <Games
                  handleGame={handleGame}
                  card1={card1}
                  card2={card2}
                  card3={card3}
                  card4={card4}
                  card5={card5}
                  card6={card6}
                  card7={card7}
                  card8={card8}
                  card9={card9}
                />
              )}
            />
            <Route
              path="*"
              element={
                <h1>404 Not Found</h1>
                            }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
