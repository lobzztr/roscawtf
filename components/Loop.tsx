'use client'

import { contract } from "@/utils/contract";
import { toEther } from "thirdweb";
import { useReadContract } from "thirdweb/react"
import { Rotate } from "./Rotate";

export function Loop(){

    // const account = useActiveAccount();
    // const wallet = account ? account.address : ""

    const { data : slots } = useReadContract({
        contract : contract,
        method : "slots"
    });
    const slotsStr = slots ? slots.toString() : "0"

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });
    const currentRoundStr = currentRound ? currentRound.toString() : BigInt(0)

    const { data : deadlineforRound} = useReadContract({
        contract : contract,
        method : "deadlineforRound",
        params : [currentRound ? currentRound : BigInt(0)]

    })
    const deadline = deadlineforRound ? (deadlineforRound).toString() : "0"

    

    const { data : totalContributionforRound} = useReadContract({
        contract : contract,
        method : "totalContributionforRound",
        params : [currentRound ? currentRound : BigInt(0)]

    })
    const total = totalContributionforRound ? toEther(totalContributionforRound).toString() : "0"

    const { data : winningBidforRound} = useReadContract({
        contract : contract,
        method : "winningBidforRound",
        params : [currentRound ? currentRound : BigInt(0)]

    })
    const bid = winningBidforRound ? (winningBidforRound).toString() : "0"


    // const { data : hasPaidRound} = useReadContract({
    //     contract : contract,
    //     method : "hasPaidRound",
    //     params : [wallet, currentRound ? currentRound : BigInt(0)]
    // })


    function truncate(value: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(value);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be convertible to a number.');
        }
        const factor: number = Math.pow(10, decimalPlaces);
        return Math.trunc(numericValue * factor) / factor;
    }


    return(
        <div className="w-full h-full flex flex-col items-center border-2 border-blue-500 py-6 my-3 rounded">
            <span className="text-red-500 my-1 text-base text-gray-500 font-bold">⭕️ round {currentRoundStr}/{slotsStr} </span>
            <span className="text-red-500 my-1">⏳  4.20PM 20 April 2024 </span>            
            <div className="w-full h-full flex justify-center mt-3 font-bold">
                <span className="text-blue-500 my-1 mx-3">💰</span>
                <span className="text-blue-500 my-1"> {truncate(total, 3)} IN₹</span>
            </div>
            <div className="w-full h-full flex justify-center font-bold">
                <span className="text-blue-500 my-1 mx-3">🙋‍♀️</span>
                <span className="text-red-500 my-1"> {bid} %</span>
            </div>

            {currentRoundStr === "0" ? (
                <div>
                    enroll // waiting for others
                </div>
            ) : deadline && Date.now() < Number(deadline) * 1000 ? (
                <Rotate/> 
            ) : (
                <div>winner</div>
            )
            }

        </div>
    )
}