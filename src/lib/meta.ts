import { useEffect } from 'react'

// Sets the document title and meta description for the non-landing routes.
// The landing page keeps the values from index.html.
export function usePageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title
    if (!description) return
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      const created = document.createElement('meta')
      created.setAttribute('name', 'description')
      document.head.appendChild(created)
      tag = created
    }
    tag.setAttribute('content', description)
  }, [title, description])
}
