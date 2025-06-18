// deno-lint-ignore-file
interface Props {
  src?: string;
}

const runOnMount = () => {
  window.onload = () => {
    const iFrame = document.getElementById(
      "proxy-loader",
    ) as HTMLIFrameElement;
    if (!iFrame) {
      return console.error("Couldn't find iframe");
    }
    iFrame.height = `${iFrame.contentWindow?.document.body.scrollHeight}`;
  };
};

export default function ProxyIframe({ src }: Props) {
  const hash = globalThis.location.hash; 
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(${runOnMount})();` }}>
      </script>
      <iframe
        id="proxy-loader"
        style="width:100%;border:none;overflow:hidden;min-height:950px;"
        src={hash ? src + hash : src}
      >
      </iframe>
    </>
  );
}
