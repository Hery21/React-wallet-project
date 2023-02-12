### Mock DigiWallet API

### run API
1. Run executable file `./mock-wallet-api.sh` (default will run in port 3000) or pass custom PORT ENV `PORT=4000 ./mock-wallet-api.sh`
2. if you don't have permission please do `chmod +x file.sh`

### API
Api docs can be found in stdout/console when running these apps. 

#### 1. Get Wallet: GET /wallets/{walletID}
Currently, wallet ID is hardcoded, we can use wallet `ID = 9009090` for access existing wallet. Get wallet detail `/wallets/9009090`.
Existing wallet:
```json
{
  "id": 9009090,
  "customerName": "John Doe",
  "balance": 200
}
```

#### 2. Get Transaction list: GET /wallets/{walletID}/transactions
Example transactions:
```json
[
    {
        "id": 2,
        "transactionType": "DEBIT",
        "amount": 100,
        "sourceWalletID": 9009090,
        "destinationWalletID": 1001,
        "description": "",
        "date": "2022-07-08T15:29:06+07:00"
    },
    {
        "id": 1,
        "transactionType": "CREDIT",
        "amount": 100,
        "sourceWalletID": 1001,
        "destinationWalletID": 9009090,
        "description": "Bank Transfer",
        "date": "2022-07-08T15:28:36+07:00"
    }
]
```

#### 3. Transfer: POST /wallets/{walletID}/transactions
Request body/payload
```json
{
  "transactionType": "DEBIT",
  "amount": 5000,
  "walletID": 2,
  "description": "Buy coffee"
}
```

#### 4. Top Up: POST /wallets/{walletID}/transactions
Request body/payload
```json
{
  "transactionType": "CREDIT",
  "amount": 99000,
  "walletID": 1001,
  "description": "Buy coffee"
}
```

Available walletID (source of funds) for top up:

| Wallet ID | Description   |
|-----------|---------------|
| 1001      | Bank Transfer |
| 1002      | Visa Card     |
| 1003      | Cash          |
