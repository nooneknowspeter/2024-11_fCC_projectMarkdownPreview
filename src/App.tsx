import React, { useState } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import { ArrowRightIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";

// default markdown text to fullfill userstory #5
const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function App() {
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);
  const [theme, setTheme] = useState("dark");

  const markdownParse = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event);
    setMarkdownText(event.target.value);
  };

  // switch themes function

  const switchTheme = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    console.log(event);
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <Theme appearance={theme}>
      <div id="textInputContainer" className="text-sm font-medium">
        <div>
          <p className="text-base font-bold">Text Input</p>
        </div>
        <div>
          <textarea
            id="editor"
            value={markdownText}
            onChange={markdownParse}
            className="overflow-auto resize-none "
          ></textarea>
        </div>
      </div>

      <div id="titleContainer" className="">
        <p className="text-base font-bold">Markdown Previewer</p>
        <ArrowRightIcon className="size-6" />
      </div>

      <div className="">
        <div id="preview-container">
          <p className="text-base font-bold">Preview</p>
        </div>
        <div id="preview">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>

      <div id="theme-switch"></div>

      <Button
        className="rounded-full"
        color="gray"
        variant="ghost"
        highContrast
        onClick={switchTheme}
      >
        {theme === "dark" ? (
          <MoonIcon className="size-6" />
        ) : (
          <SunIcon className="size-6" />
        )}
      </Button>
    </Theme>
  );
}

export default App;
