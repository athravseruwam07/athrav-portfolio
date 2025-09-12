// src/components/DebugAnchors.tsx
'use client';

import { useEffect } from 'react';

export default function DebugAnchors() {
  useEffect(() => {
    // Find nested anchors and outline them
    const nodes = document.querySelectorAll('a a');
    nodes.forEach((inner) => {
      const outer = inner.closest('a');
      if (outer instanceof HTMLElement) {
        outer.style.outline = '2px solid #ef4444';
        outer.style.outlineOffset = '2px';
      }
      if (inner instanceof HTMLElement) {
        inner.style.outline = '2px solid #22d3ee';
        inner.style.outlineOffset = '2px';
      }
    });

    // Log details (optional)
    if (nodes.length) {
      console.group('[DebugAnchors] nested <a> elements');
      nodes.forEach((n) => console.log(n));
      console.groupEnd();
    }
  }, []);

  return null;
}