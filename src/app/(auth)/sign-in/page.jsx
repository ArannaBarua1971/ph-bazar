"use client";
import Link from "next/link";
import CardLayout from "@/app/components/card_design/CardLayout";
import TitleHeader from "@/app/components/common/TitleHeader";
import Input from "@/app/components/form/Input";
import { signIn } from "@/lib/auth-client";
import { validateForm } from "@/functions/helper";
import { toast, Bounce } from "react-toastify";
function SignIn() {
  const formLabels = [
    {
      name: "ইমেইল",
      type: "email",
      placeholder: "you@example.com",
      nameEn: "email",
    },
    {
      name: "পাসওয়ার্ড",
      type: "password",
      placeholder: "কমপক্ষে ৮ অক্ষর",
      nameEn: "password",
    },
  ];

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    let error = validateForm(data);
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const { data: restData, error: signUpError } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (signUpError) {
        toast.error(signUpError.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success("log in successfull", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const signInWithGoogle = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };

  const signInWithGithub = async () => {
    const data = await signIn.social({
        provider: "github"
    })
}
  return (
    <main className="flex items-center justify-center py-6 text-primary-text-color">
      <div className="w-full max-w-md">
        <div className="mb-5 text-center">
          <TitleHeader
            title={"সাইন ইন"}
            subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
          />
        </div>

        <CardLayout style="!rounded-2xl !border-[#E0E8E1] !bg-[#FCFEFC] !p-5 !shadow-none sm:!p-6">
          <form className="space-y-3" onSubmit={(e) => formSubmit(e)}>
            {formLabels.map((i) => (
              <Input key={i.name} data={i} />
            ))}

            <button
              type="submit"
              className="cursor-pointer font-semibold text-sm py-2 rounded-[10px] shadow-md hover:opacity-90 active:scale-[0.99] w-full bg-primary-color text-white"
            >
              সাইন ইন
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-[#DDE5DF]" />
              <span className="text-xs text-secondary-text-color">অথবা</span>
              <div className="h-px flex-1 bg-[#DDE5DF]" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => signInWithGoogle()}
                type="button"
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-lg border border-[#DDE5DF] px-2 py-2 text-[11px] font-semibold transition hover:bg-[#F0F5F0]"
              >
                <span className="font-bold text-[#4285F4]">
                  <i className="fa-brands fa-google"></i>
                </span>
                Google দিয়ে চালিয়ে যান
              </button>

              <button
              onClick={()=> signInWithGithub()}
                type="button"
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-lg border border-[#DDE5DF] px-2 py-2 text-[11px] font-semibold transition hover:bg-[#F0F5F0]"
              >
                <i className="fa-brands fa-github"></i>
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="pt-1 text-center text-xs">
              অ্যাকাউন্ট আছে?
              <Link
                href="/sign-up"
                className="font-medium text-primary-color hover:underline ms-1 "
              >
                সাইন আপ করুন
              </Link>
            </p>
          </form>
        </CardLayout>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-secondary-text-color transition hover:text-primary-text-color"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
