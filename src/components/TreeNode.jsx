import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

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
}) => {
  const currentPath = `${path}/${node.name}`;
  const isActive = currentPath === activePath;
  const handleClick = (e) => {
    e.stopPropagation();
    onPathChange(currentPath);
    setActivePath(currentPath);
  };

  if (node.type === "file") {
    return (
      <div
        className="tree-node-file"
        onClick={handleClick}
        onContextMenu={(e) => {
          e.stopPropagation();
          onContextMenu(e, currentPath, "file");
        }}
        style={{ border: isActive ? "2px solid blue" : "none" }}
      >
        <InsertDriveFileIcon fontSize="small" />
        {edit.path === node.name ? (
          <input value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <span>{node.name}</span>
        )}
      </div>
    );
  }

  return (
    <>
      {edit.path === node.name && edit.type === "folder" && (
        <form style={{ padding: "10px 20px", position: "relative" }}>
          <input
            style={{ fontSize: "18px", width: "100%", padding: "4px" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSubmit}></button>
        </form>
      )}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={handleClick}
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
            {node.name}
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingLeft: "" }}>
          {edit.path === node.name && edit.type === "file" && (
            <form style={{ padding: "10px 20px", position: "relative" }}>
              <input
                style={{ fontSize: "18px", width: "100%", padding: "4px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleSubmit}></button>
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
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TreeNode;
