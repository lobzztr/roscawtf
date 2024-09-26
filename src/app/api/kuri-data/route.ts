// app/api/kuri-data/route.ts
import { NextResponse } from 'next/server'

// const mockData = {
//   user: {
//     id: 42,
//     name: "anjal",
//     balance: 69420,
//     points: 1010
//   },
//   kuris: [
//     {
//       id: 0,
//       contributions: 2121,
//       prize: 5500,
//       truthTable: {
//         periods: 5,
//         participants: [
//           {
//             name: "anjal",
//             statuses: ['RECEIVED', 'COMPLETED', 'COMPLETED', 'PENDING', 'PENDING']
//           },
//           {
//             name: "nihal",
//             statuses: ['COMPLETED', 'COMPLETED', 'COMPLETED', 'PENDING', 'PENDING']
//           },
//           {
//             name: "julu",
//             statuses: ['COMPLETED', 'COMPLETED', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "john",
//             statuses: ['COMPLETED', 'RECEIVED', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "hashif",
//             statuses: ['COMPLETED', 'COMPLETED', 'PENDING', 'PENDING', 'PENDING']
//           },
//         //   {
//         //     name: "Dhyan",
//         //     statuses: ['COMPLETED', 'COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//         //   }
//         ]
//       }
//     },
//     {
//       id: 1,
//       contributions: 1500,
//       prize: 4000,
//       truthTable: {
//         periods: 6,
//         participants: [
//           {
//             name: "anjal",
//             statuses: ['COMPLETED', 'COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "nihal",
//             statuses: ['COMPLETED', 'COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "julu",
//             statuses: ['COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "john",
//             statuses: ['COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "hashif",
//             statuses: ['COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//           },
//           {
//             name: "dhyan",
//             statuses: ['COMPLETED', 'PENDING', 'PENDING', 'PENDING', 'PENDING', 'PENDING']
//           }
//         ]
//       }
//     }
//   ]
// }

// const mockData = {"user":{"id":1,"name":"amal","balance":0,"points":420},"kuris":[{"id":0,"contribution":1000000000000000000000,"prize":0,"truthTable":{"periods":6,"participants":[{"name":"julu","statuses":["PENDING","PENDING","PENDING","PENDING","PENDING","PENDING"]},{"name":"hashif","statuses":["PAID","PENDING","PENDING","PENDING","PENDING","PENDING"]},{"name":"anjal","statuses":["PAID","PENDING","PENDING","PENDING","PENDING","PENDING"]},{"name":"nihal","statuses":["PAID","PENDING","PENDING","PENDING","PENDING","PENDING"]},{"name":"john","statuses":["PENDING","PENDING","PENDING","PENDING","PENDING","PENDING"]},{"name":"amal","statuses":["PAID","PENDING","PENDING","PENDING","PENDING","PENDING"]}]}}]}

const mockData = {
    user: {
      id: 2,
      name: "user",
      balance: 0,
      points: 420
    },
    kuris: [
      {
        id: 0,
        contribution: 1000,
        prize: 0,
        truthTable: {
          periods: 6,
          participants: [
            {
              name: "julu",
              statuses: ["COMPLETED", "PENDING", "PENDING", "PENDING", "PENDING", "PENDING"]
            },
            {
              name: "hashif",
              statuses: ["COMPLETED", "PENDING", "PENDING", "PENDING", "PENDING", "PENDING"]
            },
            {
              name: "anjal",
              statuses: ["COMPLETED", "PENDING", "PENDING", "PENDING", "PENDING", "PENDING"]
            },
            {
              name: "nihal",
              statuses: ["COMPLETED", "PENDING", "PENDING", "PENDING", "PENDING", "PENDING"]
            },
            {
              name: "john",
              statuses: ["RECEIVED", "PENDING", "PENDING", "PENDING", "PENDING", "PENDING"]
            },
            {
              name: "amal",
              statuses: ["COMPLETED", "PENDING", "PENDING", "PENDING", "PENDING", "PENDING"]
            }
          ]
        }
      }
    ]
  };
  

export async function GET() {
  return NextResponse.json(mockData)
}