// "use client";

// import React, { useState } from "react";
// import GlobalGraph from "@/app/shared/Graphs";

// export default function Graph() {
//   const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("yearly");

//   const dataSets = {
//     weekly: {
//       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       reviewed: [4, 6, 3, 7, 5, 6, 8],
//       pending: [2, 3, 4, 2, 3, 4, 3],
//     },
//     monthly: {
//       labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//       reviewed: [20, 30, 25, 35],
//       pending: [10, 12, 15, 11],
//     },
//     yearly: {
//       labels: [
//         "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//       ],
//       reviewed: [12, 19, 8, 14, 20, 10, 24, 18, 16, 9, 11, 15],
//       pending: [8, 15, 10, 12, 14, 18, 13, 10, 9, 11, 14, 12],
//     },
//   };

//   const activeData = dataSets[range];

//   return (
//     <div className="pt-5 text-white">
//       <div className="flex gap-6 flex-col lg:flex-row">
        
//         {/* Applications Over Time - Stacked Bar Chart */}
//         <div className="lg:flex-1 bg-[#121315] p-6 rounded-2xl shadow-lg overflow-visible">
//           <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-4 sm:gap-0">
//             <div>
//               <h2 className="text-[16px] leading-5 font-semibold text-white">
//                 Applications Over Time
//               </h2>
//               <div className="flex gap-8 items-center mt-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className="w-[1.5px] h-5 bg-[#EFFC76] rounded-full" />
//                   <span className="text-[#FFFFFFCC]">Reviewed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="w-[1.5px] h-5 bg-[#52525b] rounded-full" />
//                   <span className="text-[#FFFFFFCC]">Pending</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               {(["weekly", "monthly", "yearly"] as const).map((r) => (
//                 <button
//                   key={r}
//                   onClick={() => setRange(r)}
//                   className={`px-4 py-2 cursor-pointer font-regular text-[12px] leading-4 rounded-lg transition ${
//                     range === r
//                       ? "bg-[#EFFC76] text-black"
//                       : "border border-[#FFFFFF1F] text-[#FFFFFFCC] hover:bg-[#252525]"
//                   }`}
//                 >
//                   {r.charAt(0).toUpperCase() + r.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <GlobalGraph
//             type="bar"
//             stacked
//             labels={activeData.labels}
//             datasets={[
//               {
//                 label: "Reviewed",
//                 data: activeData.reviewed,
//                 backgroundColor: "#EFFC76",
//               },
//               {
//                 label: "Pending",
//                 data: activeData.pending,
//                 backgroundColor: "#52525b",
//               },
//             ]}
//             height={280}
//             options={{
//               maintainAspectRatio: false,
//               layout: { padding: { top: 30, bottom: 20 } },
//             }}
//           />
//         </div>

//         {/* Certification Distribution - Doughnut Chart */}
//         <div className="lg:w-[40%] bg-[#121315] rounded-2xl shadow-lg p-5 flex flex-col overflow-visible">
//           <h2 className="text-[16px] leading-5 font-semibold text-white">
//             Certification Distribution
//           </h2>

//           <div className="flex-1 flex items-center w-full h-full justify-center relative overflow-visible">
//             <GlobalGraph
//               type="doughnut"
              
//               labels={["Active", "Pending", "Revoked", "Expired"]}
//               datasets={[
//                 {
//                   label: "Certifications",
//                   data: [400, 360, 190, 250],
//                   backgroundColor: ["#EFFC76", "#52525b", "#fb923c", "#22c55e"],
//                 },
//               ]}
//               centerText={{ label: "Total", value: "1,560" }}
//               height={220}
//               options={{
//                 maintainAspectRatio: false,
//                 layout: {
//                   padding: { top: 40, bottom: 40, left: 20, right: 20 },
//                 },
//                 plugins: {
//                   tooltip: {
//                     enabled: true,
//                     backgroundColor: "#2D2D2D",
//                     bodyColor: "#f9fafb",
//                     titleColor: "#f9fafb",
//                     padding: 12,
//                     displayColors: false,
//                     callbacks: {
//                       label: function (ctx) {
//                        const total = ctx.dataset.data
//   .filter((v): v is number => typeof v === "number")
//   .reduce((a, b) => a + b, 0);

//                         const value = ctx.raw as number;
//                         const percentage = ((value / total) * 100).toFixed(0);
//                         return percentage + "%";
//                       },
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[#FFFFFFCC] font-bold text-[12px] mt-8 place-items-center">
//             <div className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-[#EFFC76] flex-shrink-0" />
//               <span>Active</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-[#52525b] flex-shrink-0" />
//               <span>Pending</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-[#22c55e] flex-shrink-0" />
//               <span>Expired</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-[#fb923c] flex-shrink-0" />
//               <span>Revoked</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import GlobalGraph from "@/app/shared/Graphs";

export default function Graph() {
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("yearly");

  const dataSets = {
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      reviewed: [4, 6, 3, 7, 5, 6, 8],
      pending: [2, 3, 4, 2, 3, 4, 3],
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      reviewed: [20, 30, 25, 35],
      pending: [10, 12, 15, 11],
    },
    yearly: {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      reviewed: [12, 19, 8, 14, 20, 10, 24, 18, 16, 9, 11, 15],
      pending: [8, 15, 10, 12, 14, 18, 13, 10, 9, 11, 14, 12],
    },
  };

  const activeData = dataSets[range];

  return (
    <div className="pt-5 text-white">
      <div className="flex gap-6 flex-col lg:flex-row">
        
        {/* Applications Over Time - Stacked Bar Chart */}
        <div className="lg:flex-1 bg-[#121315] p-6 rounded-2xl shadow-lg overflow-visible">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-4 sm:gap-0">
            <div>
              <h2 className="text-[16px] leading-5 font-semibold text-white">
                Applications Over Time
              </h2>
              <div className="flex gap-8 items-center mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-[1.5px] h-5 bg-[#EFFC76] rounded-full" />
                  <span className="text-[#FFFFFFCC]">Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-[1.5px] h-5 bg-[#52525b] rounded-full" />
                  <span className="text-[#FFFFFFCC]">Pending</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {(["weekly", "monthly", "yearly"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-4 py-2 cursor-pointer font-regular text-[12px] leading-4 rounded-lg transition ${
                    range === r
                      ? "bg-[#EFFC76] text-black"
                      : "border border-[#FFFFFF1F] text-[#FFFFFFCC] hover:bg-[#252525]"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Remove height and options props */}
          <div style={{ height: 280 }}>
            <GlobalGraph
              type="bar"
              stacked
              labels={activeData.labels}
              datasets={[
                {
                  label: "Reviewed",
                  data: activeData.reviewed,
                  backgroundColor: "#EFFC76",
                },
                {
                  label: "Pending",
                  data: activeData.pending,
                  backgroundColor: "#52525b",
                },
              ]}
            />
          </div>
        </div>

        {/* Certification Distribution - Doughnut Chart */}
        <div className="lg:w-[40%] bg-[#121315] rounded-2xl shadow-lg p-5 flex flex-col overflow-visible">
          <h2 className="text-[16px] leading-5 font-semibold text-white">
            Certification Distribution
          </h2>

          <div className="flex-1 flex items-center w-full h-full justify-center relative overflow-visible">
            <div style={{ height: 220 }}>
              <GlobalGraph
                type="doughnut"
                labels={["Active", "Pending", "Revoked", "Expired"]}
                datasets={[
                  {
                    label: "Certifications",
                    data: [400, 360, 190, 250],
                    backgroundColor: ["#EFFC76", "#52525b", "#fb923c", "#22c55e"],
                  },
                ]}
                centerText={{ label: "Total", value: "1,560" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[#FFFFFFCC] font-bold text-[12px] mt-8 place-items-center">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#EFFC76] flex-shrink-0" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#52525b] flex-shrink-0" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#22c55e] flex-shrink-0" />
              <span>Expired</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#fb923c] flex-shrink-0" />
              <span>Revoked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}