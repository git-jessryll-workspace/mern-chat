import RegistrationForm from "../components/auth/RegistrationForm";

export default function () {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center py-[19px] justify-center overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <RegistrationForm />
      </div>
    </div>
  );
}
