import { useRef } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useUI } from "site/sdk/useUI.ts";
import { useEffect } from "preact/hooks";

export default function ButtonLive() {

  const refContainer = useRef<HTMLButtonElement>(null)
  const { addItems } = useCart()
  const { displayCart } = useUI()

  function handlerAddToCart() {
    if (refContainer.current) {
      const sku: string = refContainer.current.dataset.sku ?? "1"
      const quantity: string = refContainer.current.dataset.quantity ?? "1"

      addItems({
        orderItems: [{
          id: sku,
          seller: "1",
          quantity: parseInt(quantity),
        }],
      }).finally(() => { displayCart.value = true; })
    }
  }

  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.onload = function () {
        if (d.getElementsByClassName("mimo-container").length > 0) {
          var liveId = "live-id-not-set";
          var customerId = "432394b6-39b7-4ef9-989c-849b962e0d64";
          var liveUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
          getOrderFormId()
            .then(function (cartId) {
              return makePlayerSdk(liveId, customerId, liveUrl);
            })
            .catch(function (err) {
              console.log(err);
            });
          function makePlayerSdk(
            liveId,
            customerId,
            liveUrl,
            middlewares = function (action) { }
          ) {
            var mimoPlayer = new window.MimoPlayer({
              liveId: liveId,
              customerId: customerId,
              liveUrl: liveUrl,
              middleware: function (store) {
                return function (next) {
                  return function (action) {
                    const payload = action.payload;
                    if (action.type === "checkout/intent_addToCart") {
                      const button = document.querySelector("#live-addtocart");

                      if (button) {
                        button.dataset.sku =
                          payload.variant.external_identifier;
                        button.dataset.quantity = payload.quantity;
                        button.click();

                        store.dispatch({
                          type: "core/intent_ShowToaster",
                          payload: "Produto adicionado ao carrinho",
                        });
                      } else
                        (function (err) {
                          console.log(err);
                          store.dispatch({
                            type: "core/intent_ShowToaster",
                            payload: "Erro ao adicionar produto ao carrinho",
                          });
                        });
                    }
                    return next(action);
                  };
                };
              },
            });
            var mimoContainer = document.createElement("div");
            mimoContainer.style =
              "height: 100%; width: 100%; position:relative";
            mimoContainer.appendChild(mimoPlayer);
            d.body
              .getElementsByClassName("mimo-container")[0]
              .appendChild(mimoContainer);
          }
          var orderFormId = null;
          function getOrderFormId() {
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", "/api/checkout/pub/orderForm");
              xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                  resolve(JSON.parse(xhr.response)["orderFormId"]);
                } else {
                  reject(null);
                }
              };
              xhr.onerror = function () {
                reject(null);
              };
              xhr.send();
            });
          }
        }
      };
      js.src = "https://sdk.mimo.com.br/index.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "mimo-jssdk");
  }, []);

  return (
    <button ref={refContainer} data-sku={0} data-quantity={1} id="live-addtocart" onClick={() => handlerAddToCart()}>
    </button>
  )
}