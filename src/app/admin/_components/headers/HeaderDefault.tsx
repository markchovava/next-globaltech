"use client"

import LogoAdmin from "../logos/LogoAdmin"
import NavDefault from "../navs/NavDefault"


export default function HeaderDefault() {
  return (
    <>
      <header className='border-b-4 border__primary bg-white drop-shadow-lg'>
        <section className='container__primary flex lg:flex-row flex-col items-center justify-end gap-4 lg:py-2 py-3'>
          {/* <LogoAdmin /> */}
          <NavDefault />
        </section>
      </header>
    </>
  )
}
