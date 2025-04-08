import CreateNewFolderSharpIcon from "@mui/icons-material/CreateNewFolderSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import "./css/sidebar.css";
import TreeNode from "./TreeNode";
import { addNode, deleteNode, sortData, updateNodeName } from "./utils";
import { initialData } from "./utils/data";

const Sidebar = ({ onPathChange }) => {
  const [treeData, setTreeData] = useState(() => sortData(initialData));
  const [expand, setExpand] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [activePath, setActivePath] = useState("");
  const [edit, setEdit] = useState({ path: "", isEdit: false, type: "" });
  const [text, setText] = useState("");
  const [renameMode, setRenameMode] = useState({ name: "", type: "" });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpand(isExpanded ? panel : false);
  };

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
    if (contextMenu.path) {
      const res = contextMenu.path.split("/");
    }
    const name = prompt(`Enter ${type} name`);
    if (!name) return;
    const newNode = { type, name };
    const updatedTree = addNode(treeData, contextMenu?.path, newNode);
    setTreeData(updatedTree);
    handleCloseContextMenu();
  };

  const handleCreateFolder = (e) => {
    e.stopPropagation();
    if (activePath) {
      const res = activePath.split("/");
      setEdit({ path: res[res.length - 1], isEdit: true, type: "folder" });
      return;
    }
    setEdit({ path: activePath, isEdit: true, type: "folder" });
  };

  const handleCreateFile = (e) => {
    e.stopPropagation();
    if (activePath) {
      const res = activePath.split("/");
      setEdit({ path: res[res.length - 1], isEdit: true, type: "file" });
      return;
    }
    setEdit({ path: activePath, isEdit: true, type: "file" });
  };

  const handleRename = () => {
    const newName = prompt("Enter new name");
    if (contextMenu.path) {
      const res = contextMenu.path.split("/");
      setEdit(res[res.length - 1]);
    }
    if (!newName) return;
    console.log(contextMenu.path);
    const updatedTree = updateNodeName(treeData, contextMenu.path, newName);
    setTreeData(updatedTree);
    handleCloseContextMenu();
  };

  const handleCloseContextMenu = () => setContextMenu(null);

  const handleSubmit = (e, path) => {
    e.stopPropagation();
    e.preventDefault();
    const newNode = { type: edit.type, name: text };
    if (!edit.path && text.trim()) {
      const updatedTree = addNode(treeData, "", newNode);
      setTreeData(updatedTree);
    } else if (edit.type && text.trim()) {
      const updatedTree = addNode(treeData, `/${path}`, newNode);
      setTreeData(updatedTree);
    }
    setEdit({ path: "", isEdit: false, type: "" });
    setText("");
  };

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="sidebar-root" style={{ height: "97vh" }}>
        {contextMenu && (
          <ContextMenu
            contextMenu={contextMenu}
            handleCloseContextMenu={handleCloseContextMenu}
            handleDelete={handleDelete}
            handleRename={handleRename}
            handleCreate={handleCreate}
          />
        )}
        <Accordion expanded={expand} onChange={handleChange("panel1")}>
          <AccordionSummary
            onClick={() => {
              setActivePath("");
              onPathChange("");
            }}
            onContextMenu={handleCloseContextMenu}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            component={Box}
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
              {expand && (
                <span>
                  <CreateNewFolderSharpIcon onClick={handleCreateFolder} />
                  <NoteAddIcon fontSize="small" onClick={handleCreateFile} />
                </span>
              )}
            </div>
          </AccordionSummary>
          {edit.isEdit && !edit.path && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={(e) => handleSubmit(e, "")}></button>
            </form>
          )}
          <AccordionDetails
            style={{ minHeight: "90vh" }}
            onContextMenu={(e) => handleContextMenu(e, activePath, "")}
            onClick={() => setActivePath("")}
          >
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
                edit={edit}
                text={text}
                setText={setText}
                handleSubmit={handleSubmit}
                renameMode={renameMode}
                setRenameMode={setRenameMode}
                setTreeData={setTreeData}
                treeData={treeData}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
