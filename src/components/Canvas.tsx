import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import Toolbar from "./Toolbar";

interface CanvasElement {
  id: string;
  type: "text" | "image";
  content: string;
  style: React.CSSProperties;
}

const Canvas: React.FC = () => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [undoStack, setUndoStack] = useState<CanvasElement[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasElement[][]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const saveState = () => {
    setUndoStack((prev) => [...prev, elements]);
    setRedoStack([]); // Clear redo stack when a new action occurs
  };

  const addElement = (type: CanvasElement["type"]) => {
    saveState();
    setElements([
      ...elements,
      {
        id: Date.now().toString(),
        type,
        content: type === "text" ? "Edit me!" : "",
        style: { top: 50, left: 50, position: "absolute" },
      },
    ]);
  };

  const handleDrag = (id: string, e: React.DragEvent<HTMLDivElement>) => {
    saveState();
    const newStyle: React.CSSProperties = {
      top: e.clientY,
      left: e.clientX,
      position: "absolute" as const,
    };
    setElements(
      elements.map((el) => (el.id === id ? { ...el, style: { ...el.style, ...newStyle } } : el))
    );
  };

  const exportAsImage = async () => {
    try {
      if (!canvasRef.current) {
        throw new Error('Canvas reference not found');
      }
      const dataUrl = await toPng(canvasRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "canvas.png";
      link.click();
    } catch (error) {
      console.error('Failed to export image:', error);
      // You might want to add proper error handling UI here
    }
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [...prev, elements]); // Save current state in redo stack
      setUndoStack((prev) => prev.slice(0, prev.length - 1)); // Remove the last undo state
      setElements(prevState);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack((prev) => [...prev, elements]); // Save current state in undo stack
      setRedoStack((prev) => prev.slice(0, prev.length - 1)); // Remove the last redo state
      setElements(nextState);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <Toolbar
        addElement={addElement}
        exportAsImage={exportAsImage}
        undo={undo}
        redo={redo}
      />
      <div ref={canvasRef} className="relative w-full h-full border">
        {elements.map((el) => (
          <div
            key={el.id}
            className="absolute"
            style={el.style}
            draggable
            onDragEnd={(e) => handleDrag(el.id, e)}
          >
            {el.type === "text" && (
              <div contentEditable className="text-black">
                {el.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
