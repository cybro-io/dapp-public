'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';

import { REF_CODE_LOCAL_STORAGE_KEY } from '@/entities/referral';

const Page = ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const [_, setRefCode] = useLocalStorage<string | null>(
    REF_CODE_LOCAL_STORAGE_KEY,
    null,
  );

  useEffect(() => {
    setRefCode(params.code);
    router.replace('/');
  }, []);

  return null;
};

export default Page;
