import { ShieldAlert } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className='border-b border-gray-200 dark:border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <ShieldAlert className='h-8 w-8 text-neon-green dark:text-green-400' />
              <span className='ml-2 text-2xl font-bold'>ScamHunt</span>
            </div>
          </div>
          <div className='flex items-center'></div>
        </div>
      </div>
    </nav>
  );
};
