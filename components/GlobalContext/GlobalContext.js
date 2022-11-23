import { useState, useEffect } from "react";
import { AppGlobalContext } from "../../Utils/Utils";
import Dialog from "../Dialog/Dialog";

export default function GlobalContext({ children }) {
  const [dialogContent, setDialogContent] = useState({
    title: "",
    body: "",
    actions: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  //prettier-ignore
  const [globalState, setGlobalState] = useState({
    toggleDialog,
    posts: [],
    dialogContent: {jobTitle: '', description: ''}
  });

  function toggleDialog(title = "", body = "", actions = "") {
    //to keep dialog content when cancel from dialog component button
    setDialogContent({
      title: title || dialogContent.title,
      body: body || dialogContent.body,
      actions: actions || dialogContent.actions,
    });
  }

  useEffect(() => {
    setShowDialog((state) => !state);
  }, [dialogContent]);

  return (
    <AppGlobalContext.Provider value={{ globalState, setGlobalState }}>
      <Dialog
        showDialog={showDialog}
        toggleDialog={toggleDialog}
        title={dialogContent.title}
        body={dialogContent.body}
        actions={dialogContent.actions}
      />
      {children}
    </AppGlobalContext.Provider>
  );
}
