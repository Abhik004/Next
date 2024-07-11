export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-3/4 md:w-2/4 lg:w-1/3">
                <h1 className="text-5xl font-bold text-center mb-4 text-gray-800">Profile</h1>
                <hr className="mb-6 border-gray-300" />
                <p className="text-2xl text-center text-gray-700 mb-4">Profile Page</p>
                <div className="flex justify-center">
                    <span className="px-4 py-2 text-2xl font-semibold text-white bg-orange-500 rounded-full">
                        {params.id}
                    </span>
                </div>
            </div>
        </div>
    );
}
