import Button from "site/islands/Live/Button.tsx";


export default function LiveMimo() {
  return (
    <>
      <div>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `.mimo-container {
          height: calc(100dvh - 142px) !important;
          }
        @media (max-width: 767px) {
    .mimo - container {
          height: calc(100dvh - 135px) !important;
    }
    }`,
          }}
        >
        </style>

        <div class="mimo-container"></div>
        <Button>
        </Button>
      </div>
    </>
  );
}