import { Header } from './components/Header';
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar';
import { useMetamaskState } from './web3/ConnectWallet';

import { useEffect } from 'react';
import { useGetValue } from './web3/GetCurrentValue';
import { useGetBalance } from './web3/GetTokenBalance';
import { useRequestFunds } from './web3/GetFunds';
import { useCreateProposal } from './web3/NewProposal';

import "./App.css"



function App() {

  const { boxValue, getValue } = useGetValue();
  const { isConnected, account, signer, connectToMetamask } = useMetamaskState();
  const { userBalance, getBalance } = useGetBalance();
  const { requestFunds } = useRequestFunds();
  const { createProposal, proposal, newValue, proposalDescription } = useCreateProposal();



  return (
    <>
      <Header connectToMetamask={connectToMetamask} isConnected={isConnected} account={account} signer={signer} />
      <Navbar boxValue={boxValue} getValue={getValue} userBalance={userBalance} getBalance={getBalance} signer={signer} requestFunds={requestFunds} createProposal={createProposal} proposal={proposal} newValue={newValue} proposalDescription={proposalDescription} />
      <Footer />
    </>
  );
}

export default App;
