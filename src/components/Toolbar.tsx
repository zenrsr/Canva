import React from "react";

interface ToolbarProps {
  addElement: (type: "text" | "image") => void;
  exportAsImage: () => void;
  undo: () => void;
  redo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  addElement,
  exportAsImage,
  undo,
  redo,
}) => {
  return (
    <div className="absolute top-4 left-4 flex gap-4" role="toolbar" aria-label="Canvas toolbar">
      <button
        type="button"
        onClick={() => addElement("text")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2"
        aria-label="Add text"
      >
        Add Text
      </button>
      <button
        type="button"
        onClick={undo}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2"
        aria-label="Undo last action"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={redo}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2"
        aria-label="Redo last action"
      >
        Redo
      </button>
      <button
        type="button"
        onClick={exportAsImage}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2"
        aria-label="Export as image"
      >
        Export
      </button>
    </div>
  );
};

export default Toolbar;
