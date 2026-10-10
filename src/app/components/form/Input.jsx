function Input({ data }) {
  return (
    <div className="mb-4 w-full">
      <label className="mb-1.5 block text-sm font-medium">{data.name}</label>
      <input
        name={data.nameEn}
        type={data.type}
        placeholder={data.placeholder}
        className="w-full rounded-lg border border-[#DDE5DF] bg-transparent px-3 py-2 text-xs outline-none transition focus:border-primary-color sm:px-4 sm:py-2.5 sm:text-sm"
      />
    </div>
  );
}

export default Input;
