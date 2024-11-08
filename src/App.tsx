import React, { useRef, useState } from "react";
import "./index.css";
import ReactMarkdown from "react-markdown";
import "@radix-ui/themes/styles.css";
import "./components/Centralized.tsx";
import AnimatedCursor from "react-animated-cursor";
import { Theme } from "@radix-ui/themes";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

// import components from centralized file
import { AppBranding } from "./components/Centralized";

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

const TitleBar = (props: { className: string; title: string }) => {
  // console.log(props);
  return (
    <div className="text-center">
      <p
        className={`text-base font-bold h-11 select-none drop-shadow-2xl pt-3 ${props.className}`}
      >
        {props.title}
      </p>
    </div>
  );
};

const App = () => {
  // states
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);

  const [hidden, setHidden] = useState<string>("hidden");

  // template union type to allow only strings dark or light since the options for the dark mode are dark, light, dark-theme, light-theme and undefined
  // https://www.typescriptlang.org/static/TypeScript%20Types-ae199d69aeecf7d4a2704a528d0fd3f9.png
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // tailwind animation set to vars
  const animationPopUp: string =
    "transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300 hover:drop-shadow-2xl";
  const animationBounce: string =
    "transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-500";
  const animationColorChange: string = `transition ease-in-out delay-100`;

  // markdown parsing function
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

  // color animation function
  const themeColor = `transition-all ease-out duration-1000 delay-100 ${
    theme === "dark" ? "bg-neutral-900" : "bg-neutral-200"
  }`;

  // revearl containers animation function
  gsap.registerPlugin(useGSAP);

  const textContainer = useRef<HTMLDivElement>(null);
  const previewContainer = useRef<HTMLDivElement>(null);
  const application = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({
    dependencies: [hidden, application],
    revertOnUpdate: false,
  });

  const revealContainers = contextSafe(() => {
    const tl = gsap.timeline();

    if (hidden === "hidden") {
      tl.to(application.current, {
        duration: 2,
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          setTimeout(() => {
            setHidden("");
          }, 5);
        },
      })
        .to(application.current, {
          duration: 1,
          opacity: 100,
          ease: "power2.in",
        })
        .fromTo(
          textContainer.current,
          { duration: 0.5, opacity: 0, x: -200, ease: "power2.out" },
          { duration: 1, opacity: 100, x: 0, ease: "bounce.in" }
        )
        .fromTo(
          previewContainer.current,
          { duration: 0.5, opacity: 0, x: 200, ease: "power2.out" },
          { duration: 1, opacity: 100, x: 0, ease: "bounce.in" }
        );
    } else if (hidden === "") {
      tl.to(textContainer.current, {
        duration: 1,
        opacity: 0,
        x: -200,
        ease: "power2.out",
      })
        .to(previewContainer.current, { duration: 1, opacity: 0, x: 200 })
        .to(application.current, {
          duration: 1,
          opacity: 0,
          ease: "power2.in",
          onComplete: () => {
            setTimeout(() => {
              setHidden("hidden");
            }, 50);
          },
        })
        .to(application.current, {
          duration: 2,
          opacity: 100,
          ease: "power2.in",
        });
    }
  });

  return (
    <>
      <Theme
        appearance={theme}
        className={`h-screen justify-center place-items-center flex flex-row flex-wrap p-16 overflow-auto gap-7`}
        ref={application}
      >
        {/* user input */}
        <div
          id="textInputContainer"
          className={`${hidden} opacity-0 text-sm font-medium  basis-1/4 text-center flex-col self-start w-96 ${animationPopUp}`}
          ref={textContainer}
        >
          <TitleBar title="Text Input" className={`${themeColor}`} />
          <div className={`pt-3   ${themeColor}`}>
            <textarea
              id="editor"
              value={markdownText}
              onChange={markdownParse}
              className={`h-[80vh] min-h-96 w-96 p-3 overflow-auto resize-none text-balance ${themeColor} ${
                theme === "dark" ? "caret-neutral-200" : "caret-neutral-900"
              }`}
            ></textarea>
          </div>
        </div>
        {/* app branding  */}
        <AppBranding
          className={`${animationBounce} place-content-center`}
          onClick={revealContainers}
        />
        {/* preview */}
        <div
          id="preview-container"
          className={`${hidden} opacity-0 ${animationColorChange} ${animationPopUp} `}
          ref={previewContainer}
        >
          <TitleBar title="Preview" className={themeColor} />
          <div id="preview" className={`${themeColor}`}>
            <ReactMarkdown className="text-balance w-96 p-3 overflow-auto h-[80vh] ">
              {markdownText}
            </ReactMarkdown>
          </div>
        </div>
        {/* theme switcher */}
        <div id="theme-switch">
          <a
            className={`hover:animate-pulse hover:transition-all ease-in-out duration-300 hover:drop-shadow-2xl`}
            color="gray"
            onClick={switchTheme}
          >
            {theme === "dark" ? (
              <MoonIcon className="size-6" />
            ) : (
              <SunIcon className="size-6" />
            )}
          </a>
        </div>
      </Theme>

      {/* animated cursor */}
      <AnimatedCursor
        innerSize={8}
        outerSize={8}
        color={theme === "dark" ? "256, 256, 256" : "0, 0, 0"}
        outerAlpha={0.2}
        innerScale={0.4}
        outerScale={6}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
          {
            target: ".custom",
          },
        ]}
      />
    </>
  );
};

export default App;
