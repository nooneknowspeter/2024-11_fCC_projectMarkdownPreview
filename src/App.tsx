import React, { useState } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import { Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./components/Centralized.tsx";

import { Theme } from "@radix-ui/themes";
import { ArrowRightIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Background } from "./components/Centralized";

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
        className={`text-base font-bold self-center h-11 select-none drop-shadow-2xl ${props.className}`}
      >
        {props.title}
      </p>
    </div>
  );
};

const AppBranding = (props) => {
  return (
    <div
      id="titleContainer "
      className={`basis-1/4 self-center flex flex-row select-none ${props.className}`}
    >
      <p className="text-base font-bold self-center">Markdown Previewer</p>
      <ArrowRightIcon className="size-6 ml-6" />
    </div>
  );
};

const App = () => {
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);
  const [theme, setTheme] = useState("dark");
  // tailwind animation set to vars
  const animationPopUp: string =
    "transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105  duration-300 hover:drop-shadow-2xl";
  const animationBounce: string =
    "transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-500";
  const animationColorChange: string = `transition ease-in-out delay-100`;

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

  let themeColor = `transition-all ease-out duration-1000 delay-100 ${
    theme === "dark" ? "bg-neutral-900" : "bg-neutral-200"
  }`;

  return (
    <>
      <Background />
      <Theme
        appearance={theme}
        className="flex flex-row flex-wrap overflow-auto p-16 items-center content-center"
      >
        {/* user input */}
        <div
          id="textInputContainer"
          className={`text-sm font-medium  basis-1/4 text-center flex-col self-start ${animationPopUp}`}
        >
          <TitleBar title="Text Input" className={themeColor} />
          <div className={`pt-3 ${themeColor}`}>
            <textarea
              id="editor"
              value={markdownText}
              onChange={markdownParse}
              className={`overflow-auto resize-none h-screen w-96 p-3 ${themeColor}`}
            ></textarea>
          </div>
        </div>

        {/* app branding  */}
        <AppBranding
          className={`transition-all ease-out duration-1000 delay-1000 ${animationBounce}`}
        />

        {/* preview */}
        <div
          id="preview-container"
          className={`text-sm font-medium basis-1/4 self-end ${animationPopUp} ${animationColorChange}`}
        >
          <TitleBar title="Preview" className={themeColor} />
          <div
            id="preview"
            className={`overflow-auto resize-none h-screen p-3 ${themeColor}`}
          >
            <ReactMarkdown className="">{markdownText}</ReactMarkdown>
          </div>
        </div>

        {/* theme switcher */}
        <div id="theme-switch "></div>

        <Button
          className={`rounded-full hover:animate-pulse hover:transition-all ease-in-out duration-300`}
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
    </>
  );
};

export default App;
