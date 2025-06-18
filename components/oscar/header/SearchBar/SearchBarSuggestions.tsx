import { useId } from "site/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";
import { invoke } from "site/runtime.ts";
import Suggestions from "site/components/oscar/header/SearchBar/Suggestions.tsx";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { useEffect, useState, useCallback, useRef } from "preact/hooks";

// Debounce hook
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

export default function SearchBarSuggestions() {
  const id = useId();
  const [resSuggestions, setResSuggestions] = useState<Suggestion | { products: [], searches: [] }>({ products: [], searches: [] });
  const [valueTerm, setValueTerm] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const fetchSuggestions = async (term: string) => {
    if (!term.trim()) return;

    try {
      const res = await invoke.vtex.loaders.intelligentSearch.suggestions({ query: term, count: 4 });
      if (res) {
        setResSuggestions(res as Suggestion);
      }
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  const debouncedGetSuggestions = useDebounce(fetchSuggestions, 500);

  useEffect(() => {
    window.document.addEventListener("scroll", () => {
      setShowModal(false)
    })
  }, [])

  useEffect(() => {
    const container = window.document.getElementById("bg-suggestion")
    if (container) {
      container.addEventListener("click", (e) => {
        if (e.target !== null && e.target.id == "bg-suggestion") {
          e.preventDefault()
          setShowModal(false)
        }
      })
    }
  }, [valueTerm, showModal])

  return (
    <>
      <form
        action="/s"
        method="GET"
        id={id}
        class="min-h-[40px] relative w-full"
      >
        <input
          className="w-full placeholder:text-info p-2 text-sm pl-5 text-black h-[42px] bg-neutral rounded-full border border-solid border-base-200"
          type="text"
          name="q" // Adicione o atributo 'name' com o valor 'q'
          autoComplete={"off"}
          placeholder="Busque por tênis, mochila..."
          onChange={(e) => {
            const value = e.currentTarget.value
            if (value.length > 0) {
              setShowModal(true)
              setValueTerm(value)
              debouncedGetSuggestions(value)
            }
            else {
              setShowModal(false)
            }
          }}
          onClick={(e) => {
            const value = e.currentTarget.value
            if (value.length > 0) {
              setShowModal(true)
              setValueTerm(value)
              debouncedGetSuggestions(value)
            }
            else {
              setShowModal(false)
            }
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          class={`absolute right-4 top-3`}
        >
          <Icon
            id={"MagnifyingGlass"}
            size={17}
            strokeWidth={1}
            class="text-info"
          />
        </button>
      </form>
      <script
        src={scriptAsDataURI((id: string) => {
          const elem = document.getElementById(id);
          if (!elem) return;
          // deno-lint-ignore no-explicit-any
          elem.addEventListener("submit", (e: any) => {
            window.DECO.events.dispatch({
              name: "search",
              params: {
                search_term: e.currentTarget.elements["q"].value,
              },
            });
          });
        }, id)}
      />
      {showModal && <Suggestions products={resSuggestions.products} searches={resSuggestions.searches} searchTerm={valueTerm} />}
    </>
  )
}

export function SearchBarSuggestionsMobile() {
  const id = useId();
  const [resSuggestions, setResSuggestions] = useState<Suggestion | { products: [], searches: [] }>({ products: [], searches: [] });
  const [valueTerm, setValueTerm] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  async function getSuggestions(term: string) {

    if (!term.trim()) return;

    try {
      const res: Suggestion = await invoke.vtex.loaders.intelligentSearch.suggestions({ query: term, count: 4 });
      if (res) {
        setResSuggestions(res);
      }

    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  }

  useEffect(() => {
    window.document.addEventListener("scroll", () => {
      setShowModal(false)
    })
  }, [])

  useEffect(() => {
    const container = window.document.getElementById("bg-suggestion")
    if (container) {
      container.addEventListener("click", (e) => {
        if (e.target !== null && e.target.id == "bg-suggestion") {
          e.preventDefault()
          setShowModal(false)
        }
      })
    }
  }, [valueTerm, showModal])

  return (
    <>
      <form action="/s" method="GET" id={id} class="min-h-[37px] ">
        <input
          className="w-full py-3 px-4 placeholder:text-info text-base text-primary-content h-[37px] bg-neutral"
          type="text"
          name="q" // Adicione o atributo 'name' com o valor 'q'
          placeholder="O que você está buscando? "
          onChange={(e) => {
            const value = e.currentTarget.value
            if (value.length > 0) {
              setShowModal(true)
              setValueTerm(value)
              getSuggestions(value)
            }
            else {
              setShowModal(false)
            }
          }}
          onClick={(e) => {
            const value = e.currentTarget.value
            if (value.length > 0) {
              setShowModal(true)
              setValueTerm(value)
              getSuggestions(value)
            }
            else {
              setShowModal(false)
            }
          }}
          autoComplete={"off"}
        />
        <button
          type="submit"
          aria-label="Search"
          class={`absolute right-4 top-3`}
        >
          <Icon
            id={"MagnifyingGlass"}
            size={17}
            strokeWidth={1}
            class="text-info"
          />
        </button>
      </form>
      <script
        src={scriptAsDataURI((id: string) => {
          const elem = document.getElementById(id);
          if (!elem) {
            return;
          }
          // deno-lint-ignore no-explicit-any
          elem.addEventListener("submit", (e: any) => {
            window.DECO.events.dispatch({
              name: "search",
              params: {
                search_term: e.currentTarget.elements["q"].value,
              },
            });
          });
        }, id)}
      />
      {showModal && <Suggestions products={resSuggestions.products} searches={resSuggestions.searches} searchTerm={valueTerm} />}
    </>
  )
}