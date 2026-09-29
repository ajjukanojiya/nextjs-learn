export default function NotFound() {
    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-red-600">
                Employee Not Found
            </h1>

            <p className="mt-2 text-gray-600">
                The employee you are looking for does not exist.
            </p>
        </div>
    );
}