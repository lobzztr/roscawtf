'use client'

import { contract } from "@/utils/contract";
// import { useState } from "react"
import { prepareContractCall, toEther } from "thirdweb";
import { TransactionButton, useReadContract,  } from "thirdweb/react"
import { darkTheme } from 'thirdweb/react';


export function Pay(){

    const customTheme = darkTheme({
        colors: {
          primaryButtonText: "white",
          primaryButtonBg: "darkslategray",
        },
      });

    // const account = useActiveAccount();
    // const wallet = account ? account.address : ""

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });


    const { data : dueBig } = useReadContract({
        contract : contract,
        method : "contributionDueforRound",
        params : [currentRound ? currentRound : BigInt(0)]
    });
    const due = dueBig ? toEther(dueBig).toString() : BigInt(0);

    const { data : dividendBig } = useReadContract({
        contract : contract,
        method : "discountOfferedforRound",
        params : [currentRound ? currentRound : BigInt(0)]
    });
    const dividend = dividendBig ? toEther(dividendBig).toString() : toEther(BigInt(0));


    return(
        <div className="w-full flex flex-col items-center space-y-6 mb-6">
            <span className="font-bold text-gray-500 text-lg mt-6 px-2">-------</span>
            <div className="space-y-2 flex flex-col items-center mb-2">
              <p className="space-y-2 text-sm font-bold text-green-500">discount : {dividend} IN₹</p>
              <p className="space-y-2 text-sm font-bold text-red-500">due : {due} IN₹</p>
            </div>

            <div className="space-y-1 mb-6">                 
                {/* <button 
                    className="w-full bg-black text-white border-4 border-white rounded hover:bg-yellow-500 hover:text-blue-500 text-lg font-bold mb-3 py-2"                    
                >bid</button> */}
                <div className="w-full flex flex-col items-center">
                    <TransactionButton
                        theme={customTheme}
                        transaction={async () => {
                            return prepareContractCall({
                                contract: contract,
                                method: "contribute",
                            });
                        }}
                        onTransactionConfirmed={() => alert("Success!!")}
                    >
                    💰 contribute
                    </TransactionButton>
                </div>
                
            </div>
        </div>
    )
}