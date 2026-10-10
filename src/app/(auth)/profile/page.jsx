"use client";

import CardLayout from "@/app/components/card_design/CardLayout";
import TitleHeader from "@/app/components/common/TitleHeader";
import { useSession } from "@/lib/auth-client";
import Loading from "@/app/components/common/Loading";
import { updateUser, signOut } from "@/lib/auth-client";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
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
    <main className="min-h-screen bg-[#F0F5F0] px-3 py-4 text-[#26332A] sm:px-6 sm:py-5">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-4 sm:mb-5">
          <TitleHeader
            titleStyle="text-xl sm:text-2xl"
            title="আমার প্রোফাইল"
            subtitle="আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।"
            subtitleStyle="text-xs sm:text-sm"
          />
        </header>

        <CardLayout style="!mb-4 !rounded-xl !p-3 !shadow-none sm:!p-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#E8EEE8] sm:h-14 sm:w-14">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile picture"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <p className="flex h-full w-full items-center justify-center text-lg font-semibold">
                    {session.user.name?.[0]}
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-sm font-semibold sm:text-base">
                  {session.user.name}
                </h2>
                <p className="break-all text-xs text-secondary-text-color sm:text-sm">
                  {session?.user.email}
                </p>
              </div>
            </div>

            <button
              className="w-full rounded-lg border border-secondary-color px-3 py-2 text-sm font-medium text-seondary-color transition hover:bg-secondary-color/10 sm:w-auto"
              onClick={async () =>
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in");
                    },
                  },
                })
              }
            >
              ↶ সাইন আউট
            </button>
          </div>
        </CardLayout>

        <CardLayout style="!rounded-xl !p-3 !shadow-none sm:!p-5">
          <h2 className="mb-5 text-sm font-bold sm:mb-6 sm:text-base">তথ্য</h2>

          <form
            className="space-y-4 px-0 sm:space-y-3 sm:px-3"
            onSubmit={(e) => formSubmit(e)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium sm:text-sm"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                defaultValue={session.user.name}
                className="w-full rounded-md border border-[#E2EAE3] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-primary-color"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-[10px] bg-primary-color py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              আপডেট
            </button>
          </form>
        </CardLayout>
      </div>
    </main>
  );
}
