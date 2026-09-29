import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { prisma } from "@/lib/db";
import LogoutButton from '@/app/dashboardNew/LogoutButton'; // Client Component Import

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-change-this-in-env'
);

export default async function DashboardPage() {
  // 1. Server Side Cookie Read
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let userId: string;

  try {
    // 2. Token Verification
    const { payload } = await jwtVerify(token, JWT_SECRET);
    userId = payload.userId as string;
  } catch (error) {
    redirect('/login');
  }

  // 3. Direct Prisma Database Query
  // Note: Agar aapki Schema me ID Int h to Number(userId) use karein, aksar String (cuid/uuid) hoti hai
  const user = await prisma.user.findUnique({
    where: { id: userId }, 
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back, {user.name}! 👋
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Client Logout Component */}
          <LogoutButton />
        </div>

        <div className="border-t pt-4 mt-4">
          <p className="text-gray-600">
            Yeh page pure <strong>Server Component</strong> se direct Database read kar raha hai, bina kisi extra Client-side fetch API call ke.
          </p>
        </div>
      </div>
    </div>
  );
}