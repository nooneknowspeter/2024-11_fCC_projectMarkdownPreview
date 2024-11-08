import { ArrowRightIcon } from "@heroicons/react/24/solid";

const AppBranding = (props: { className: string; onClick: () => void }) => {
  return (
    <a
      id="titleContainer "
      className={`basis-1/4 self-center flex flex-row select-none place-content-center place-items-center align-middle ${props.className}`}
      onClick={props.onClick}
    >
      <p className="text-base font-bold self-center place-content-center items-center place-self-center align-middle">
        Markdown Previewer
      </p>
      <ArrowRightIcon className="size-6 ml-6" />
    </a>
  );
};

export default AppBranding;
