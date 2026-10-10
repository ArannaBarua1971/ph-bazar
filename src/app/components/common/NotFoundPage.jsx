import Link from "next/link"

function NotFoundPage() {
  return (
     <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-primary-color">৪০৪ </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        পাতাটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-2 text-gray-500">
        দুঃখিত, আপনি যে পাতাটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-primary-color px-6 py-3 font-medium text-white transition hover:opacity-90"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  )
}

export default NotFoundPage