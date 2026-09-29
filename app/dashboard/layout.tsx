export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">
                Dashboard Layout
            </h1>

            {children}
        </section>
    );
}