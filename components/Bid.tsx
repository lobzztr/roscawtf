'use client'

import { contract } from "@/utils/contract";
import { useState } from "react"
import { prepareContractCall } from "thirdweb";
import { darkTheme, TransactionButton, useActiveAccount, useReadContract,  } from "thirdweb/react"

export function Bid(){

    const customTheme = darkTheme({
        colors: {
          primaryButtonText: "white",
          primaryButtonBg: "darkslategray",
        },
    });

    const [bidPercentage, setBidPercentage] = useState(5)

    const account = useActiveAccount();
    const wallet = account ? account.address : ""

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });


    const { data : highestBidder } = useReadContract({
        contract : contract,
        method : "winnerWinner"
    });

    const { data : highBidderName } = useReadContract({
        contract : contract,
        method : "username",
        params : [highestBidder ? highestBidder : ""]
    });

    const { data : yourname } = useReadContract({
        contract : contract,
        method : "username",
        params : [wallet ? wallet : ""]
    });

    const { data : yourBid } = useReadContract({
        contract : contract,
        method : "participantBidforRound",
        params : [wallet, currentRound ? currentRound : BigInt(0)]
    });
    const yourBidStr = yourBid ? yourBid.toString() : BigInt(0);




    return(
        <div className="w-full flex flex-col items-center space-y-6 mb-6">
            <span className="font-bold text-gray-500 text-lg mt-6 px-2">-------</span>
            <div className="space-y-2 flex flex-col items-center mb-2">
              <p className="space-y-2 text-sm font-bold text-green-500">
                winning : {highBidderName === yourname ? (
                    "you"
                ) :  highBidderName === "admin" ? (
                    "raffle"
                ) : (
                    highBidderName
                ) }
              </p>
              <p className="space-y-2 text-sm font-bold text-red-500">your bid : {yourBidStr}%</p>
            </div>

            <div className="space-y-1 mb-6"> 
                <p className="mt-3 text-center text-blue-500 font-bold text-base">{bidPercentage}%</p>
                <input
                type="range"
                min={1}
                max={21}
                step={1}
                value={bidPercentage}
                onChange={(e) => setBidPercentage(Number(e.target.value))}
                className="w-full bg-red-500"
                />
                <div className="w-full flex flex-col items-center">
                    <TransactionButton
                        theme={customTheme}
                        transaction={async () => {
                            return prepareContractCall({
                                contract: contract,
                                method: "bid",
                                params: [BigInt(bidPercentage)]
                            });
                        }}
                        onTransactionConfirmed={() => alert("Success!!")}
                    >
                    🙋‍♀️ bid
                    </TransactionButton>
                </div>                
            </div>
        </div>
    )
}