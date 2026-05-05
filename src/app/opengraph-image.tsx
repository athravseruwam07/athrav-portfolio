import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#0b0d10',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d8dee4',
          fontFamily: 'ui-sans-serif, system-ui',
          letterSpacing: '-0.03em',
        }}
      >
        Athrav Seruwam · Portfolio
      </div>
    ),
    size,
  );
}