import React, { useState } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import { Button, Flex } from "@radix-ui/themes";
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

const TitleBar = (props) => {
  return (
    <div className="text-center">
      <p
        className={`text-base font-bold self-center h-11 select-none ${props.className}`}
      >
        {props.title}
      </p>
    </div>
  );
};

const AppBranding = () => {
  return (
    <div
      id="titleContainer "
      className="basis-1/4 self-center flex flex-row select-none "
    >
      <p className="text-base font-bold">Markdown Previewer</p>
      <ArrowRightIcon className="size-6 ml-6" />
    </div>
  );
};

const App = () => {
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);
  const [theme, setTheme] = useState("dark");

  const markdownParse = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event);
    setMarkdownText(event.target.value);
  };

  // switch themes function

  const switchTheme = () => {
    // console.log(event);
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <Theme
      appearance={theme}
      className="flex flex-row flex-wrap overflow-auto p-16 items-center content-center"
    >
      {/* user input */}
      <div
        id="textInputContainer"
        className="text-sm font-medium  basis-1/4 text-center flex-col self-start"
      >
        <TitleBar
          title="Text Input"
          className={theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"}
        />
        <div
          className={`pt-3 ${
            theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"
          }`}
        >
          <textarea
            id="editor"
            value={markdownText}
            onChange={markdownParse}
            className={`overflow-auto resize-none h-screen w-96 ${
              theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"
            }`}
          ></textarea>
        </div>
      </div>

      {/* app branding  */}
      <AppBranding />

      {/* preview */}
      <div
        id="preview-container"
        className="text-sm font-medium basis-1/4 self-end"
      >
        <TitleBar
          title="Preview"
          className={theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"}
        />
        <div
          id="preview"
          className={`overflow-auto resize-none h-screen w-96 pt-3 ${
            theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"
          }`}
        >
          <ReactMarkdown className="">{markdownText}</ReactMarkdown>
        </div>
      </div>

      {/* theme switcher */}
      <div id="theme-switch "></div>

      <Button
        className="rounded-full absolute"
        color="gray"
        variant="ghost"
        highContrast
        onClick={switchTheme}
        size="1"
      >
        {theme === "dark" ? (
          <MoonIcon className="size-6" />
        ) : (
          <SunIcon className="size-6" />
        )}
      </Button>
    </Theme>
  );
};

export default App;
