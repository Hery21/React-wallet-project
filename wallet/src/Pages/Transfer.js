import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import checkSVG from '../green_check.svg';

function Transfer({
  setWalletID, walletID, emptyAmount, errorAmount, setDescription, description, handleAddTransferData, modalIsOpen, modal,
}) {
  return (
    <div>
      <h1>Transfer</h1>
      <form>
        <div>
          <label htmlFor="from-field">From</label>
          <input
            readOnly
            id="from-field"
            name="from"
            placeholder="11234001000"
            className="form-control"
            disabled
          />
        </div>
        <div>
          <label htmlFor="to-field">To</label>
          <input
            type="number"
            id="to-field"
            placeholder="11234001000"
            onChange={(e) => setWalletID(parseInt(e.target.value, 10))}
            value={walletID}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="amount-field">Amount</label>
          {emptyAmount(errorAmount)}
        </div>
        <div>
          <label htmlFor="description-field">Description</label>
          <input
            type="text"
            id="description-field"
            required="required"
            placeholder="Bayar hutang"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddTransferData}>Send</button>
        <ToastContainer />
        <Modal className="card bg-secondary w-50 mx-auto" isOpen={modalIsOpen} ariaHideApp={false}>
          <div className="card bg-secondary m-4">
            <h1 className="text-center">Transfer</h1>
            <div className="card p-4">
              <div className="row d-flex justify-content-center">
                <img className="rounded img-thumbnail w-25" src={checkSVG} alt="check" />
                <h2 className="text-success d-flex justify-content-center">Transfer Success</h2>
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
                <Link to="/">
                  <button className="btn btn-outline-primary mx-4" type="button">Print</button>
                </Link>
                <Link to="/">
                  <button className="btn btn-outline-primary mx-4" type="button">Close</button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
}

export default Transfer;
