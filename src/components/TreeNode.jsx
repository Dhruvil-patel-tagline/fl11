import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Box from "@mui/material/Box";
import { updateNodeName } from "./utils";

const TreeNode = ({
  node,
  path,
  onPathChange,
  activePath,
  setActivePath,
  onDelete,
  onContextMenu,
  edit,
  text,
  setText,
  handleSubmit,
  setRenameMode,
  renameMode,
  setTreeData,
  treeData,
}) => {
  const currentPath = `${path}/${node.name}`;
  const isActive = currentPath === activePath;
  const handleClick = (e) => {
    e.stopPropagation();
    onPathChange(currentPath);
    setActivePath(currentPath);
  };

  const handleKeyDown = (e, node) => {
    if (e.key === "Enter") {
      setRenameMode({ name: node.name, type: node.type });
    }
  };

  const handleRename = (e, node) => {
    e.preventDefault();
    e.stopPropagation();
    if (text) {
      let x = updateNodeName(treeData, `/${node.name}`, text);
      setTreeData(x);
    }
    setText("");
    setRenameMode({ name: "", type: "" });
  };

  if (node.type === "file") {
    return (
      <AccordionSummary
        component={Box}
        className="tree-node-file"
        onClick={handleClick}
        onKeyDown={(e) => handleKeyDown(e, node)}
        onContextMenu={(e) => {
          e.stopPropagation();
          onContextMenu(e, currentPath, "file");
        }}
        style={{ border: isActive ? "2px solid blue" : "none" }}
      >
        <InsertDriveFileIcon fontSize="small" />
        {renameMode?.name === node.name && renameMode.type === node.type ? (
          <form onSubmit={(e) => handleRename(e, node)}>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button />
          </form>
        ) : (
          <span>{node.name}</span>
        )}
      </AccordionSummary>
    );
  }


  return (
    <>
      {/* {!edit.path && edit.isEdit && (
        <form style={{ padding: "10px 20px", position: "relative" }}>
          <input
            style={{ fontSize: "18px", width: "100%", padding: "4px" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e, edit.path)}></button>
        </form>
      )} */}

      <Accordion>
        <AccordionSummary
          component={Box}
          expandIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          onKeyDown={(e) => handleKeyDown(e, node)}
          onContextMenu={(e) => {
            e.stopPropagation();
            onContextMenu(e, currentPath, node.type);
          }}
          style={{ border: isActive ? "2px solid blue" : "none" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FolderIcon fontSize="small" />
            {renameMode?.name === node.name && renameMode.type === node.type ? (
              <form onSubmit={(e) => handleRename(e, node)}>
                <input value={text} onChange={(e) => setText(e.target.value)} />
                <button />
              </form>
            ) : (
              <span> {node.name}</span>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingLeft: "" }}>
          {edit.path === node.name && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={(e) => handleSubmit(e, edit.path)}></button>
            </form>
          )}
        
          {node.children?.map((child) => (
            <TreeNode
              key={`${currentPath}/${child.name}`}
              node={child}
              path={currentPath}
              onPathChange={onPathChange}
              activePath={activePath}
              setActivePath={setActivePath}
              onDelete={onDelete}
              onContextMenu={onContextMenu}
              edit={edit}
              text={text}
              setText={setText}
              handleSubmit={handleSubmit}
              setRenameMode={setRenameMode}
              renameMode={renameMode}
              setTreeData={setTreeData}
              treeData={treeData}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TreeNode;
