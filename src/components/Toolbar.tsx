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
    <div className="absolute top-4 left-4 flex gap-4">
      <button
        onClick={() => addElement("text")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Text
      </button>
      <button
        onClick={undo}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Undo
      </button>
      <button
        onClick={redo}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Redo
      </button>
      <button
        onClick={exportAsImage}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Export
      </button>
    </div>
  );
};

export default Toolbar;
