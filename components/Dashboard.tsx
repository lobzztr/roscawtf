'use client'

import { useState } from 'react'
import { X ,CheckIcon, AlertTriangleIcon, ChevronDownIcon, ChevronRightIcon, TrophyIcon, WalletIcon, Minus, LoaderPinwheel } from "lucide-react"
import { Loop } from './Loop';
// import { ConnectButton } from '@/src/app/thirdweb';
// import { client } from '@/src/app/client';
// import { chain } from '@/src/app/chain';
// import { Enrol } from './Enrol';
import { useActiveWallet, useDisconnect } from 'thirdweb/react';

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

type ParticipationStatus = 'COMPLETED' | 'PENDING' | 'RECEIVED';

export function Dashboard({ initialData }: { initialData: ApiResponse }) {

    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet();


  const [data] = useState<ApiResponse>(initialData)
  const [expandedKuris, setExpandedKuris] = useState<Record<number, boolean>>({})
  const [isLoopVisible, setIsLoopVisible] = useState<boolean>(false) // State for Loop visibility

  const toggleKuri = (kuriId: number) => {
    setExpandedKuris(prev => ({ ...prev, [kuriId]: !prev[kuriId] }))
  }
  const toggleLoop = () => {
    setIsLoopVisible(prev => !prev) // Toggle Loop visibility
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
      case 'COMPLETED':
        return <CheckIcon className="w-4 h-4 text-blue-600 mx-auto" />;
      case 'PENDING':
        return <AlertTriangleIcon className="w-4 h-4 text-yellow-500 mx-auto" />;
        // return <CalendarClock className="w-4 h-4 text-yellow-500 mx-auto" />;
      case 'RECEIVED':
        // return <span className="font-bold text-red-500">$$</span>;
        return <X className="w-4 h-4 text-red-500 mx-auto" />;
      default:
        return null;
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

  const renderKuriSection = (kuri: KuriData) => (
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
              <span className="font-bold text-blue-500">{kuri.contributions} 1000.00 IN₹</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>cashed out :</span>
              <span className="font-bold text-red-500">{kuri.prize}.00 IN₹</span>
            </div>
          </div>

          <div className="border-black my-2 py-2 px-4 flex flex-wrap justify-center items-center overflow-hidden">
            <div className="font-bold text-blue-600 text-lg px-2">rotate</div>
            <button
              className="bg-blue-600 text-white rounded"
              onClick={toggleLoop} // Update onClick to toggle Loop visibility
            >
              <LoaderPinwheel className="h-7 w-7 border-2 border-blue-500 mx-auto font-bold rounded" />
              {/* <ChevronRightIcon className="h-8 w-8 font-bold" /> */}
            </button>
          </div>
          {isLoopVisible && <Loop />} {/* Render Loop component conditionally */}
          {renderTruthTable(kuri.truthTable)}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-w-[360px] min-h-[720px] font-mono text-sm border-2 border-white p-6 mx-auto bg-black text-white mt-10 mb-10">
      <div className="flex justify-between items-start mb-6 mt-6">
        <div className="px-1">
          <div className="flex items-center gap-1 px-2">
            <span className="w-7 h-7 bg-red-500 rounded-full inline-block"></span>
            <span className="px-2 text-base"> #{data.user.id}</span>
          </div>
          <div className="mt-2 px-2 font-bold text-base">hello, {data.user.name}</div>
        </div>
        <div className="border w-8 h-8 mt-2 px-3 flex items-center justify-center rounded">
            <button 
              className="bg-gray-400 text-black text-base font-bold"
              onClick={() => wallet && disconnect(wallet)}
            >
            <Minus/>
            </button> 
            {/* <ConnectButton client={client} chain={chain}/> */}
        </div>
      </div>
      
      <div className="justify-center my-12 px-10">
        <div className="flex">
          <span className="text-base text-gray-400 font-bold"><WalletIcon className="w-5 h-5"/>{data.user.balance}.00 IN₹</span>
        </div>
        <div className="flex mt-4">
          <span className="text-base text-gray-400 font-bold"><TrophyIcon className="w-5 h-5"/>{data.user.points} POINTS</span>
        </div>
      </div>
      
      {data.kuris.map(renderKuriSection)}
    </div>
  )
}