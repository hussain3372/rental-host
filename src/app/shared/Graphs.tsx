"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  PolarAreaController,
  PieController,
  DoughnutController,
  BubbleController,
  ScatterController,
  RadialLinearScale,
  Title,
  Tooltip,
   LineController,   // <-- add this
  BarController,
  Legend,
  ScriptableContext,
  ChartType,
  Plugin,
  // ChartConfiguration,
  TooltipItem,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import type { ChartOptions, ChartData } from "chart.js";

// Register all chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  PolarAreaController,
  PieController,
  DoughnutController,
  BubbleController,
  ScatterController,
   LineController,   
  BarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

// Custom plugin for vertical line on hover - only for line charts
const verticalLinePlugin: Plugin = {
  id: "verticalLinePlugin",
  afterDraw: (chart) => {
    // Only apply to line charts
    // if (chart.config.type !== "line") return;
    
    const ctx = chart.ctx;
    const tooltip = chart.tooltip;
    
    if (tooltip && tooltip.getActiveElements && tooltip.getActiveElements().length > 0) {
      const activeElements = tooltip.getActiveElements();
      const activePoint = activeElements[0];
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      
      // Get the dataset color for the line
      const dataset = chart.data.datasets[activePoint.datasetIndex];
      const lineColor = dataset.borderColor || '#3b82f6';

      ctx.save();
      ctx.beginPath();
      
      // Draw from top to bottom
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = lineColor + "90"; // Add transparency
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.restore();
    }
  },
};

export type GlobalGraphProps = {
  type?: ChartType;
  labels: string[];
  data: number[] | { x: number; y: number; r?: number }[];
  title?: string;
  height?: number;
  lineColor?: string;
  fillColor?: string;
  gradientColors?: [string, string];
  textColor?: string;
  labelColor?: string;
  valueColor?: string;
  gridColor?: string;
  pointColor?: string;
  tooltipBgColor?: string;
  tooltipTextColor?: string;
  pointRadius?: number;
  pointHoverRadius?: number;
  borderRadius?: number;
  showGrid?: boolean;
  gridStyle?: "l-shape" | "horizontal" | "vertical" | "none";
  animationDuration?: number;
  tension?: number;
  datasetOptions?: Record<string, unknown>;
};

export default function GlobalGraph({
  type = "line",
  labels,
  data,
  title = "",
  height = 400,
  lineColor,
  fillColor,
  gradientColors,
  textColor,
  labelColor,
  valueColor,
  gridColor,
  pointColor,
  tooltipBgColor,
  tooltipTextColor,
  pointRadius = 6,
  pointHoverRadius = 8,
  borderRadius = 8,
  showGrid = true,
  gridStyle = "vertical",
  animationDuration = 1000,
  tension = 0.4,
  datasetOptions = {},
}: GlobalGraphProps) {
//   const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const chartRef = useRef<ChartJS>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Use resolvedTheme to avoid flash of unstyled content
  
  // Default theme-aware colors
  const defaultLineColor = lineColor ||  "#3b82f6" ;
  const defaultTextColor = textColor ||  "#f9fafb" ;
  const defaultLabelColor = labelColor || "#d1d5db";
  const defaultValueColor = valueColor ||  "#e5e7eb";
  const defaultGridColor = gridColor || "#374151";
  const defaultPointColor = pointColor || defaultLineColor;
  const defaultTooltipBgColor = tooltipBgColor || "#374151" ;
  const defaultTooltipTextColor = tooltipTextColor || "#f9fafb" ;

  const chartData = React.useMemo(() => {
    if (!mounted) return { labels: [], datasets: [] };
    
    let background: string | CanvasGradient | ((ctx: ScriptableContext<"line">) => CanvasGradient) = fillColor || "transparent";

    if (type === "line" && gradientColors) {
      background = (ctx: ScriptableContext<"line">) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        g.addColorStop(0, gradientColors[0]);
        g.addColorStop(1, gradientColors[1]);
        return g;
      };
    } else if (type !== "line" && gradientColors) {
      background = gradientColors[0];
    } else if (type !== "line" && fillColor) {
      background = fillColor;
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: defaultLineColor,
          backgroundColor: background,
          pointBackgroundColor: defaultPointColor,
          borderWidth: 2,
          tension: type === "line" ? tension : undefined,
          pointRadius,
          pointHoverRadius,
          borderRadius,
          ...datasetOptions,
        },
      ],
    };
  }, [
    labels,
    data,
    title,
    defaultLineColor,
    defaultPointColor,
    fillColor,
    gradientColors,
    pointRadius,
    pointHoverRadius,
    tension,
    borderRadius,
    datasetOptions,
    type,
    mounted
  ]);

  const options = React.useMemo(() => {
    if (!mounted) return {};

    const xGrid = {
      display: showGrid && (gridStyle === "l-shape" || gridStyle === "horizontal"),
      color: defaultGridColor,
    };
    const yGrid = {
      display: showGrid && (gridStyle === "l-shape" || gridStyle === "vertical"),
      color: defaultGridColor,
    };

    const baseOptions: ChartOptions<ChartType> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: defaultTextColor,
            usePointStyle: true,
            padding: 20,
          },
        },
        title: {
          display: !!title,
          text: title,
          color: defaultTextColor,
          font: { size: 18, weight: 'bold' },
          padding: { top: 10, bottom: 30 },
        },
        tooltip: {
          titleColor: defaultTooltipTextColor,
          bodyColor: defaultTooltipTextColor,
          backgroundColor: defaultTooltipBgColor,
          titleFont: { weight: "bold" },
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: function (context: TooltipItem<ChartType>) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            },
          },
        },
      },
      animation: { duration: animationDuration },
    };

    // Conditional tooltip / hover mode
    if (type === "line") {
      baseOptions.interaction = {
        mode: "index",
        intersect: false, // tooltip even away from the point
      };
    } else {
      baseOptions.interaction = {
        mode: "nearest",
        intersect: true, // tooltip only when exactly on point/bar/slice
      };
    }

    if (type === "line" || type === "bar") {
      baseOptions.scales = {
        x: {
          grid: xGrid,
          ticks: { color: defaultLabelColor },
        },
        y: {
          grid: yGrid,
          ticks: { color: defaultValueColor },
        },
      };
    }

    if (type === "radar") {
      baseOptions.scales = {
        r: {
          grid: { color: defaultGridColor },
          angleLines: { color: defaultGridColor },
          pointLabels: { color: defaultLabelColor },
          ticks: {
            color: defaultValueColor,
            backdropColor: "transparent",
          },
        },
      };
    }

    return baseOptions;
  }, [
    defaultTextColor,
    defaultLabelColor,
    defaultValueColor,
    defaultGridColor,
    defaultTooltipBgColor,
    defaultTooltipTextColor,
    title,
    showGrid,
    gridStyle,
    animationDuration,
    type,
    mounted,
  ]);

  if (!mounted) {
    return (
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          height,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading chart...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        height,
        marginBottom: 30,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Chart
        ref={chartRef}
        type={type}
        data={chartData as ChartData<typeof type>}
        options={options as ChartOptions<typeof type>}
        height={height}
        plugins={type === "line" ? [verticalLinePlugin] : []}
      />
    </div>
  );
}