

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
        <nav className="bg-blue-50 shadow-lg border-b-2 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                My-Pay
                            </div>
                        </div>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {/* Welcome Message */}
                                <div className="hidden sm:flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <div className="text-gray-700">
                                        <span className="text-sm text-gray-500">Welcome,</span>
                                        <span className="ml-1 font-medium text-gray-900">
                                            {user.name || 'User'}
                                        </span>
                                    </div>
                                </div>

                                {/* Mobile Welcome */}
                                <div className="sm:hidden flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {user.name || 'User'}
                                    </span>
                                </div>

                                {/* Logout Button */}
                                <button 
                                    onClick={onSignout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            /* Login Button */
                            <button 
                                onClick={onSignin}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}