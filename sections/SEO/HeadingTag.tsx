interface Props {
  /**
   * @title Texto
   */
  text?: string;
  /**
   * @default h1
   */
  headingTag?: "h1" | "h2" | "h3";
}

export default function ContainerHeadingTag(props: Props) {
  if (props.text == null) {
    return null;
  }

  return (
    <div class="bg-base-300">
      <div class="w-11/12  mx-auto pt-8 text-center font-medium pb-2.5 border-b border-base-200 lg:text-xl">
        {props.headingTag == "h1"
          ? (
            <h1>
              {props.text}
            </h1>
          )
          : (
            <>
              {props.headingTag == "h2"
                ? (
                  <h2>
                    {props.text}
                  </h2>
                )
                : (
                  <h3>
                    {props.text}
                  </h3>
                )}
            </>
          )}
      </div>
    </div>
  );
}
