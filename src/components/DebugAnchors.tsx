'use client';
import { useEffect } from 'react';

export default function DebugAnchors() {
  useEffect(() => {
    const pairs = Array.from(document.querySelectorAll('a a'));
    // highlight on screen
    pairs.forEach((inner) => {
      const outer = inner.closest('a')!;
      outer.style.outline = '2px solid #ef4444';
      inner.style.outline = '2px solid #22d3ee';
    });
    // log details
    console.group('[DebugAnchors] nested <a> elements');
    pairs.forEach((inner, i) => {
      const outer = inner.closest('a');
      console.log(`#${i + 1}`, { outer, inner });
    });
    console.groupEnd();
  }, []);
  return null;
}