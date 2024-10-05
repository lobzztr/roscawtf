'use client'

import { useState } from 'react'
import { XIcon ,CheckIcon, AlertTriangleIcon, ChevronDownIcon, ChevronRightIcon, TrophyIcon, WalletIcon, Minus, DollarSignIcon, LoaderPinwheelIcon } from "lucide-react"
import { Loop } from './Loop';
// import { ConnectButton } from '@/src/app/thirdweb';
// import { client } from '@/src/app/client';
// import { chain } from '@/src/app/chain';
// import { Enrol } from './Enrol';
import { useActiveAccount, useActiveWallet, useDisconnect, useReadContract } from 'thirdweb/react';
import { contract, erc20Contract } from '@/utils/contract';
import { toEther } from 'thirdweb';

interface ApiResponse {
  user: UserData;
  kuris: KuriData[];
}

interface UserData {
  id: number;
  name: string;
  balance: number;
  points: number;
}

interface KuriData {
  id: number;
  contributions: number;
  prize: number;
  truthTable: TruthTableData;
}

interface TruthTableData {
  periods: number;
  participants: ParticipantData[];
}

interface ParticipantData {
  name: string;
  statuses: ParticipationStatus[];
}

type ParticipationStatus = 'PAID' | 'PENDING' | 'UNPAID' | 'BID' | 'WON';

export function Dashboard({ initialData }: { initialData: ApiResponse }) {

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const walletAddress = account ? account.address : "";

  const { data : balanceOf } = useReadContract({
    contract : erc20Contract,
    method : "balanceOf",
    params : [walletAddress]
  })
  const balan = balanceOf ? toEther(balanceOf).toString() : "0";

  // 
  const [data] = useState<ApiResponse>(initialData)


  const { data : userContributions } = useReadContract({
    contract : contract,
    method : "userContributions",
    params : [walletAddress]
  })

  const { data : participantWonRound } = useReadContract({
    contract : contract,
    method : "participantWonRound",
    params : [walletAddress]
  })
  const { data : prizeMoneyforRound } = useReadContract({
    contract : contract,
    method : "prizeMoneyforRound",
    params : [participantWonRound ? participantWonRound : BigInt(0)]
  })
  const prize = prizeMoneyforRound ? toEther(prizeMoneyforRound).toString() : "0";


  const contribution = userContributions ? toEther(userContributions).toString() : "0";
  const [expandedKuris, setExpandedKuris] = useState<Record<number, boolean>>({})

  const toggleKuri = (kuriId: number) => {
    setExpandedKuris(prev => ({ ...prev, [kuriId]: !prev[kuriId] }))
  }

  const renderTableHeader = (periods: number) => (
    <tr>
      <th className="border border-black p-2"></th>
      {Array.from({ length: periods }, (_, i) => (
        <th key={i} className="border border-black p-2">{i + 1}</th>
      ))}
    </tr>
  )

  const renderTableCell = (status: ParticipationStatus) => {
    switch (status) {
      case 'PAID':
        return <CheckIcon className="w-4 h-4 text-blue-600 mx-auto" />;
      case 'PENDING':
        return <AlertTriangleIcon className="w-4 h-4 text-yellow-500 mx-auto" />;
      case 'BID':
      return <LoaderPinwheelIcon className="w-4 h-4 text-blue-400 mx-auto" />;
      case 'WON':
        return <DollarSignIcon className="w-4 h-4 font-bold text-green-500 mx-auto" />;
      default:
        return <XIcon className="w-4 h-4 text-red-500 mx-auto" />;
    }
  }

  const renderTruthTable = (truthTable: TruthTableData) => (
    <table className="w-full border-collapse border border-black">
      <thead>
        {renderTableHeader(truthTable.periods)}
      </thead>
      <tbody>
        {truthTable.participants.map(participant => (
          <tr key={participant.name}>
            <td className="border border-black p-2">{participant.name}</td>
            {participant.statuses.map((status, index) => (
              <td key={index} className="border border-black p-2 text-center">
                {renderTableCell(status)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  const RenderKuriSection = (kuri: KuriData) => {
    const [expandedLoops, setExpandedLoops] = useState<{ [key: number]: boolean }>({});
  
    const toggleLoop = (id: number) => {
      setExpandedLoops((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle the loop for the specific kuri ID
      }));
    };
  
    return (
      <div key={kuri.id}>
        <div className="w-full border-b-4 border-gray-500 my-1 py-1 flex flex-wrap justify-between items-center overflow-hidden">
          <span className="font-bold text-base">rosca #{kuri.id}</span>
          <button
            className="text-white rounded bg-yellow-400"
            onClick={() => toggleKuri(kuri.id)}
          >
            {expandedKuris[kuri.id] ? (
              <ChevronDownIcon className="h-8 w-8 font-bold" />
            ) : (
              <ChevronRightIcon className="h-8 w-8 font-bold" />
            )}
          </button>
        </div>
  
        {expandedKuris[kuri.id] && (
          <div className="w-full">
            <div className="mb-3 mt-3">
              <div className="flex justify-between">
                <span>contributed :</span>
                <span className="font-bold text-blue-500">{(kuri.contributions + Number(contribution))} IN₹</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>won :</span>
                <span className="font-bold text-red-500">{kuri.prize + Number(prize)} IN₹</span>
              </div>
            </div>
  
            <div className="border-black my-2 py-2 flex flex-wrap justify-end items-center overflow-hidden">
              <div className="font-bold text-blue-600 text-lg px-2">enter</div>
              <button
                className="bg-blue-600 text-white rounded"
                onClick={() => toggleLoop(kuri.id)} // Toggle loop for this specific kuri
              >
                {expandedLoops[kuri.id] ? (
                  <ChevronDownIcon className="h-8 w-8 font-bold" />
                ) : (
                  <ChevronRightIcon className="h-8 w-8 font-bold" />
                )}
              </button>
            </div>
  
            {expandedLoops[kuri.id] && <Loop />} {/* Render Loop component conditionally */}
            {renderTruthTable(kuri.truthTable)}
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className="min-w-[400px] min-h-[800px] font-mono text-sm border-4 border-gray-800 p-6 mx-auto bg-black text-white mt-10 mb-10">
      <div className="flex justify-between items-start mb-6 mt-6">
        <div className="">
          <div className="flex items-center gap-1">
            <span className="w-7 h-7 bg-red-500 rounded-full inline-block"></span>
            <span className="w-7 h-7 px-2 py-1 text-base"> {data.user.id}</span>
          </div>
          <div className="mt-2 font-bold text-base">hello, {data.user.name}</div>
        </div>
        <div className="border-4 border-gray-600 w-8 h-8 mt-2 px-3 flex items-center justify-center rounded">
            <button 
              className="bg-gray-600 text-black text-base font-bold"
              onClick={() => wallet && disconnect(wallet)}
            >
            <Minus className="h-8 w-8 font-bold"/>
            </button> 
            {/* <ConnectButton client={client} chain={chain}/> */}
        </div>
      </div>
      
      <div className="flex flex-col justify-end my-12">
        <div className="flex">
          <span className="text-base text-gray-400 font-bold"><WalletIcon className="w-5 h-5"/>{data.user.balance + Number(balan)} IN₹</span>
        </div>
        <div className="flex mt-4">
          <span className="text-base text-gray-400 font-bold"><TrophyIcon className="w-5 h-5"/>{data.user.points} POINTS</span>
        </div>
      </div>
      
      {data.kuris.map(RenderKuriSection)}
    </div>
  )
}
