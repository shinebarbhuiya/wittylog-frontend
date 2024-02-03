"use client"

import React from 'react'
import { BlockNoteEditor } from "@blocknote/core";
// import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
  useBlockNote,
} from "@blocknote/react";

// const lightRedTheme = {
//   colors: {
//     editor: {
//       text: "#222222",
//       background: "#ffffff",
//     },
//     menu: {
//       text: "#ffffff",
//       background: "#111827",
//     },
//     tooltip: {
//       text: "#ffffff",
//       background: "#b00000",
//     },
//     hovered: {
//       text: "#ffffff",
//       background: "#B8BABE",
//     },
//     selected: {
//       text: "#ffffff",
//       background: "#c50000",
//     },
//     disabled: {
//       text: "#9b0000",
//       background: "#7d0000",
//     },
//     shadow: "#640000",
//     border: "#870000",
//     sideMenu: "#bababa",
//     highlightColors: lightDefaultTheme.colors.highlightColors,
//   },
//   borderRadius: 4,
//   fontFamily: "Inter, sans-serif",
// } satisfies Theme;




// Default dark theme with additional component styles.
const theme = {
  ...lightDefaultTheme,
  componentStyles: (theme) => ({
    // Adds basic styling to the editor.
    Editor: {
      // backgroundColor: theme.colors.editor.background,
      // backgroundColor: "red",
      borderRadius: theme.borderRadius,
      border: `0px solid ${theme.colors.border}`,
      boxShadow: `0 4px 12px ${theme.colors.shadow}`,
      padding: '10px',
    },
    // Makes all hovered dropdown & menu items blue.
    // Menu: {
    //   ".mantine-Menu-item[data-hovered], .mantine-Menu-item:hover": {
    //     backgroundColor: "blue",
    //   },
    // },
    // Toolbar: {
    //   ".mantine-Menu-dropdown": {
    //     ".mantine-Menu-item:hover": {
    //       backgroundColor: "blue",
    //     },
    //   },
    // },
  }),
} satisfies Theme;






const NewEntryPage = () => {

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({});


  return (
    <div className='flex items-center justify-center'>
        {/* <h1>New Entry Here</h1> */}
       
       
        <div className='mx-auto w-full '>
            
          <BlockNoteView className='' editor={editor} theme={theme} />

        </div>

        
    </div>
  )
}

export default NewEntryPage