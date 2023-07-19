'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useAccount } from '@/stores/wallet';

import Logo from '@/../public/logo.png';

export const Header = () => {
  const { connect, account, disconnect } = useAccount();

  return (
    <div className='w-full flex items-center justify-between px-12'>
      <Link href='/' className='flex items-center gap-2'>
        <Image src={Logo} alt='gard finance logo' width={96} height={96} />
        <h1 className='font-bold text-2xl'>Gard Finance</h1>
      </Link>
      {!account ? (
        <button className='font-medium' onClick={connect}>
          connect wallet
        </button>
      ) : (
        <button className='font-medium' onClick={disconnect}>
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </button>
      )}
    </div>
  );
};

export default Header;
