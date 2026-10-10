"use client";

function Button({ children, style, submit }) {
  return (
    <button
      onClick={() => submit?.()}
      className={`cursor-pointer rounded-[10px] bg-primary-color px-3 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 sm:px-4 sm:py-3 sm:text-[14px] ${style}`}
    >
      {children}
    </button>
  );
}

export default Button;
