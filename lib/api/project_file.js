import api from "./client";

export const getProjectFiles = async (projectId) => {
  return [
    {
      id: 1,
      name: "main.typ",
      content: `// This is a line comment
/* 
   This is a 
   block comment 
*/

= Welcome to Typst #emoji.face.devil \

Hello, \ new Line 

- Unordered list item  
- Another item  

1. First numbered item  
2. Second numbered item  

*Bold text*, _italic text_, #underline[text] 

$alpha + beta = gamma$ //inline math 

#text(2em)[
  $sum_(k=0)^n k
    &= 1 + ... + n \
    &= (n(n+1)) / 2$
]



#circle[
  #set align(center + horizon)
  Automatically \
  sized to fit.
]


#set heading(numbering: "I.")
#set text(
  font: "New Computer Modern"
)

= Introduction


#show heading: set text(red)

= This is red
But this stays black.
 


`
    },
    { id: 2, name: "example.txt", content: "" },
    { id: 3, name: "logo.png", content: "" },
    { id: 4, name: "header.png", content: "" },
    { id: 5, name: "formular.typ", content: "" }
  ];
};
