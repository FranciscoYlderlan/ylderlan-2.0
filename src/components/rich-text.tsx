import { Fragment } from 'react'

/**
 * Renders the markdown-lite used in the translation files: `**span**` becomes
 * highlighted text. Keeping the markup out of the locale files means the
 * translations stay plain strings and cannot inject arbitrary HTML.
 */
export function RichText({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) => {
        const match = /^\*\*([^*]+)\*\*$/.exec(part)

        if (!match) {
          return <Fragment key={index}>{part}</Fragment>
        }

        return (
          <strong key={index} className="text-highlight font-semibold">
            {match[1]}
          </strong>
        )
      })}
    </>
  )
}
