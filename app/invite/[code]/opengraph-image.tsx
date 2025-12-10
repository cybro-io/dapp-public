import { ImageResponse } from 'next/og';

import { getRefImageApiV1ProfileRefcodeRefCodeGet } from '@/shared/types';

// Image metadata
export const alt = 'Referral Link';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { code: string } }) {
  const response = await getRefImageApiV1ProfileRefcodeRefCodeGet(params.code);

  const base64Image = response.data.data;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {base64Image ? (
          <img src={`data:image/png;base64,${base64Image}`} alt={params.code} />
        ) : (
          <div>Not found</div>
        )}
      </div>
    ),
    {
      ...size,
    },
  );
}
