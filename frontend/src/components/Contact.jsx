import React, { useState } from 'react';
import { Headset, User, Mail, NotepadText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';

const Contact = () => {

    const { user } = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!user){
            toast.error("Please login to contact us !");
        }
        else{
            toast.success("Submitted Successfully")
        }
    };
    
  return (
    <div className='flex flex-col justify-center py-7 sm:px-6 lg:px-8'>
        <motion.div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>
                Contact Us &nbsp; 
                <Headset className='inline' size={40} />
            </h2>
        </motion.div>

        <motion.div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                        Full name
                    </label>

                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input id='name' type='text' required className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' placeholder='John Doe' />
                    </div>
                </div>

                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                    Email address
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input id='email' type='email' required className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' placeholder='you@example.com' />
                    </div>
                </div>

                <div>
                    <label htmlFor='message' className='block text-sm font-medium text-gray-300'>
                    Your Message
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <NotepadText className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <textarea id='message' name='message' rows='3' className='mt-1 block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' required placeholder='Your Message ....' />
                    </div>
                </div>

                <button type='submit' className='w-full h-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'>
                    Submit    
                </button>

            </form>
        </div>
        </motion.div>
    </div>
  );
};

export default Contact;