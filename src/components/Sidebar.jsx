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
import { addNewF, deleteNode, sortData } from "./utils";
import { initialData } from "./utils/data";

const Sidebar = ({ onPathChange }) => {
  const [treeData, setTreeData] = useState(() => sortData(initialData));
  const [expand, setExpand] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [createFile, setCreateFile] = useState({ id: false, type: "" });
  const [renameMode, setRenameMode] = useState({ id: "", type: "" });
  const [text, setText] = useState("");
  const [activePath, setActivePath] = useState({
    path: "",
    id: "",
    type: "",
    edit: false,
  });
  // const [edit, setEdit] = useState({ path: "", isEdit: false, type: "" });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpand(isExpanded ? panel : false);
  };

  const handleContextMenu = (e, id, type, path) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      path: path,
      id: id,
      type: type,
    });
  };

  const handleDelete = (pathToDelete) => {
    const updatedTree = deleteNode(treeData, pathToDelete);
    setTreeData(updatedTree);
  };

  const handleCreate = (type) => {
    // if (contextMenu.path) {
    //   const res = contextMenu.path.split("/");
    // }
    // const name = prompt(`Enter ${type} name`);
    // if (!name) return;
    setCreateFile({ type, id: contextMenu.id });
    // const newNode = { type, name };
    // const updatedTree = addNode(treeData, contextMenu?.path, newNode);
    // setTreeData(updatedTree);
    handleCloseContextMenu();
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (text) {
      const newNode = { type: createFile.type, name: text };
      const updatedTree = addNewF(treeData, createFile.id, newNode);
      setTreeData(updatedTree);
      setText("");
    }
    setCreateFile({ id: false, type: "" });
  };

  const handleCreateFileIcon = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePath({ ...activePath, edit: true, type });
  };

  // const handleCreateFolder = (e) => {

  //   e.stopPropagation();
  //   if (activePath) {
  //     const res = activePath.split("/");

  //     setEdit({ path: res[res.length - 1], isEdit: true, type: "folder" });
  //     return;
  //   }
  //   setEdit({ path: activePath, isEdit: true, type: "folder" });
  // };

  // const handleCreateFile = (e) => {

  //   e.stopPropagation();
  //   if (activePath) {
  //     const res = activePath.split("/");
  //     setEdit({ path: res[res.length - 1], isEdit: true, type: "file" });
  //     return;
  //   }
  //   setEdit({ path: activePath, isEdit: true, type: "file" });
  // };

  const handleCrateFileFolder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (text) {
      const newNode = { type: activePath.type, name: text };
      const updatedTree = addNewF(treeData, activePath.id, newNode);
      console.log(updatedTree);
      setTreeData(updatedTree);
      setText("");
    }
    setActivePath({ ...activePath, edit: false });
  };

  const handleRename = () => {
    // const newName = prompt("Enter new name");
    setRenameMode({ id: contextMenu.id, type: contextMenu.type });
    // if (contextMenu.path) {
    //   const res = contextMenu.path.split("/");
    //   setEdit(res[res.length - 1]);
    // }
    // if (!newName) return;
    // const updatedTree = updateNodeName(treeData, contextMenu.id, newName);
    // setTreeData(updatedTree);
    handleCloseContextMenu();
  };

  // const handleContextRename = (e) => {
  //   e.preventDefault();
  //   if (text) {
  //     const updatedTree = updateNodeName(treeData, contextMenu.id, text);
  //     setTreeData(updatedTree);
  //     setText("");
  //   }
  //   setRenameMode({ id: "", type: "" });
  // };

  const handleCloseContextMenu = () => setContextMenu(null);

  // const handleSubmit = (e, path) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   const newNode = { type: edit.type, name: text };
  //   if (!edit.path && text.trim()) {
  //     const updatedTree = addNode(treeData, "", newNode);
  //     setTreeData(updatedTree);
  //   } else if (edit.type && text.trim()) {
  //     const updatedTree = addNode(treeData, `/${path}`, newNode);
  //     setTreeData(updatedTree);
  //   }
  //   setEdit({ path: "", isEdit: false, type: "" });
  //   setText("");
  // };

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
              setActivePath({ ...activePath, path: "" });
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
                  <CreateNewFolderSharpIcon
                    onClick={(e) => handleCreateFileIcon(e, "folder")}
                  />
                  <NoteAddIcon
                    fontSize="small"
                    onClick={(e) => handleCreateFileIcon(e, "file")}
                  />
                </span>
              )}
            </div>
          </AccordionSummary>
          {activePath.edit && !activePath.id && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleCrateFileFolder}></button>
            </form>
          )}
          {createFile.type && !createFile.id && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleSubmitFile}></button>
            </form>
          )}
          <AccordionDetails
            style={{ minHeight: "90vh" }}
            onContextMenu={(e) =>
              handleContextMenu(e, contextMenu?.id, "", activePath)
            }
            onClick={() => setActivePath({ ...activePath, path: "" })}
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
                text={text}
                setText={setText}
                renameMode={renameMode}
                setRenameMode={setRenameMode}
                setTreeData={setTreeData}
                treeData={treeData}
                handleSubmitFile={handleSubmitFile}
                createFile={createFile}
                handleCrateFileFolder={handleCrateFileFolder}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
