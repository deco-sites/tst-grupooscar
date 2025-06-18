function getAllElements() {

  const time = setInterval(() => {
    const buttonNextPayment = document.querySelector("#cart-to-orderform")
    const buttonPayment = document.querySelector("#payment-data-submit")
    if (buttonNextPayment && buttonPayment) {
      clearInterval(time)

      buttonNextPayment.addEventListener("click", () => {
        window.stonks.event("submit_next_payment",
          { step: "Ir para Pagamento" })
      })
      console.log("button", buttonNextPayment)


      buttonPayment.addEventListener("click", () => {
        window.stonks.event("submit_payment_finish",
          { step: "Pagemento Finzalizado" })
      })
      console.log("button submit", buttonPayment)

    }
  }, 500);
}

window.addEventListener("onload", getAllElements())