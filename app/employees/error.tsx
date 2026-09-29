"use client";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-red-600">
                Something went wrong!
            </h2>

            <p className="mt-2 text-gray-600">
                {error.message}
            </p>

            <button
                onClick={() => reset()}
                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
            >
                Try Again
            </button>
        </div>
    );
}