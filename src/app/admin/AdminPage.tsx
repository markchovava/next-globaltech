"use client"

import SpacerDefault from "@/_components/spacers/SpacerDefault"
import HeadingDefault from "./_components/headings/HeadingDefault"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import { AdminNavData } from "./_data/sample/AdminNavData"
import CardAdmin from "./_components/cards/CardAdmin"



export default function AdminPage() {

  return (
    <>
      <SpacerDefault />
      <HeadingDefault title="Dashboard" />
      <SpacerPrimary />

      <section className="container__primary grid lg:grid-cols-4 grid-cols-2 gap-4">
        {AdminNavData.map((i, key) => (
          <CardAdmin key={key} data={i} />
        ))}
      </section>

      <SpacerDefault />
    </>
  )
}
