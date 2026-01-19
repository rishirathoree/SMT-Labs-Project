import type { ReactNode } from 'react'
import { DashboardSidebar } from './components/app-sidebar'
import Appnavbar from '@/components/ui/app-navbar'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex justify-between lg:w-9/12 md:w-9/12 sm:w-full mx-auto h-screen'>
                <DashboardSidebar />
            <div className='w-full overflow-hidden overflow-y-scroll scrollbar-hidden h-screen '>
                <Appnavbar />
                {children}
                </div>
        </div>
    )
}

export default Layout