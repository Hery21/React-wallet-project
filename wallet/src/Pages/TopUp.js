import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import checkSVG from '../green_check.svg';

function TopUp({
  setDescription, descriptionOption, amount, setAmount, handleAddTopUpData, modalIsOpen, modal, setModalIsOpenToFalse,
}) {
  const navigate = useNavigate();

  const handlePrint = (event) => {
    event.preventDefault();
    setModalIsOpenToFalse();

    fetch('http://localhost:8080/wallets/9009090/transactions', handlePrint)
      .then((response) => response.json())
      .then(navigate('/'));
  };

  return (
    <div>
      <h1>Top Up</h1>
      <form>
        <div>
          <label htmlFor="from-field">From</label>
          <select className="form-select" id="show-field" onChange={(e) => setDescription(parseInt(e.target.value, 10))}>
            {descriptionOption.map((option) => (
              <option key={option.key} value={option.value}>
                {option.key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="to-field">To</label>
          <input
            readOnly
            className="form-control"
            id="to-field"
            placeholder="11234001000"
            disabled
          />
        </div>
        <div>
          <label htmlFor="amount-field">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount-field"
            required="required"
            placeholder="1.000.000"
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            value={amount}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddTopUpData}>Send</button>
        <Modal className="card bg-secondary w-50 mx-auto" isOpen={modalIsOpen} ariaHideApp={false}>
          <div className="card bg-secondary m-4">
            <h1 className="text-center">Top Up</h1>
            <div className="card p-4">
              <div className="row d-flex justify-content-center">
                <img className="rounded img-thumbnail w-25" src={checkSVG} alt="check" />
                <h2 className="text-success d-flex justify-content-center">Top Up Success</h2>
              </div>
              <div className="row">
                <p className="col">Amount</p>
                <h3 className="col d-flex justify-content-end">{modal.amount}</h3>
              </div>
              <div className="row">
                <p className="col">Transaction id</p>
                <p className="col d-flex justify-content-end">{modal.id}</p>
              </div>
              <div className="row">
                <p className="col">From</p>
                <p className="col d-flex justify-content-end">{modal.sourceWalletID}</p>
              </div>
              <div className="row">
                <p className="col">To</p>
                <p className="col d-flex justify-content-end">{modal.destinationWalletID}</p>
              </div>
              <div className="row">
                <p className="col">Description</p>
                <p className="col d-flex justify-content-end">{modal.description}</p>
              </div>
              <div className="col mx-auto">
                <button className="btn btn-outline-primary mx-4" type="button" onClick={handlePrint}>Print</button>
                <button className="btn btn-outline-primary mx-4" type="button" onClick={handlePrint}>Close</button>
              </div>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
}

export default TopUp;
