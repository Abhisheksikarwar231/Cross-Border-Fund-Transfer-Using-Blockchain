import { Injectable } from '@angular/core';
import { Blockchain } from 'SavjeeCoin/src/blockchain';
import EC from 'elliptic';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchainInstance = new Blockchain();
  public walletKeys: Array<IWalletKey> = [];

  constructor() {
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions('04349986403dbe66567629f155c49349b7b650bcca25ffd91337486e9ceae659c96c67304f59e222ef78f7332ca9de5cb5a93a270a996927bf69b795b9b8d32901');
    this.generateWalletKeys();
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });

    console.log(this.walletKeys);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }
}

export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
