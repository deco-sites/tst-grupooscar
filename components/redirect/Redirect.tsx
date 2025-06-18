import { useSignalEffect } from "@preact/signals"

export default function Redirect() {
  function Redirects() {
    const url = new URL(window.location.href)
    const allLinks = document.querySelectorAll("a")
    allLinks.forEach((a) => {
      a.href = ""
    })
    if ((url.origin + "/") != url.href) {
      window.location.href = url.origin
    }
  }
  useSignalEffect(() => {
    Redirects()
  })
  return (
    <div >
    </div>
  )
}