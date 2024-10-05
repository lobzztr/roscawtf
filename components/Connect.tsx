'use client'

import { useEffect, useState, useCallback } from 'react';
import { chain } from "@/src/app/chain";
import { client } from "@/src/app/client";
import { ConnectButton } from "@/src/app/thirdweb";
import { darkTheme } from 'thirdweb/react';
import { contract } from "@/utils/contract";
import { useActiveAccount, useReadContract } from "thirdweb/react";

import { Dashboard } from "@/components/Dashboard";

const customTheme = darkTheme({
  colors: {
    primaryButtonText: "white",
    primaryButtonBg: "darkslategray",
  },
});

export default function Connect() {
  const [data, setData] = useState(null);
  const account = useActiveAccount();
  const wallet = account ? account.address.toString() : "";

  const getData = useCallback(async () => {
    const res = await fetch(`https://rosca-backend-z62i.onrender.com/api/mvp/${wallet}`, { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
  }, [wallet]);  


  const { data: isAllowed } = useReadContract({
    contract: contract,
    method: "isAllowed",
    params: [wallet],
  });

  const { data: isParticipant } = useReadContract({
    contract: contract,
    method: "isParticipant",
    params: [wallet],
  });

  useEffect(() => {
    async function fetchData() {
      if (wallet) {
        try {
          const fetchedData = await getData();
          setData(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  
    fetchData();
  }, [wallet, getData]);

  
  if (data === null) {
    return (
      <div className="min-w-[400px] min-h-[800px] font-mono text-sm bg-black text-white flex flex-col justify-center items-center">
        {!account ? (
          <div className="h-full w-full flex flex-col justify-center items-center space-y-6">
            <h1 className="text-2xl">rosca</h1>
            <p className="text-base text-gray-400">rotating savings & credit protocol</p>
            <div>
              <ConnectButton client={client} chain={chain} theme={customTheme} />
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center space-y-6">
            <h1 className="text-2xl">rosca</h1>
            <p className="text-base text-gray-400">rotating savings & credit protocol</p>
            <div>
              <ConnectButton client={client} chain={chain} />
            </div>
            <p className="text-basic text-green-400">🔑</p>
            <p className="text-xs text-green-500 font-bold">{wallet}</p>
            <p className="text-gray-400">--</p>
            <p className="text-red-500">you do not have</p>
            <p className="text-red-500">access rn, sorry</p>
            <p className="text-gray-400">--</p>
            <p className="text-gray-500">
              dm <a className='font-bold text-white' href="https://x.com/Lobzztr" target="_blank" rel="noopener noreferrer">🦞</a> your 🔑 to sign up!
            </p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {isAllowed && isParticipant ? (
          <Dashboard initialData={data}/>
        ) : isAllowed && !isParticipant ? (
          <Dashboard initialData={data}/>
        ) : (
          <div className="min-w-[400px] min-h-[800px] font-mono text-sm mx-auto bg-black text-white flex flex-col justify-center items-center">
            
          </div>
        )}
      </div>
    );
  
  } 
}
