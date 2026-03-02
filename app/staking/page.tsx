'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('https://cybro.io/cybro/staking');
  }, []);

  return null;
};

export default Page;
