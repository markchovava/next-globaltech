"Use client"

import { MetaInterface, MetaLinksInterface } from "../../_data/entity/ResponseEntity";
import ButtonPaginate from "../buttons/ButtonPaginate";





interface PaginationPrimaryInterface {
  links?: MetaLinksInterface,
  meta?: MetaInterface,
  handlePaginate: (url: string) => void
  css?: string
}


export default function PaginateDefault({
  links,
  meta,
  css = "justify-end",
  handlePaginate
}: PaginationPrimaryInterface
) {
  const { prev, next } = links || { prev: null, next: null };


  return (
    !prev && !next ? "" :
      <section className={`${css} w-full flex items-center gap-3 mt-4`}>
        {prev ?
          <ButtonPaginate btnType="prev" onClick={() => handlePaginate(prev)} />
          : ""
        }
        {next ?
          <ButtonPaginate btnType="next" onClick={() => handlePaginate(next)} />
          : ""
        }
      </section>
  )
}
