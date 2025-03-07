"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { saveAs } from "file-saver";

interface IconCopierProps {
  /**
   * Initial count of icons to display
   */
  initialCount?: number;

  /**
   * Maximum count of icons (defines grid size)
   */
  maxCount?: number;

  /**
   * Title for the icon group
   */
  title?: string;

  /**
   * Path to the icon image
   */
  iconSrc?: string;

  /**
   * Alt text for the icon
   */
  iconAlt?: string;

  /**
   * Size of each icon in pixels
   */
  iconSize?: number;

  /**
   * Optional custom class name
   */
  className?: string;

  /**
   * Optional color for empty grid slots
   */
  emptySlotColor?: string;
}

export function IconCopier({
  initialCount = 0,
  maxCount = 15, // Default value, but fully dynamic
  title = "Resource Counter",
  iconSrc = "/icons/resource.png", // Default icon path
  iconAlt = "Resource icon",
  iconSize = 32,
  className = "",
  emptySlotColor = "#e5e5e5",
}: IconCopierProps) {
  const [count, setCount] = useState(initialCount);
  const componentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // For loading our icon into a usable image
  const [iconImage, setIconImage] = useState<HTMLImageElement | null>(null);

  // Always use 5 columns, but rows are dynamic
  const columns = 5;
  const rows = Math.ceil(maxCount / columns);

  // Ensure count doesn't exceed maxCount
  useEffect(() => {
    if (count > maxCount) setCount(maxCount);
  }, [count, maxCount]);

  // Load the icon as an image element when the component mounts or iconSrc changes
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous"; // This is important for security
    img.src = iconSrc;
    img.onload = () => {
      setIconImage(img);
    };
    img.onerror = () => {
      console.error("Error loading icon image");
    };
  }, [iconSrc]);

  // Function to increment count
  const incrementCount = () => {
    if (count < maxCount) setCount(count + 1);
  };

  // Function to decrement count
  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  // Export the component as PNG directly using Canvas API
  const exportAsPng = () => {
    if (!canvasRef.current || !iconImage) return;

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cellSize = iconSize + 16;
      const padding = 20;
      const headerHeight = 40;
      const footerHeight = 30;

      // Set canvas size based on the grid
      canvas.width = columns * cellSize + padding * 2;
      canvas.height =
        rows * cellSize + padding * 2 + headerHeight + footerHeight;

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw title
      ctx.fillStyle = "#000000";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(title, canvas.width / 2, padding + 20);

      // Draw grid
      for (let i = 0; i < maxCount; i++) {
        const isActive = i < count;
        const col = i % columns;
        const row = Math.floor(i / columns);

        const x = padding + col * cellSize;
        const y = padding + headerHeight + row * cellSize;

        // Draw cell
        ctx.fillStyle = isActive ? "#ffffff" : emptySlotColor;
        ctx.fillRect(x, y, cellSize, cellSize);

        // Draw border
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Draw icon if active
        if (isActive && iconImage) {
          const iconX = x + (cellSize - iconSize) / 2;
          const iconY = y + (cellSize - iconSize) / 2;
          ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
        }
      }

      // Draw footer text
      ctx.fillStyle = "#6b7280";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `${count} of ${maxCount} ${count === 1 ? "unit" : "units"}`,
        canvas.width / 2,
        canvas.height - footerHeight / 2
      );

      // Export as PNG
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(
            blob,
            `${title.toLowerCase().replace(/\s+/g, "-")}-${count}.png`
          );
        }
      });
    } catch (error) {
      console.error("Error exporting as PNG:", error);
      alert("Failed to export as PNG. Check console for details.");
    }
  };

  // Create an array of grid cells
  const renderGrid = () => {
    const grid = [];

    for (let i = 0; i < maxCount; i++) {
      const isActive = i < count;

      grid.push(
        <div
          key={i}
          className={`
            flex items-center justify-center 
            border border-gray-300 rounded
            transition-all duration-300
            ${isActive ? "bg-white shadow-sm" : ""}
          `}
          style={{
            width: `${iconSize + 16}px`,
            height: `${iconSize + 16}px`,
            backgroundColor: isActive ? undefined : emptySlotColor,
          }}
        >
          {isActive && (
            <div
              className="relative"
              style={{ width: iconSize, height: iconSize }}
            >
              <Image
                src={iconSrc}
                alt={iconAlt}
                width={iconSize}
                height={iconSize}
                className="object-contain"
                onError={(e) => {
                  // If image fails to load, display a fallback
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='m15 9-6 6'%3E%3C/path%3E%3Cpath d='m9 9 6 6'%3E%3C/path%3E%3C/svg%3E";
                  target.style.opacity = "0.5";
                }}
              />
            </div>
          )}
        </div>
      );
    }

    return grid;
  };

  return (
    <div className={`flex flex-col ${className}`} ref={componentRef}>
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decrementCount}
            disabled={count === 0}
            className="w-8 h-8 p-0 flex items-center justify-center"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#d1d5db",
              color: "#374151",
            }}
          >
            -
          </Button>
          <span className="text-xl font-bold w-8 text-center">{count}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={incrementCount}
            disabled={count === maxCount}
            className="w-8 h-8 p-0 flex items-center justify-center"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#d1d5db",
              color: "#374151",
            }}
          >
            +
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Slider
          value={[count]}
          min={0}
          max={maxCount}
          step={1}
          onValueChange={(value) => setCount(value[0])}
        />
      </div>

      {/* Main display that users interact with */}
      <div
        className="grid gap-2 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gridTemplateRows: `repeat(${rows}, auto)`,
        }}
      >
        {renderGrid()}
      </div>

      {/* Hidden canvas for generating PNG */}
      <canvas ref={canvasRef} className="sr-only" width="500" height="500" />

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          {count} of {maxCount} {count === 1 ? "unit" : "units"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={exportAsPng}
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#d1d5db",
            color: "#374151",
          }}
          disabled={!iconImage}
        >
          Save as PNG
        </Button>
      </div>
    </div>
  );
}

// For vintage styling - optional export
// export function VintageIconCopier(props: IconCopierProps) {
//   const vintageEmptySlot = "#D2B570"; // Brass/gold empty slot color

//   return (
//     <Card
//       className="p-4"
//       style={{ backgroundColor: "#F2E8C9", borderColor: "#7D5A38" }}
//     >
//       <IconCopier
//         {...props}
//         emptySlotColor={vintageEmptySlot}
//         className="text-[#472D1E]"
//       />
//       <style jsx global>{`
//         .slider-root .slider-thumb {
//           background-color: #7d5a38 !important;
//         }
//         .slider-root .slider-track {
//           background-color: #d2b570 !important;
//         }
//       `}</style>
//     </Card>
//   );
// }
