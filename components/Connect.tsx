'use client'

import { useEffect, useState } from 'react';
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

async function getData() {
  const res = await fetch('https://roscawtf.vercel.app/api/kuri-data', { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Connect() {
  const [data, setData] = useState(null);
  const account = useActiveAccount();
  const wallet = account ? account.address : "";

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
  }, [wallet]);

  if (account === undefined || data === null) {
    return (
      <div className="min-w-[360px] min-h-[720px] font-mono text-sm border-2 border-white p-6 mx-auto bg-black text-white mt-10 mb-10 flex flex-col justify-center items-center">
        <div className="h-full flex flex-col justify-center items-center space-y-6">
          <h1 className="text-2xl">rosca</h1>
          <p className="text-base text-gray-400">rotating savings & credit protocol</p>
          <div>
            <ConnectButton client={client} chain={chain} theme={customTheme} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isAllowed && isParticipant ? (
        <Dashboard initialData={data}/>
      ) : isAllowed && !isParticipant ? (
        <Dashboard initialData={data}/>
      ) : (
        <div className="min-w-[360px] min-h-[720px] font-mono text-sm border-2 border-grey p-6 mx-auto bg-black text-white mt-10 mb-10 flex flex-col justify-center items-center">
          <div className="h-full flex flex-col justify-center items-center space-y-6">
            <h1 className="text-2xl">rosca</h1>
            <p className="text-base text-gray-400">rotating savings & credit protocol</p>
            <div>
              <ConnectButton client={client} chain={chain} />
            </div>
            <p className="text-red-500">connected wallet does not </p>
            <p className="text-red-500">have an active membership rn</p>
            <p className="text-gray-400">--</p>
            <p className="text-gray-500">
              dm <a className='font-bold text-white' href="https://x.com/Lobzztr" target="_blank" rel="noopener noreferrer">lobzztr</a> to sign up!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
