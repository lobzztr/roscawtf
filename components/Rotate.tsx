'use client'

import { contract } from "@/utils/contract"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { Bid } from "./Bid";
import { Pay } from "./Pay";

export function Rotate(){

    const account = useActiveAccount();
    const wallet = account ? account.address : ""

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });
    const currentRoundStr = currentRound ? currentRound.toString() : BigInt(0);

    const { data : hasPaidRound} = useReadContract({
        contract : contract,
        method : "hasPaidRound",
        params : [wallet, currentRound ? currentRound : BigInt(0)]
    })

    return(
        <div className="w-full h-full">
            {!hasPaidRound ? (
                <Pay/>
            ) : (
                <Bid/>
            )}
        </div>
    )
}