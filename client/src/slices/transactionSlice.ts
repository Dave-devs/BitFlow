import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: []
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    runTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    clearTransactions: (state) => {
      state.transactions = [];
    }
  }
});

export const { runTransaction, clearTransactions } = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;

export const selectTransactions = (state: { transactions: TransactionState }) =>
  state.transactions.transactions;
export const selectBalance = (state: { transactions: TransactionState }) =>
  state.transactions.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
