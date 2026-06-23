import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d0d',
          borderRadius: 7,
        }}
      >
        <span
          style={{
            color: '#C8503C',
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: '-0.06em',
            fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif',
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          TL
        </span>
      </div>
    ),
    { width: 32, height: 32 },
  );
}
