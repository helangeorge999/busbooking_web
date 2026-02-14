import { getUserData } from "@/lib/cookie";
import ProfileForm from "./_components/ProfileForm";

export default async function ProfilePage() {
  const user = await getUserData();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-gray-500">Update your personal information</p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}