import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichText } from '@/components/rich-text'

describe('RichText', () => {
  it('renders plain text untouched', () => {
    render(<p>{<RichText>Just a sentence.</RichText>}</p>)
    expect(screen.getByText('Just a sentence.')).toBeInTheDocument()
  })

  it('promotes double-asterisk spans to highlighted strong text', () => {
    render(
      <p>
        <RichText>I am a **full stack engineer** today.</RichText>
      </p>,
    )

    const strong = screen.getByText('full stack engineer')
    expect(strong.tagName).toBe('STRONG')
    expect(strong).toHaveClass('font-semibold')
  })

  it('never emits raw html from the translation string', () => {
    const { container } = render(
      <p>
        <RichText>{'<img src=x onerror=alert(1)>'}</RichText>
      </p>,
    )

    expect(container.querySelector('img')).toBeNull()
    expect(container.textContent).toContain('<img src=x onerror=alert(1)>')
  })
})
