import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/../public/logo.png';

export const Footer = () => {
  return (
    <div className='w-full flex items-center justify-between px-12'>
      <div className='flex items-center gap-2'>
        <Image src={Logo} alt='gard finance logo' width={96} height={96} />
        <h1 className='font-bold text-2xl'>Gard Finance</h1>
      </div>

      <div className='flex items-center gap-6'>
        <Link href='' target='_blank'>
          Documentation
        </Link>
        <Link href='https://github.com/gard-finance' target='_blank'>
          Github
        </Link>
      </div>

      <p>
        Powered by{' '}
        <Link
          href='https://starknet.io'
          target='_blank'
          className='text-orange-400'
        >
          Starknet
        </Link>
      </p>
    </div>
  );
};

export default Footer;
