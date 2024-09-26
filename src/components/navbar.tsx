import { ShieldAlert } from "lucide-react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className='bg-green-950 text-white font-bold border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Image src='/logo.jpg' alt='ScamHunt' width='48' height='48' />
              <span className='ml-2 text-xl'>
                ScamHunt Dashboard For Law Enforcement Authorities
              </span>
            </div>
          </div>
          <div className='flex items-center'></div>
        </div>
      </div>
    </nav>
  );
};
