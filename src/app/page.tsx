// app/page.tsx

import Connect from "@/components/Connect"


export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Connect />
    </main>
  )
}