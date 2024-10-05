'use client'

import { contract } from "@/utils/contract";
// import { useState } from "react"
import { prepareContractCall, toEther } from "thirdweb";
import { TransactionButton, useActiveAccount, useReadContract,  } from "thirdweb/react"
import { darkTheme } from 'thirdweb/react';


export function Winner(){

    const customTheme = darkTheme({
        colors: {
          primaryButtonText: "black",
          primaryButtonBg: "Lime",
        },
      });

    const account = useActiveAccount();
    const wallet = account ? account.address : ""

    const { data : adminLoad } = useReadContract({
        contract : contract,
        method : "admin"
    })
    const admin = adminLoad ? adminLoad.toString() : ""

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });


    const { data : prizeMoney } = useReadContract({
        contract : contract,
        method : "prizeMoneyforRound",
        params : [currentRound ? currentRound : BigInt(0)]
    });
    const prize = prizeMoney ? toEther(prizeMoney).toString() : BigInt(0);

    const { data : winningBid } = useReadContract({
        contract : contract,
        method : "winningBidforRound",
        params : [currentRound ? currentRound : BigInt(0)]
    });
    const wBid = winningBid ? (winningBid).toString() : (BigInt(0));

    const { data : defaulterCount } = useReadContract({
        contract : contract,
        method : "defaulterCountforRound",
        params : [currentRound ? currentRound : BigInt(0)]
    });
    const defaulters = defaulterCount ? (defaulterCount).toString() : "0";

    const { data : winnerRound } = useReadContract({
        contract : contract,
        method : "winnerforRound",
        params : [currentRound ? currentRound : BigInt(0)]
    });
    const winner = winnerRound ? winnerRound.toString() : ""

    const { data : winnerName } = useReadContract({
        contract : contract,
        method : "username",
        params : [winner]
    })

    if (admin !== winner){
        return(
            <div className="w-full flex flex-col items-center space-y-6 mb-6">

                <span className="font-bold text-gray-500 text-lg mt-6 px-2">-------</span>
                <div className="space-y-2 flex flex-col items-center mb-2">
                  <p className="space-y-2 text-sm font-bold text-green-500">prize : {prize.toString()} IN₹</p>
                  <p className="space-y-2 text-sm font-bold text-blue-500">discount : {wBid.toString()} %</p>
                  <p className="space-y-2 text-sm font-bold text-red-500">deafulters : {defaulters.toString()}</p>
                  <p className="space-y-2 text-sm font-bold text-blue-500">winner : {winnerName}</p>
                  <p className="space-y-2 text-sm font-bold text-blue-500">fees : 10 INR</p>
                </div>

                { wallet === winnerRound ? (
                    <div className="space-y-1 mb-6">
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
                            💸 cashout
                            </TransactionButton>
                        </div>
                        
                    </div>
                ) : (
                    <div></div>
                )}
    
                
            </div>
        )
    } else {
        return(
            <div className="w-full flex flex-col items-center space-y-6 mb-3">
                <div className="space-y-2 flex flex-col items-center mb-2 py-6">
                    <p className="space-y-2 text-sm font-bold text-green-500">no more contributions / bids</p>
                    <p className="space-y-2 text-sm font-bold text-green-500">for this round..</p>
                    <p className="space-y-2 text-sm font-bold text-green-500">winner will be annoounced soon !!</p>
                </div>
            </div>
        )
    }
    
}