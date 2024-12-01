import React from "react";

interface BlockProps {
  id: string;
  type: "text" | "image";
  content: string;
  onUpdate: (id: string, content: string) => void;
}

const Block: React.FC<BlockProps> = ({ id, type, content, onUpdate }) => {
  return (
    <div
      contentEditable={type === "text"}
      suppressContentEditableWarning
      onBlur={(e) => onUpdate(id, e.currentTarget.textContent || "")}
      className="p-2 border border-gray-300 rounded"
    >
      {content}
    </div>
  );
};

export default Block;
