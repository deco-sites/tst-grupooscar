import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
const pushnewssw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/pushnews-sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  const isHome = ctx.url.href === (ctx.url.origin + "/");
  const newCanonical = ctx.url.origin + ctx.url.pathname;
  let validateCanonical = newCanonical.includes("https")
    ? newCanonical
    : newCanonical.replace("http", "https");

  const urlParams = new URLSearchParams(ctx.url.search);
  const hasPageParam = urlParams.has("page");
  const pageValue = urlParams.get("page");

  if (hasPageParam) {
    // Verifica se há mais parâmetros além do "page"
    if (urlParams.size === 1) {
      validateCanonical = validateCanonical + "?page=" + pageValue;
    }
  }

  const isSearch = ctx.url.href.includes("/s?q=");
  const isProduct = ctx.url.href.includes("/p");

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />
        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Canonical */}
        {!isSearch && !isProduct && <link rel="canonical" href={validateCanonical} />}

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(initChatBot, 7000);
            });
            document.addEventListener('scroll', initChatBotOnEvent);
            document.addEventListener('mousemove', initChatBotOnEvent);
            document.addEventListener('touchstart', initChatBotOnEvent);
            function initChatBotOnEvent(e) {
              initChatBot();
              e.currentTarget.removeEventListener(e.type, initChatBotOnEvent);
            }
            function initChatBot() {
              if (window.chatBotDidInit) {
                return false;
            }
            window.chatBotDidInit = true;
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.defer = true;
            s.id = "getSelo";
            s.src = 'https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?76531';
            document.head.appendChild(s);
            }
            `,
          }}
        />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `@supports not(color: oklch(0 0 0)) {
              :root {
                    color-scheme: light;
                  --fallback-p: #9D0B0D;
                  --fallback-pc: #000000;
                  --fallback-s: #E4002B;
                  --fallback-sc: #fffbc2;
                  --fallback-a: #25D366;
                  --fallback-ac: #242424;
                  --fallback-n: #f8f8f8;
                  --fallback-nc: #f9f9f9;
                  --fallback-b1: #ffffff;
                  --fallback-b2: #D9D9D9;
                  --fallback-b3: #F5f5f5;
                  --fallback-bc: #4B4C4D;
                  --fallback-in: #1f1f1f;
                  --fallback-inc: #000000;
                  --fallback-su: #000000;
                  --fallback-suc: #000000;
                  --fallback-wa: #e08e00;
                  --fallback-wac: #000000;
                  --fallback-er: #000000;
                  --fallback-erc: #000000;
                }`,
          }}
        >
        </style>

        {/* Dados estruturados de organização */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Oscar",
              "url": "https://www.oscarcalcados.com.br/",
              "logo": "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/oscarcalcados/355f1d67-6391-437c-8ef4-49864211bd28/logo_oscar_calcados_header.png",
              "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+55 (11) 5039-9748",
                  "contactType": "Suporte ao Cliente",
                  "areaServed": "BR",
                  "availableLanguage": ["Portuguese"]
              },
              "sameAs": [
                  "https://www.facebook.com/OscarCalcados",
                  "https://www.instagram.com/oscarcalcados/"
              ]
            }
        `,
          }}
        />
        {/* Dados estruturados de busca */}
        {ctx.url.href === ctx.url.origin + "/" &&
          (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
              {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "url": "https://www.oscarcalcados.com.br",
                  "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://www.oscarcalcados.com.br/s?q={search_term_string}",
                      "query-input": "required name=search_term_string"
                  }
              }
          `,
              }}
            />
          )}
      </Head >

      {/* Rest of Preact tree */}
      < ctx.Component />
      {!isHome
        ? (
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `section.bonifiq-widget-section{
                  display:none !important;
              },
              `,
            }}
          >
          </style>
        )
        : (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', () => {
                  setTimeout(initChatBot, 7000);
                });
                document.addEventListener('scroll', initChatBotOnEvent);
                document.addEventListener('mousemove', initChatBotOnEvent);
                document.addEventListener('touchstart', initChatBotOnEvent);
                
                function initChatBotOnEvent(e) {
                  initChatBot();
                  e.currentTarget.removeEventListener(e.type, initChatBotOnEvent);
                }

                function initChatBot() {
                  if (window.chatBotDidInit) return;
                  window.chatBotDidInit = true;

                  const loaderScript = document.createElement('script');
                  loaderScript.async = true;
                  loaderScript.src = 'https://storage.googleapis.com/push-webchat/wwc-latest.js';

                  loaderScript.onload = function () {
                    const botScript = document.createElement('script');
                    botScript.async = true;
                    botScript.src = 'https://weni-sp-integrations-production.s3.amazonaws.com/apptypes/wwc/74282841-f4e8-4e0c-a505-dc3132824fa6/script.js';
                    document.head.appendChild(botScript);
                  };

                  document.head.appendChild(loaderScript);
                }
              `,
            }}
          />
        )
      }
      {/* <!-- Google tag (gtag.js) -->  */}
      < script
        dangerouslySetInnerHTML={{
          __html: `document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(initGTAG, 7000);
                });
                document.addEventListener('scroll', initGTAGOnEvent);
                document.addEventListener('mousemove', initGTAGOnEvent);
                document.addEventListener('touchstart', initGTAGOnEvent);
                
                function initGTAGOnEvent(e) {
                    initGTAG();
                    e.currentTarget.removeEventListener(e.type, initGTAGOnEvent);
                }
                
                function initGTAG() {
                    if (window.gtagDidInit) {
                        return;
                    }
                    window.gtagDidInit = true;

                    const s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-1012653986';
                    document.head.appendChild(s);

                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'AW-1012653986');
                }`,
        }}
      />

      {/* Include service worker */}
      < script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${pushnewssw})();` }}
      />
      <script src="https://cdn.pn.vg/push/pushnews-launcher.js?appId=940c7442-cc11-44ff-b7e6-b7e2b62681c2" async></script>
    </>
  );
});
