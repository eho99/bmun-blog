"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

interface VintageDialProps {
  initialValue?: number;
  initialTitle?: string;
  className?: string;
}

export function VintageDial({
  initialValue = 1,
  initialTitle = "Threat Level",
  className = "",
}: VintageDialProps) {
  const [value, setValue] = useState(initialValue);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dialTitle, setDialTitle] = useState(initialTitle);

  // Labels for each threat level
  const labels = ["Very Low", "Low", "Moderate", "High", "Severe"];

  // Default icons for each threat level
  const defaultIcons = ["☕", "⚠️", "⚡", "☠️", "💣"];
  const [icons, setIcons] = useState<string[]>(defaultIcons);

  // Input state for each icon
  const [iconInputs, setIconInputs] = useState<string[]>(defaultIcons);

  // Toggle for icon customization
  const [showIconEditor, setShowIconEditor] = useState(false);

  // Vintage color palette (more muted tones typical of the era)
  const colors = ["#5A7247", "#9C7D53", "#D5A253", "#BD6B39", "#7D1F1D"];

  const drawDial = (value: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) * 0.35;
    const centerX = width / 2;
    const centerY = height * 0.45; // Position center point higher to create top half-circle

    // Create vintage paper background
    ctx.fillStyle = "#F2E8C9"; // Aged paper color
    ctx.fillRect(0, 0, width, height);

    // Add paper texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const opacity = Math.random() * 0.03;
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Draw ornate border frame (vintage style)
    ctx.strokeStyle = "#7D5A38"; // Brown border
    ctx.lineWidth = 8;
    const margin = 15;

    // Add a distressed look to the border
    const roughness = 1.5;
    ctx.beginPath();

    // Top border with slight roughness
    for (let x = margin; x < width - margin; x += 5) {
      const offsetY = margin + (Math.random() * roughness - roughness / 2);
      ctx.lineTo(x, offsetY);
    }

    // Right border
    for (let y = margin; y < height - margin; y += 5) {
      const offsetX =
        width - margin + (Math.random() * roughness - roughness / 2);
      ctx.lineTo(offsetX, y);
    }

    // Bottom border
    for (let x = width - margin; x > margin; x -= 5) {
      const offsetY =
        height - margin + (Math.random() * roughness - roughness / 2);
      ctx.lineTo(x, offsetY);
    }

    // Left border
    for (let y = height - margin; y > margin; y -= 5) {
      const offsetX = margin + (Math.random() * roughness - roughness / 2);
      ctx.lineTo(offsetX, y);
    }

    ctx.closePath();
    ctx.stroke();

    // Add inner line to frame for decorative effect
    ctx.strokeStyle = "#7D5A38";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      margin + 5,
      margin + 5,
      width - 2 * (margin + 5),
      height - 2 * (margin + 5)
    );

    // Draw vintage background for the dial
    const grd = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius + 20
    );
    grd.addColorStop(0, "rgba(250, 240, 210, 0.9)"); // Light vintage center
    grd.addColorStop(1, "rgba(200, 180, 140, 0.8)"); // Darker vintage edge

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, Math.PI, 0, true);
    ctx.lineTo(centerX + radius + 20, centerY + 40);
    ctx.lineTo(centerX - radius - 20, centerY + 40);
    ctx.closePath();
    ctx.fillStyle = grd;
    ctx.fill();

    // Draw weathered edge effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, Math.PI, 0, true);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(120, 100, 80, 0.5)";
    ctx.stroke();

    // Draw title in vintage style inside the dial box
    ctx.font = "bold italic 22px 'Times New Roman'";
    ctx.fillStyle = "#472D1E"; // Dark brown color typical of vintage instruments
    ctx.textAlign = "center";
    ctx.fillText(dialTitle, centerX, centerY - radius / 2);

    // Draw decorative line under title
    ctx.beginPath();
    ctx.moveTo(centerX - 80, centerY - radius / 2 + 10);
    ctx.lineTo(centerX + 80, centerY - radius / 2 + 10);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#472D1E";
    ctx.stroke();

    // Draw the half-circle dial with brass-like appearance
    const dialGradient = ctx.createLinearGradient(
      centerX - radius,
      centerY,
      centerX + radius,
      centerY
    );
    dialGradient.addColorStop(0, "#A89064"); // Brass-like color
    dialGradient.addColorStop(0.5, "#D2B570");
    dialGradient.addColorStop(1, "#A89064");

    // Main dial arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, true); // Top half-circle
    ctx.lineWidth = 10;
    ctx.strokeStyle = dialGradient;
    ctx.stroke();

    // Draw scale marks and icons
    const scale = 5;
    const angleStep = Math.PI / (scale - 1);

    for (let i = 0; i < scale; i++) {
      const angle = Math.PI - i * angleStep;

      // Calculate positions following the arc
      const tickOuterX = centerX + radius * Math.cos(angle);
      const tickOuterY = centerY + radius * Math.sin(angle);
      const tickInnerX = centerX + (radius - 20) * Math.cos(angle);
      const tickInnerY = centerY + (radius - 20) * Math.sin(angle);

      // Draw tick marks with vintage style
      ctx.beginPath();
      ctx.moveTo(tickOuterX, tickOuterY);
      ctx.lineTo(tickInnerX, tickInnerY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#472D1E"; // Dark brown for vintage look
      ctx.stroke();

      // Draw number in vintage style
      const numberRadius = radius - 30;
      const numberX = centerX + numberRadius * Math.cos(angle);
      const numberY = centerY + numberRadius * Math.sin(angle);

      // Draw small circular plate for number
      ctx.beginPath();
      ctx.arc(numberX, numberY, 15, 0, 2 * Math.PI);
      ctx.fillStyle = "#D2B570"; // Brass color
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#472D1E";
      ctx.stroke();

      // Draw the number
      ctx.font = "bold 14px 'Times New Roman'";
      ctx.fillStyle = "#472D1E";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${i + 1}`, numberX, numberY);

      // Draw icon in vintage style (more centered on arc)
      const iconRadius = radius - 60;
      const iconX = centerX + iconRadius * Math.cos(angle);
      const iconY = centerY + iconRadius * Math.sin(angle);

      // Draw circle for icon with aged brass look
      ctx.beginPath();
      ctx.arc(iconX, iconY, 18, 0, 2 * Math.PI);
      const iconGradient = ctx.createRadialGradient(
        iconX,
        iconY,
        0,
        iconX,
        iconY,
        18
      );
      iconGradient.addColorStop(0, "#D2B570");
      iconGradient.addColorStop(1, "#A89064");
      ctx.fillStyle = iconGradient;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#472D1E";
      ctx.stroke();

      // Draw the icon
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#472D1E";
      ctx.fillText(icons[i], iconX, iconY);
    }

    // Add small vintage-style screws at various points
    const drawScrew = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = "#A89064";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#472D1E";
      ctx.stroke();

      // Add screw slot
      ctx.beginPath();
      ctx.moveTo(x - 2, y);
      ctx.lineTo(x + 2, y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#472D1E";
      ctx.stroke();
    };

    drawScrew(margin + 10, margin + 10);
    drawScrew(width - margin - 10, margin + 10);
    drawScrew(width - margin - 10, height - margin - 10);
    drawScrew(margin + 10, height - margin - 10);

    // Draw triangular pointer with vintage brass style
    const pointerAngle = Math.PI - (value - 1) * angleStep;
    const pointerLength = radius - 30; // Shorter pointer that doesn't extend to icons

    // Calculate triangle points
    const pointerTipX = centerX + pointerLength * Math.cos(pointerAngle);
    const pointerTipY = centerY + pointerLength * Math.sin(pointerAngle);

    const pointerWidth = 8;
    const baseAngle1 = pointerAngle + Math.PI / 2;
    const baseAngle2 = pointerAngle - Math.PI / 2;

    const basePoint1X = centerX + pointerWidth * Math.cos(baseAngle1);
    const basePoint1Y = centerY + pointerWidth * Math.sin(baseAngle1);
    const basePoint2X = centerX + pointerWidth * Math.cos(baseAngle2);
    const basePoint2Y = centerY + pointerWidth * Math.sin(baseAngle2);

    // Draw pointer shadow
    ctx.beginPath();
    ctx.moveTo(basePoint1X + 3, basePoint1Y + 3);
    ctx.lineTo(pointerTipX + 3, pointerTipY + 3);
    ctx.lineTo(basePoint2X + 3, basePoint2Y + 3);
    ctx.closePath();
    ctx.fillStyle = "rgba(50, 30, 10, 0.3)"; // Shadow color
    ctx.fill();

    // Draw triangle pointer
    ctx.beginPath();
    ctx.moveTo(basePoint1X, basePoint1Y);
    ctx.lineTo(pointerTipX, pointerTipY);
    ctx.lineTo(basePoint2X, basePoint2Y);
    ctx.closePath();
    ctx.fillStyle = colors[value - 1]; // Use color that matches the current value
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#472D1E";
    ctx.stroke();

    // Draw a decorative center point with vintage brass look
    const centerGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      15
    );
    centerGradient.addColorStop(0, "#D2B570");
    centerGradient.addColorStop(0.7, "#A89064");
    centerGradient.addColorStop(1, "#7D6B48");

    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    // Add center screw detail
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#472D1E";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX - 3, centerY);
    ctx.lineTo(centerX + 3, centerY);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#D2B570";
    ctx.stroke();

    // Create vintage label box - smaller and positioned better
    const labelBoxWidth = 160;
    const labelBoxHeight = 30;
    const labelBoxX = centerX - labelBoxWidth / 2;
    const labelBoxY = height - margin - labelBoxHeight - 10;

    // Draw vintage label background
    ctx.fillStyle = "#D2B570";
    ctx.fillRect(labelBoxX, labelBoxY, labelBoxWidth, labelBoxHeight);
    ctx.strokeStyle = "#472D1E";
    ctx.lineWidth = 1;
    ctx.strokeRect(labelBoxX, labelBoxY, labelBoxWidth, labelBoxHeight);

    // Add current level text
    ctx.font = "italic 16px 'Times New Roman'";
    ctx.fillStyle = "#472D1E";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      `${labels[value - 1]} ${icons[value - 1]}`,
      centerX,
      labelBoxY + labelBoxHeight / 2
    );
  };

  const handleSaveImage = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        saveAs(
          blob,
          `${dialTitle.toLowerCase().replace(/\s+/g, "-")}-level-${value}.png`
        );
      }
    });
  };

  const updateIcon = (index: number, value: string) => {
    const newIconInputs = [...iconInputs];
    newIconInputs[index] = value;
    setIconInputs(newIconInputs);
  };

  const applyIconChanges = () => {
    setIcons([...iconInputs]);
    setShowIconEditor(false);
  };

  const resetIcons = () => {
    setIconInputs([...defaultIcons]);
    setIcons([...defaultIcons]);
  };

  useEffect(() => {
    drawDial(value);
  }, [value, dialTitle, icons, drawDial]);

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="w-full flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Dial Title:</label>
        <input
          type="text"
          value={dialTitle}
          onChange={(e) => setDialTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          style={{
            backgroundColor: "#F2E8C9",
            borderColor: "#7D5A38",
            color: "#472D1E",
          }}
        />
      </div>

      <div className="relative w-[400px] h-[350px]">
        <canvas
          ref={canvasRef}
          width={400}
          height={350}
          className="border border-gray-200 rounded-md shadow-md"
        />
      </div>

      <div className="space-x-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <Button
            key={num}
            onClick={() => setValue(num)}
            variant="outline"
            className={value === num ? "ring-2 ring-offset-2" : ""}
            style={{
              backgroundColor: "#F2E8C9", // Aged paper color
              borderColor: "#7D5A38", // Brown border
              color: "#472D1E", // Dark brown text
            }}
          >
            {icons[num - 1]} {num}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setShowIconEditor(!showIconEditor)}
          style={{
            backgroundColor: "#F2E8C9",
            borderColor: "#7D5A38",
            color: "#472D1E",
          }}
          className="border"
        >
          {showIconEditor ? "Hide Icon Editor" : "Customize Icons"}
        </Button>

        <Button
          onClick={handleSaveImage}
          style={{
            backgroundColor: "#7D5A38",
            color: "#F2E8C9",
          }}
        >
          Save Image
        </Button>
      </div>

      {showIconEditor && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-amber-50">
          <h3 className="font-bold mb-3 text-center">Customize Level Icons</h3>
          <div className="grid grid-cols-5 gap-2">
            {labels.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-1">{label}</div>
                <input
                  type="text"
                  value={iconInputs[index]}
                  onChange={(e) => updateIcon(index, e.target.value)}
                  className="w-14 h-14 text-center text-2xl border border-gray-300 rounded"
                  maxLength={2}
                  style={{
                    backgroundColor: "#F2E8C9",
                    borderColor: "#7D5A38",
                    color: "#472D1E",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-3 space-x-2">
            <Button
              onClick={applyIconChanges}
              style={{ backgroundColor: "#7D5A38", color: "#F2E8C9" }}
            >
              Apply Changes
            </Button>
            <Button
              onClick={resetIcons}
              style={{ backgroundColor: "#A89064", color: "#F2E8C9" }}
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
