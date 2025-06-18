interface Tag {
  title: string;
  href: string;
}

interface Props {
  title: string;
  tags: Tag[];
}

function Tag(tag: Tag) {
  const { title, href } = tag;

  return (
    <a
      href={href}
      class="text-xs px-3 py-2.5 border border-base-content rounded-badge max-h-[30px] flex items-center justify-center"
    >
      {title}
    </a>
  );
}

export default function SearchTags(props: Props) {
  const { title, tags } = props;

  return (
    <div class="bg-base-300 w-full py-6 px-4">
      <div
        class={`w-11/12 mx-auto flex flex-col gap-5 items-center justify-center`}
      >
        <h2 class="text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl">
          {title}
        </h2>
        <ul class="flex flex-row gap-2 lg:gap-4 flex-wrap justify-center mx-auto">
          {tags.map((item) => <Tag {...item} />)}
        </ul>
      </div>
    </div>
  );
}
