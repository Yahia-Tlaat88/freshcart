import React from 'react'
import { Link } from 'react-router-dom'

export function Fotter() {
  return (
    <div>
        

<footer className="fixed bottom-0 left-0 z-20 w-full md:p-4 sm:p-3 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between dark:bg-gray-800 dark:border-gray-600">
  <span className="text-sm text-gray-500 sm:text-center">© 2025 <Link to="../Home" className="hover:underline">FreshCart</Link>. All Rights Reserved.
  </span>
  <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
    <li>
      
     <Link to="https://www.facebook.com/" >
      <span className="me-4 md:me-6"><i className="fa-brands fa-facebook" />
</span>
     </Link>
    </li>
    
    <li>
         
    <Link to="https://www.instagram.com/" >
    <span className="me-4 md:me-6"><i className="fa-brands fa-instagram" /></span>
     </Link>
    </li>
    <li>
    <Link to="https://www.x.com/" >
      <span className="me-4 md:me-6"><i className="fa-brands fa-x-twitter" /></span>
     </Link>
    </li>
    <li>
      <Link to="https://www.tiktok.com/">
      <span className="me-4 md:me-6"><i className="fa-brands fa-tiktok" /></span>
      </Link>
    </li>
  
    <li>
      <Link to="https://www.linkedin.com/">
      <span className="me-4 md:me-6"><i className="fa-brands fa-linkedin" /></span>
      </Link>
    </li>
    <li>
      <Link to="https://www.youtube.com/">
      
      <span className="me-4 md:me-6"><i className="fa-brands fa-youtube" /></span>
      </Link>
    </li>
  </ul>
</footer>
    </div>
  )
}
