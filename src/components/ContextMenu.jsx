import React from "react";

const ContextMenu = ({
  contextMenu,
  handleCloseContextMenu,
  handleDelete,
  handleRename,
  handleCreate,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: contextMenu.y,
        left: contextMenu.x,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "5px",
        zIndex: 999,
      }}
    >
      <div
        onClick={() => {
          handleDelete(contextMenu.path);
          handleCloseContextMenu();
        }}
      >
        Delete
      </div>
      <div onClick={handleRename}>Rename</div>
      {contextMenu.type === "folder" && (
        <>
          <div onClick={() => handleCreate("file")}>Create File</div>
          <div onClick={() => handleCreate("folder")}>Create Folder</div>
        </>
      )}
    </div>
  );
};

export default ContextMenu;
