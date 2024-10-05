'use client'

import { contract } from "@/utils/contract"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { Bid } from "./Bid";
import { Pay } from "./Pay";
import { Winner } from "./Winner";

export function Rotate(){

    const account = useActiveAccount();
    const wallet = account ? account.address : ""

    const { data : currentRound } = useReadContract({
        contract : contract,
        method : "currentRound"
    });

    const { data : hasPaidRound} = useReadContract({
        contract : contract,
        method : "hasPaidRound",
        params : [wallet, currentRound ? currentRound : BigInt(0)]
    })
    const { data : hasWon} = useReadContract({
        contract : contract,
        method : "hasWon",
        params : [wallet]
    })

    return(
        <div className="w-full h-full">
            { !hasPaidRound ? (
                <Pay/>
            ) : !hasWon ? (
                <Bid/>
            ) : (
                <Winner/>
            )}
        </div>
    )
}