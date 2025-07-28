import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const primaryColor = '#146321';

  const linkHoverStyle = {
    backgroundColor: primaryColor,
    color: 'white',
    transform: 'translateX(4px)'
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="hidden lg:block w-[250px] sm:w-[300px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 h-screen shadow-lg">
        <div className="p-6 relative h-full">
          {/* Logo/Brand Section */}
          <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-3">
            <Link
              to="dashboard"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 transition-all duration-300 hover:shadow-md relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, transparent 100%)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateX(4px)';
                const icon = e.currentTarget.querySelector('.icon-container');
                if (icon) icon.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '';
                e.currentTarget.style.transform = 'translateX(0)';
                const icon = e.currentTarget.querySelector('.icon-container');
                if (icon) icon.style.backgroundColor = '';
              }}
            >
              <div className="icon-container p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-300">
                <ChartNoAxesColumn size={18} />
              </div>
              <span className="font-medium">Sales Analytics</span>
              <div
                className="absolute left-0 top-0 w-1 h-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </Link>

            <Link
              to="watch"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 transition-all duration-300 hover:shadow-md relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateX(4px)';
                const icon = e.currentTarget.querySelector('.icon-container');
                if (icon) icon.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '';
                e.currentTarget.style.transform = 'translateX(0)';
                const icon = e.currentTarget.querySelector('.icon-container');
                if (icon) icon.style.backgroundColor = '';
              }}
            >
              <div className="icon-container p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-all duration-300">
                <SquareLibrary size={18} />
              </div>
              <span className="font-medium">Watches</span>
              <div
                className="absolute left-0 top-0 w-1 h-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </Link>
          </nav>



        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="p-8 lg:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;