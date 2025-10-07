// "use client";

// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineController,
//   BarController,
//   DoughnutController,
//   Plugin,
//   ChartType,
//   ChartData,
//   ChartOptions,
//   TooltipItem,
//   Element,
// } from "chart.js";
// import { Chart } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   LineController,
//   BarController,
//   DoughnutController,
//   Title,
//   Tooltip,
//   Legend
// );

// export type GlobalGraphProps = {
//   type?: ChartType;
//   labels: string[];
//   datasets: {
//     label: string;
//     data: number[];
//     backgroundColor?: string | string[];
//     borderColor?: string;
//   }[];
//   height?: number;
//   stacked?: boolean;
//   centerText?: { label: string; value: string };
// };

// interface BarElementExtended extends Element {
//   x: number;
//   y: number;
//   base: number;
//   width: number;
// }

// interface ArcElementExtended extends Element {
//   startAngle: number;
//   endAngle: number;
//   outerRadius: number;
// }

// export default function GlobalGraph({
//   type = "bar",
//   labels,
//   datasets,
//   stacked = false,
//   centerText,
// }: GlobalGraphProps) {
//   const GAP = 8;
//   const RADIUS = 8;

//   const drawRoundedRect = (
//     ctx: CanvasRenderingContext2D,
//     x: number,
//     y: number,
//     width: number,
//     height: number,
//     radii: { tl: number; tr: number; br: number; bl: number }
//   ) => {
//     ctx.beginPath();
//     ctx.moveTo(x + radii.tl, y);
//     ctx.lineTo(x + width - radii.tr, y);
//     if (radii.tr > 0) {
//       ctx.quadraticCurveTo(x + width, y, x + width, y + radii.tr);
//     }
//     ctx.lineTo(x + width, y + height - radii.br);
//     if (radii.br > 0) {
//       ctx.quadraticCurveTo(x + width, y + height, x + width - radii.br, y + height);
//     }
//     ctx.lineTo(x + radii.bl, y + height);
//     if (radii.bl > 0) {
//       ctx.quadraticCurveTo(x, y + height, x, y + height - radii.bl);
//     }
//     ctx.lineTo(x, y + radii.tl);
//     if (radii.tl > 0) {
//       ctx.quadraticCurveTo(x, y, x + radii.tl, y);
//     }
//     ctx.closePath();
//     ctx.fill();
//   };

//   const stackedBarGapPlugin: Plugin<"bar"> = {
//     id: "stackedBarGap",
//     beforeDatasetsDraw(chart) {
//       if (stacked && type === "bar" && datasets.length > 1) {
//         const meta0 = chart.getDatasetMeta(0);
//         const meta1 = chart.getDatasetMeta(1);

//         meta0.data.forEach((bar: BarElementExtended) => {
//           const barExtended = bar as BarElementExtended & { options?: { backgroundColor?: string } };
//           barExtended.options = barExtended.options || {};
//           barExtended.options.backgroundColor = 'rgba(0,0,0,0)';
//         });

//         meta1.data.forEach((bar: BarElementExtended) => {
//           const barExtended = bar as BarElementExtended & { options?: { backgroundColor?: string } };
//           barExtended.options = barExtended.options || {};
//           barExtended.options.backgroundColor = 'rgba(0,0,0,0)';
//         });
//       }
//     },
//     afterDatasetsDraw(chart) {
//       if (stacked && type === "bar" && datasets.length > 1) {
//         const ctx = chart.ctx;
//         const meta0 = chart.getDatasetMeta(0);
//         const meta1 = chart.getDatasetMeta(1);

//         meta0.data.forEach((bar: BarElementExtended, index: number) => {
//           const topBar = meta1.data[index] as BarElementExtended;

//           if (bar && topBar && bar.y !== bar.base && topBar.y !== topBar.base) {
//             const x = bar.x;
//             const width = bar.width;
//             const bottomBarY = bar.y;
//             const bottomBarHeight = bar.base - bar.y;
//             const topBarY = topBar.y;
//             const topBarBottom = topBar.base;
//             const topBarHeight = topBarBottom - topBarY - GAP;

//             ctx.save();

//             ctx.fillStyle = datasets[0].backgroundColor as string;
//             drawRoundedRect(
//               ctx,
//               x - width / 2,
//               bottomBarY,
//               width,
//               bottomBarHeight,
//               { tl: RADIUS, tr: RADIUS, br: RADIUS, bl: RADIUS }
//             );

//             ctx.fillStyle = datasets[1].backgroundColor as string;
//             drawRoundedRect(
//               ctx,
//               x - width / 2,
//               topBarY,
//               width,
//               topBarHeight,
//               { tl: RADIUS, tr: RADIUS, br: RADIUS, bl: RADIUS }
//             );

//             ctx.restore();
//           }
//         });
//       }
//     },
//   };

//   const centerTextPlugin: Plugin<"doughnut"> = {
//     id: "centerTextPlugin",
//     afterDraw: (chart) => {
//       if (type === "doughnut" && centerText && chart.chartArea) {
//         const { ctx, chartArea } = chart;
//         const { left, right, top, bottom } = chartArea;
//         const centerX = (left + right) / 2;
//         const centerY = (top + bottom) / 2;

//         ctx.save();

//         // Calculate text dimensions for background
//         ctx.font = "400 14px sans-serif";
//         const titleWidth = ctx.measureText(centerText.label).width;
//         ctx.font = "700 16px sans-serif";
//         const valueWidth = ctx.measureText(centerText.value).width;

//         const backgroundWidth = 100;
//         const backgroundHeight = 100;

//         // Calculate corner radius for full roundness (50% of height)
//         const cornerRadius = backgroundHeight / 2;

//         // Draw background with #2D2D2D color and full roundness
//         ctx.fillStyle = "#2D2D2D";
//         ctx.beginPath();
//         ctx.roundRect(
//           centerX - backgroundWidth / 2,
//           centerY - backgroundHeight / 2,
//           backgroundWidth,
//           backgroundHeight,
//           cornerRadius
//         );
//         ctx.fill();

//         // Draw title text
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillStyle = "#ffffff";
//         ctx.font = "400 14px sans-serif";
//         ctx.fillText(centerText.label, centerX, centerY - 15);

//         // Draw value text
//         ctx.fillStyle = "#ffffff";
//         ctx.font = "700 16px sans-serif";
//         ctx.fillText(centerText.value, centerX, centerY + 15);

//         ctx.restore();
//       }
//     },
//   };

//   const doughnutHoverLabelPlugin: Plugin<"doughnut"> = {
//     id: "doughnutHoverLabel",
//     afterDraw: (chart) => {
//       if (type === "doughnut") {
//         const activeElements = chart.getActiveElements();

//         if (activeElements.length > 0) {
//           const { ctx, chartArea } = chart;
//           const { left, right, top, bottom } = chartArea;
//           const centerX = (left + right) / 2;
//           const centerY = (top + bottom) / 2;

//           activeElements.forEach((element) => {
//             const datasetIndex = element.datasetIndex;
//             const index = element.index;
//             const dataset = chart.data.datasets[datasetIndex];
//             const value = dataset.data[index] as number;

//             const total = (dataset.data as number[]).reduce((acc, val) => acc + val, 0);
//             const percentage = Math.round((value / total) * 100);

//             const meta = chart.getDatasetMeta(datasetIndex);
//             const arc = meta.data[index] as ArcElementExtended;

//             const startAngle = arc.startAngle;
//             const endAngle = arc.endAngle;
//             const midAngle = (startAngle + endAngle) / 2;
//             const outerRadius = arc.outerRadius;

//             const arcX = centerX + Math.cos(midAngle) * outerRadius;
//             const arcY = centerY + Math.sin(midAngle) * outerRadius;

//             const labelDistance = outerRadius + 45;
//             const labelX = centerX + Math.cos(midAngle) * labelDistance;
//             const labelY = centerY + Math.sin(midAngle) * labelDistance;

//             const colors = dataset.backgroundColor as string[];
//             const segmentColor = Array.isArray(colors) ? colors[index] : colors;

//             ctx.save();

//             ctx.strokeStyle = segmentColor;
//             ctx.lineWidth = 2;
//             ctx.beginPath();
//             ctx.moveTo(arcX, arcY);
//             ctx.lineTo(labelX, labelY);
//             ctx.stroke();

//             ctx.fillStyle = segmentColor;
//             ctx.beginPath();
//             ctx.arc(labelX, labelY, 6, 0, 2 * Math.PI);
//             ctx.fill();

//             ctx.fillStyle = "#ffffff";
//             ctx.font = "700 15px sans-serif";
//             ctx.textAlign = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? "right" : "left";
//             ctx.textBaseline = "middle";
//             const textOffset = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? -14 : 14;
//             ctx.fillText(`${percentage}%`, labelX + textOffset, labelY);

//             ctx.restore();
//           });
//         }
//       }
//     },
//   };

//   const chartData: ChartData<ChartType> = {
//     labels,
//     datasets: datasets.map((ds) => ({
//       ...ds,
//       borderWidth: 0,
//       borderSkipped: false as const,
//       barThickness: type === "bar" ? 41 : undefined,
//       // For doughnut charts, set the weight to control thickness
//       weight: type === "doughnut" ? 500 : undefined,
//     })),
//   };

//   const baseOptions: ChartOptions<ChartType> = {
//     responsive: true,
//     maintainAspectRatio: false, 
//     plugins: {
//       legend: {
//         display: false,
//         position: "bottom",
//         labels: {
//           color: "#fff",
//           font: { size: 12 },
//         },
//         // ✅ Disable dataset hiding on legend click
//         onClick: () => null,
//       },
//       tooltip: {
//         enabled: true,
//         callbacks: {
//           label: function (tooltipItem: TooltipItem<ChartType>) {
//             return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
//           },
//         },
//       },
//     },
//     layout: {
//       padding: {
//         top: 40,
//         bottom: 40,
//       },
//     },
//   };

//   if (type === "bar") {
//     (baseOptions.scales as ChartOptions<"bar">["scales"]) = {
//       x: {
//         stacked,
//         grid: { 
//           display: false,
//         },
//         ticks: { 
//           color: "#9ca3af",
//           font: { size: 12 },
//           padding: 8,
//         },
//         border: { 
//           display: false
//         },
//       },
//       y: {
//         stacked,
//         grid: { 
//           display: false,
//         },
//         ticks: { 
//           display: false,
//         },
//         border: { 
//           display: false
//         },
//       },
//     };
//   }

//   if (type === "doughnut") {
//     (baseOptions as ChartOptions<"doughnut">).cutout = '60%';
//     (baseOptions as ChartOptions<"doughnut">).radius = '100%';
//     (baseOptions as ChartOptions<"doughnut">).spacing = 15;
//     (baseOptions as ChartOptions<"doughnut">).rotation = -90;
//     (baseOptions as ChartOptions<"doughnut">).circumference = 360;
//     (baseOptions.elements as ChartOptions<"doughnut">["elements"]) = {
//       arc: {
//         borderWidth: 0,
//         borderAlign: 'center',
//         borderRadius: 8,
//       }
//     };
//   }

//   const plugins: Plugin<ChartType>[] = [];
//   if (type === "doughnut" && centerText) {
//     plugins.push(centerTextPlugin);
//   }
//   if (type === "doughnut") {
//     plugins.push(doughnutHoverLabelPlugin);
//   }
//   if (type === "bar" && stacked) {
//     plugins.push(stackedBarGapPlugin);
//   }

//   return (
//     <div style={{ height: "300px", width: "100%" }}>
//       <Chart
//         type={type}
//         data={chartData}
//         options={baseOptions}
//         plugins={plugins}
//       />
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  DoughnutController,
  Plugin,
  ChartType,
  ChartData,
  ChartOptions,
  TooltipItem,
  Chart,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Element,
} from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend
);

export type GlobalGraphProps = {
  type?: ChartType;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
  stacked?: boolean;
  centerText?: { label: string; value: string };
};

export default function GlobalGraph({
  type = "bar",
  labels,
  datasets,
  stacked = false,
  centerText,
}: GlobalGraphProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Run once on mount
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const RADIUS = isSmallScreen ? 3 : 8;
  const GAP = 8;

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radii: { tl: number; tr: number; br: number; bl: number }
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radii.tl, y);
    ctx.lineTo(x + width - radii.tr, y);
    if (radii.tr > 0) {
      ctx.quadraticCurveTo(x + width, y, x + width, y + radii.tr);
    }
    ctx.lineTo(x + width, y + height - radii.br);
    if (radii.br > 0) {
      ctx.quadraticCurveTo(x + width, y + height, x + width - radii.br, y + height);
    }
    ctx.lineTo(x + radii.bl, y + height);
    if (radii.bl > 0) {
      ctx.quadraticCurveTo(x, y + height, x, y + height - radii.bl);
    }
    ctx.lineTo(x, y + radii.tl);
    if (radii.tl > 0) {
      ctx.quadraticCurveTo(x, y, x + radii.tl, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  const stackedBarGapPlugin: Plugin<"bar"> = {
    id: "stackedBarGap",
    beforeDatasetsDraw(chart) {
      if (stacked && type === "bar" && datasets.length > 1) {
        const meta0 = chart.getDatasetMeta(0);
        const meta1 = chart.getDatasetMeta(1);

        meta0.data.forEach((bar) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const barAny = bar as any;
          barAny.options = barAny.options || {};
          barAny.options.backgroundColor = 'rgba(0,0,0,0)';
        });

        meta1.data.forEach((bar) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const barAny = bar as any;
          barAny.options = barAny.options || {};
          barAny.options.backgroundColor = 'rgba(0,0,0,0)';
        });
      }
    },
    afterDatasetsDraw(chart) {
      if (stacked && type === "bar" && datasets.length > 1) {
        const ctx = chart.ctx;
        const meta0 = chart.getDatasetMeta(0);
        const meta1 = chart.getDatasetMeta(1);

        meta0.data.forEach((bar, index: number) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const barAny = bar as any;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const topBar = meta1.data[index] as any;

          if (barAny && topBar && barAny.y !== barAny.base && topBar.y !== topBar.base) {
            const x = barAny.x;
            const width = barAny.width;
            const bottomBarY = barAny.y;
            const bottomBarHeight = barAny.base - barAny.y;
            const topBarY = topBar.y;
            const topBarBottom = topBar.base;
            const topBarHeight = topBarBottom - topBarY - GAP;

            ctx.save();

            ctx.fillStyle = datasets[0].backgroundColor as string;
            drawRoundedRect(
              ctx,
              x - width / 2,
              bottomBarY,
              width,
              bottomBarHeight,
              { tl: RADIUS, tr: RADIUS, br: RADIUS, bl: RADIUS }
            );

            ctx.fillStyle = datasets[1].backgroundColor as string;
            drawRoundedRect(
              ctx,
              x - width / 2,
              topBarY,
              width,
              topBarHeight,
              { tl: RADIUS, tr: RADIUS, br: RADIUS, bl: RADIUS }
            );

            ctx.restore();
          }
        });
      }
    },
  };

  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerTextPlugin",
    afterDraw: (chart) => {
      if (type === "doughnut" && centerText && chart.chartArea) {
        const { ctx, chartArea } = chart;
        const { left, right, top, bottom } = chartArea;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        ctx.save();

        // Calculate text dimensions for background
        ctx.font = "400 14px sans-serif";
        ctx.measureText(centerText.label).width;
        ctx.font = "700 16px sans-serif";
        ctx.measureText(centerText.value).width;

        const backgroundWidth = 100;
        const backgroundHeight = 100;

        // Calculate corner radius for full roundness (50% of height)
        const cornerRadius = backgroundHeight / 2;

        // Draw background with #2D2D2D color and full roundness
        ctx.fillStyle = "#2D2D2D";
        ctx.beginPath();
        ctx.roundRect(
          centerX - backgroundWidth / 2,
          centerY - backgroundHeight / 2,
          backgroundWidth,
          backgroundHeight,
          cornerRadius
        );
        ctx.fill();

        // Draw title text
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.font = "400 14px sans-serif";
        ctx.fillText(centerText.label, centerX, centerY - 15);

        // Draw value text
        ctx.fillStyle = "#ffffff";
        ctx.font = "700 16px sans-serif";
        ctx.fillText(centerText.value, centerX, centerY + 15);

        ctx.restore();
      }
    },
  };

  const doughnutHoverLabelPlugin: Plugin<"doughnut"> = {
    id: "doughnutHoverLabel",
    afterDraw: (chart) => {
      if (type === "doughnut") {
        const activeElements = chart.getActiveElements();

        if (activeElements.length > 0) {
          const { ctx, chartArea } = chart;
          const { left, right, top, bottom } = chartArea;
          const centerX = (left + right) / 2;
          const centerY = (top + bottom) / 2;

          activeElements.forEach((element) => {
            const datasetIndex = element.datasetIndex;
            const index = element.index;
            const dataset = chart.data.datasets[datasetIndex];
            const value = dataset.data[index] as number;

            const total = (dataset.data as number[]).reduce((acc, val) => acc + val, 0);
            const percentage = Math.round((value / total) * 100);

            const meta = chart.getDatasetMeta(datasetIndex);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const arc = meta.data[index] as any;

            const startAngle = arc.startAngle;
            const endAngle = arc.endAngle;
            const midAngle = (startAngle + endAngle) / 2;
            const outerRadius = arc.outerRadius;

            const arcX = centerX + Math.cos(midAngle) * outerRadius;
            const arcY = centerY + Math.sin(midAngle) * outerRadius;

            const labelDistance = outerRadius + 45;
            const labelX = centerX + Math.cos(midAngle) * labelDistance;
            const labelY = centerY + Math.sin(midAngle) * labelDistance;

            const colors = dataset.backgroundColor as string[];
            const segmentColor = Array.isArray(colors) ? colors[index] : colors;

            ctx.save();

            ctx.strokeStyle = segmentColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(arcX, arcY);
            ctx.lineTo(labelX, labelY);
            ctx.stroke();

            ctx.fillStyle = segmentColor;
            ctx.beginPath();
            ctx.arc(labelX, labelY, 6, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = "700 15px sans-serif";
            ctx.textAlign = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? "right" : "left";
            ctx.textBaseline = "middle";
            const textOffset = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? -14 : 14;
            ctx.fillText(`${percentage}%`, labelX + textOffset, labelY);

            ctx.restore();
          });
        }
      }
    },
  };

  // ✅ Responsive chart data
  const chartData: ChartData<ChartType> = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      borderWidth: 0,
      borderSkipped: false as const,
      // Responsive bar thickness
      barThickness: type === "bar" ? (isSmallScreen ? 11 : 41) : undefined,
      weight: type === "doughnut" ? 500 : undefined,
    })),
  };

  const baseOptions: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "#fff",
          font: { size: 12 },
        },
        // ✅ Disable dataset hiding on legend click
        onClick: () => null,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (tooltipItem: TooltipItem<any>) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 40,
        bottom: 40,
      },
    },
  };

  if (type === "bar") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions as any).scales = {
      x: {
        stacked,
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 12 },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
      y: {
        stacked,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    };


  }

  if (type === "doughnut") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions as any).cutout = '60%';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions as any).radius = '100%';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions as any).spacing = 15;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions as any).rotation = -90;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions as any).circumference = 360;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (baseOptions.elements as any) = {
      arc: {
        borderWidth: 0,
        borderAlign: 'center',
        borderRadius: RADIUS, // ✅ dynamic radius
      },
    };

  }

  const plugins = [];
  if (type === "doughnut" && centerText) {
    plugins.push(centerTextPlugin);
  }
  if (type === "doughnut") {
    plugins.push(doughnutHoverLabelPlugin);
  }
  if (type === "bar" && stacked) {
    plugins.push(stackedBarGapPlugin);
  }

  return (
  <div style={{ height: "300px", width: "100%" }}>
    <ReactChart
      key={isSmallScreen ? "small" : "large"} // ✅ Force re-render on screen size change
      type={type}
      data={chartData}
      options={baseOptions}
      plugins={plugins}
    />
  </div>
);

}