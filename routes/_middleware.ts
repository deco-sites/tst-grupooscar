import { FreshContext } from "$fresh/server.ts";
const APPLE_DEEP_LINK = "apple-app-site-association";

export async function handler(
    req: Request,
    ctx: FreshContext<xpto>,
) {

    const referUrl = req.url;
    const STATIC_FOLERS = "./static/.well-known/apple-app-site-association";

    const isDeeplink = referUrl ? referUrl.includes(APPLE_DEEP_LINK) : false;

    if (isDeeplink) {
        const file = await Deno.readFile(STATIC_FOLERS);
        const response = new Response(file);
        response.headers.set("Content-Type", "application/json; charset=utf-8");
        return response;
    }

    const resp = await ctx.next();

    if (req.headers.get("upgrade") === "websocket") {
        return resp;
    }

    action(resp);

    return resp;
}

// Funções auxiliares (exemplos)
function action(response: Response) {
    // Modifica a resposta de alguma forma
    response.headers.set("Strict-Transport-Security", "max-age=604800; includeSubDomains; preload");
}
