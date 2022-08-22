// code block component.

export default function Code({ sourceCode }) {
  const props = {
    fileName: "main.rs",
    sourceCode: "",
    runButton: true,
  };

  function copyCode() {
    // let code = document.getElementById("sourceCode");
    // // code.select();
    // navigator.clipboard.writeText(code?code.value:"");
  }

  return (
    <>
      <div>
        <div className="relative not-prose bg-slate-800 z-[-10]">
          <pre className="rounded-xl relative overflow-hidden prism-code language-javascript">
            <div className="relative flex text-xs leading-6 ">
              <div className="flex items-center flex-none px-4 py-1 mt-2 text-teal-400 border-t border-b border-t-transparent border-b-teal-400">
                {props.fileName}
              </div>
              <div className="flex flex-auto pt-2 overflow-hidden rounded-tr-xl">
                <div className="flex-auto -mr-px border rounded-tl bg-slate-700/50 border-slate-500/30" />
              </div>
              <div className="absolute flex items-center h-8 pl-4 right-5 top-[9px]">
                <div className="relative flex -mr-2">
                  <button className="hidden md:inline-block group text-gray-400">
                    <span className="sr-only">Copy code</span>
                    <svg
                      aria-hidden="true"
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                      fill="none"
                      className="stroke-current transform group-hover:rotate-[-4deg] transition"
                    >
                      <path
                        d="M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.7475 16.2499L18.2475 16.2499"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.7475 19.2499L18.2475 19.2499"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g className="transition-opacity opacity-0">
                        <path
                          d="M15.9975 5.99988L15.9975 3.99988"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.9975 5.99988L20.9975 4.99988"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9975 5.99988L10.9975 4.99988"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              id="sourceCode"
              className="relative w-auto p-5 overflow-auto prose text-gray-300 prose-full-width"
            >
              {sourceCode}
            </div>
            <div className="absolute w-8 top-[45px] right-0 bg-gradient-to-l from-midnight code-fade" />
          </pre>
        </div>
      </div>
    </>
  );
}
