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

= Welcome to Typst

Hello,\nnew line • non-breaking space: ~•~  

- Unordered list item  
- Another item  

1. First numbered item  
2. Second numbered item  

**Bold text**, *italic text*, _underlined text_  

$\alpha + beta = \gamma$  // inline math  

#let radius = 5cm  
#def area(r) { π * r^2 }  
#show area(radius)  

:star: a symbol  


`
    },
    { id: 2, name: "example.txt", content: "" },
    { id: 3, name: "logo.png", content: "" },
    { id: 4, name: "header.png", content: "" },
    { id: 5, name: "formular.typ", content: "" }
  ];
};
