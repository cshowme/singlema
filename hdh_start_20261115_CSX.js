import { runExportedApp } from "./shinylive/shinylive.js";
// 一律以檢視模式啟動：移除網址上的 _shinylive-mode（例如 editor-terminal-viewer），不顯示程式編輯器與終端機
{
  const u = new URL(window.location.href);
  if (u.searchParams.has("_shinylive-mode")) {
    u.searchParams.delete("_shinylive-mode");
    window.history.replaceState(null, "", u.pathname + u.search + u.hash);
  }
}
      runExportedApp({
        id: "root",
        appEngine: "r",
        relPath: "",
      });
