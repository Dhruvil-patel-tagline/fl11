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
  text,
  setText,
  setRenameMode,
  renameMode,
  setTreeData,
  treeData,
  handleSubmitFile,
  createFile,
  handleCrateFileFolder,
}) => {
  const currentPath = `${path}/${node.name}`;
  const isActive = currentPath === activePath.path;

  const handleClick = (e, node) => {
    e.stopPropagation();
    onPathChange(currentPath);
    setActivePath({
      ...activePath,
      path: currentPath,
      id: node.id,
    });
  };

  const handleKeyDown = (e, node) => {
    if (e.key === "Enter") {
      setRenameMode({ id: node.id, type: node.type });
    }
  };

  const handleRename = (e, node) => {
    e.preventDefault();
    e.stopPropagation();
    if (text) {
      let x = updateNodeName(treeData, node.id, text);
      setTreeData(x);
    }
    setText("");
    setRenameMode({ id: "", type: "" });
  };

  if (node.type === "file") {
    return (
      <AccordionSummary
        component={Box}
        className="tree-node-file"
        onClick={(e) => handleClick(e, node)}
        onKeyDown={(e) => handleKeyDown(e, node)}
        onContextMenu={(e) => {
          e.stopPropagation();
          onContextMenu(e, node.id, "file", currentPath);
        }}
        style={{ border: isActive ? "2px solid blue" : "none" }}
      >
        <InsertDriveFileIcon fontSize="small" />
        {renameMode?.id === node.id && renameMode.type === node.type ? (
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
      <Accordion>
        <AccordionSummary
          component={Box}
          expandIcon={<ExpandMoreIcon />}
          onClick={(e) => handleClick(e, node)}
          onKeyDown={(e) => handleKeyDown(e, node)}
          onContextMenu={(e) => {
            e.stopPropagation();
            onContextMenu(e, node.id, node.type, currentPath);
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
            {renameMode?.id === node.id && renameMode.type === node.type ? (
              <form onSubmit={(e) => handleRename(e, node)}>
                <input
                  value={text}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onChange={(e) => setText(e.target.value)}
                />
                <button />
              </form>
            ) : (
              <span> {node.name}</span>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingLeft: "" }}>
          {activePath.id === node.id && activePath.edit && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleCrateFileFolder}></button>
            </form>
          )}

          {createFile.id === node.id && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleSubmitFile}></button>
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
              text={text}
              setText={setText}
              setRenameMode={setRenameMode}
              renameMode={renameMode}
              setTreeData={setTreeData}
              treeData={treeData}
              handleSubmitFile={handleSubmitFile}
              createFile={createFile}
              handleCrateFileFolder={handleCrateFileFolder}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TreeNode;
