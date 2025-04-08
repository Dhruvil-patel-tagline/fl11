import CreateNewFolderSharpIcon from "@mui/icons-material/CreateNewFolderSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RefreshIcon from "@mui/icons-material/Refresh";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import TreeNode from "./TreeNode";
import { addNode, updateNodeName, deleteNode } from "./utils";
import "./css/sidebar.css";
import { useEffect, useState } from "react";
const initialData = [
  {
    type: "folder",
    name: "public",
    children: [],
  },
  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [{ type: "file", name: "App.jsx" }],
      },
    ],
  },
  { type: "file", name: ".gitignore" },
];

const Sidebar = ({ onPathChange }) => {
  const [treeData, setTreeData] = useState(initialData);
  const [contextMenu, setContextMenu] = useState(null);
  const [activePath, setActivePath] = useState("");

  const handleContextMenu = (e, path, type) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      path: path,
      type: type,
    });
  };


  const handleDelete = (pathToDelete) => {
    const updatedTree = deleteNode(treeData, pathToDelete);
    setTreeData(updatedTree);
  };

  const handleCreate = (type) => {
    const name = prompt(`Enter ${type} name`);
    if (!name) return;
    const newNode = { type, name };
    const updatedTree = addNode(treeData, contextMenu.path, newNode);
    setTreeData(updatedTree);
    handleCloseContextMenu();
  };

  const handleRename = () => {
    const newName = prompt("Enter new name");
    if (!newName) return;
    const updatedTree = updateNodeName(treeData, contextMenu.path, newName);
    setTreeData(updatedTree);
    handleCloseContextMenu();
  };




  const handleCloseContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="sidebar-root" >
        {contextMenu && (
          <div
            className="context-menu"
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
            <div onClick={() => {
              handleDelete(contextMenu.path);
              handleCloseContextMenu();
            }}>Delete</div>

            <div onClick={handleRename}>Rename</div>

            {contextMenu.type === "folder" && (
              <>
                <div onClick={() => handleCreate("file")}>Create File</div>
                <div onClick={() => handleCreate("folder")}>Create Folder</div>
              </>
            )}
          </div>
        )}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "250px",
              }}
            >
              <span>FOLDER-STRUCTURE</span>
              <span>
                <CreateNewFolderSharpIcon />
                <RefreshIcon sx={{ color: "black" }} />
                <MoreHorizIcon />
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {treeData.map((item) => (
              <TreeNode
                key={item.name}
                node={item}
                path=""
                onPathChange={onPathChange}
                activePath={activePath}
                setActivePath={setActivePath}
                onDelete={handleDelete}
                onContextMenu={handleContextMenu}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
