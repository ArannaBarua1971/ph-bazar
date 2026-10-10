"use client";
import Link from "next/link";
import CardLayout from "@/app/components/card_design/CardLayout";
import TitleHeader from "@/app/components/common/TitleHeader";
import Input from "@/app/components/form/Input";
import { signIn, signUp } from "@/lib/auth-client";
import { validateForm } from "@/functions/helper";
import { toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
function SignUp() {
  const formLabels = [
    {
      name: "নাম",
      type: "text",
      placeholder: "যেমন: রহিম উদ্দিন",
      nameEn: "name",
    },
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
    {
      name: "পাসওয়ার্ড নিশ্চিত করুন",
      type: "password",
      placeholder: "আবার লিখুন",
      nameEn: "confirmPassword",
    },
  ];
  const router=useRouter()

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
      const { data: restData, error: signUpError } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (signUpError) {
        toast.error(signUpError.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success("account created successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        router.push("/sign-in")
      } 
    }
  };

  const signInWithGoogle = async () => {
    console.log("hi");
    const data = await signIn.social({
      provider: "google",
    });
  };
  const signInWithGithub = async () => {
    const data = await signIn.social({
      provider: "github",
    });
  };
  return (
    <main className="flex min-h-[calc(100vh-100px)] items-center justify-center px-3 py-6 text-primary-text-color sm:px-6 sm:py-10">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center sm:mb-5">
          <TitleHeader
            title="অ্যাকাউন্ট তৈরি করুন"
            titleStyle="text-2xl sm:text-3xl"
            subtitle="বিনা খরচে সাইন আপ করে সব বিজ্ঞপ্তির সাথে যুক্ত থাকুন"
            subtitleStyle="text-sm leading-relaxed"
          />
        </div>

        <CardLayout style="!rounded-2xl !border-[#E0E8E1] !bg-[#FCFEFC] !p-4 !shadow-none sm:!p-6">
          <form
            className="space-y-3 sm:space-y-4"
            onSubmit={(e) => formSubmit(e)}
          >
            {formLabels.map((i) => (
              <Input key={i.name} data={i} />
            ))}

            <button
              type="submit"
              className="w-full cursor-pointer rounded-[10px] bg-primary-color py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] sm:py-3"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-[#DDE5DF]" />
              <span className="shrink-0 text-xs text-secondary-text-color">
                অথবা
              </span>
              <div className="h-px flex-1 bg-[#DDE5DF]" />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={() => signInWithGoogle()}
                type="button"
                className="flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#DDE5DF] px-3 py-2.5 text-xs font-semibold transition hover:bg-[#F0F5F0] sm:text-[11px]"
              >
                <i className="fa-brands fa-google text-[#4285F4]" />
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                onClick={() => signInWithGithub()}
                type="button"
                className="flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#DDE5DF] px-3 py-2.5 text-xs font-semibold transition hover:bg-[#F0F5F0] sm:text-[11px]"
              >
                <i className="fa-brands fa-github" />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="pt-2 text-center text-xs leading-relaxed">
              অ্যাকাউন্ট আছে?
              <Link
                href="/sign-in"
                className="ms-1 font-medium text-primary-color hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </form>
        </CardLayout>

        <div className="mt-4 text-center sm:mt-5">
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

export default SignUp;
