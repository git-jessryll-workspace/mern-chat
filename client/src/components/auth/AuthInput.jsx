export default function AuthInput({
  name,
  type,
  placeholder,
  register,
  error,
}) {
  return (
    <div className="mt-8 content-center text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-dark_bg_3 text-base rounded-lg outline-none py-2 px-4"
        {...register(name)}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
