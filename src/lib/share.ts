/** Encode/decode a plan to a URL-safe string for shareable links. */
import type { Plan } from '../model/types'

export function encodePlan(plan: Plan): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(plan))))
  } catch {
    return ''
  }
}

export function decodePlan(s: string): Plan | null {
  try {
    const json = decodeURIComponent(escape(atob(s)))
    const plan = JSON.parse(json) as Plan
    if (!plan || !plan.room || !Array.isArray(plan.items)) return null
    return plan
  } catch {
    return null
  }
}
