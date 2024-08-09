import React from 'react'
import { Button } from "@/components/ui/button";
import logo from 'gallery/images/logo.png'

const AdminSidebar = () => {
  return (
    <aside className="w-56 h-screen fixed bg-homeText shadow-md font-archivo">
      <div className="p-3 flex items-center justify-center flex-col mt-0">
        <div className="mb-4">
          <img src={logo} alt="Digital Horizon" className='h-8 w- 8' />
        </div>

        <nav className="flex-grow overflow-y-auto">
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm"
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm"
          >
            Schools
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm"
          >
            Mentors
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm"
          >
            Courses
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start mb-2 text-sm"
          >
            Events
          </Button>
        </nav>
      </div>
    </aside>
  )
}

export default AdminSidebar;
