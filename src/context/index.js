import React, { useState } from 'react';
const Context = React.createContext();

export const ContextProvider = ({ children }) => {

    const [contract, setContract] = useState()
    const [user, setUser] = useState();
    const [account, setAccount] = useState();
    const [currentSupply, setCurrentSupply] = useState();
    const [networkId, setNetworkId] = useState();
    const [tokenIds, setTokenIds] = useState();

    const contextValue = {
        contract,
        setContract,
        user,
        setUser,
        account,
        setAccount,
        currentSupply,
        setCurrentSupply,
        networkId,
        setNetworkId,
        tokenIds,
        setTokenIds
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default Context;