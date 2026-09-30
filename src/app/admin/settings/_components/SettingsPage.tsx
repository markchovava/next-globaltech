"use client"

import SpacerDefault from "@/_components/spacers/SpacerDefault"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import HeadingDefault from "../../_components/headings/HeadingDefault"
import { SettingsNavData } from "../_data/sample/SettingsNavData"
import CardAdmin from "../../_components/cards/CardAdmin"




export default function AdminPage() {
  return (
    <>
    <SpacerDefault />
    <HeadingDefault title="Settings" />
    <SpacerPrimary />

    <section className="container__primary grid lg:grid-cols-4 grid-cols-2 gap-4">
        { SettingsNavData.map((i, key) => (
            <CardAdmin key={key} data={i} />
        )) }
    </section>

    <SpacerDefault />
    </>
  )
}
