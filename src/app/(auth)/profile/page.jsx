"use client";

import CardLayout from "@/app/components/card_design/CardLayout";
import TitleHeader from "@/app/components/common/TitleHeader";
import { useSession } from "@/lib/auth-client";
import Loading from "@/app/components/common/Loading";
import { updateUser,signOut } from "@/lib/auth-client";
import { toast,Bounce} from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router=useRouter()
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <Loading />;
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.name.trim()) {
      toast.error("Name is required", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const { data: restData, error: signUpError } = await updateUser({
        name: data.name,
      });

      if (signUpError) {
        toast.error(signUpError.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success("name is updated successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-5 text-[#26332A] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-5">
          <TitleHeader
            titleStyle="text-[24px]"
            title={"আমার প্রোফাইল"}
            subtitle="আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।"
            subtitleStyle="text-sm"
          />
        </header>

        <CardLayout style="!mb-4 !rounded-xl !p-4 !shadow-none">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-xl bg-[#E8EEE8]">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile picture"
                    className="object-cover"
                  />
                ) : (
                  <p className="flex justify-center items-center h-full">
                    {session.user.name[0]}
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-sm font-semibold">{session.user.name}</h2>
                <p className="text-xs text-secondary-text-color">
                  {session?.user.email}
                </p>
              </div>
            </div>

            <button
              className="w-auto rounded-lg border border-secondary-color px-3 py-2 text-sm font-medium text-seondary-color "
              onClick={async () =>
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in"); // redirect to login page
                    },
                  },
                })
              }
            >
              ↶ সাইন আউট
            </button>
          </div>
        </CardLayout>

        <CardLayout style="!rounded-xl !p-4 !shadow-none sm:!p-5">
          <h2 className="mb-6 text-sm font-bold">তথ্য</h2>

          <form className="space-y-3 px-1 sm:px-3" onSubmit={(e)=> formSubmit(e)}>
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium">
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-md border border-[#E2EAE3] bg-transparent px-3 py-2 text-sm outline-none transition focus:border-primary-color"
              />
            </div>

            <button type="submit" className="bg-primary-color text-white py-2 w-full text-sm rounded-[10px]">
              আপডেট
            </button>
          </form>
        </CardLayout>
      </div>
    </main>
  );
}
