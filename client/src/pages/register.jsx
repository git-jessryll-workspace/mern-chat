import RegistrationForm from "../components/auth/RegistrationForm";

export default function () {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="flex w-full mx-auto h-full">
        <RegistrationForm />
      </div>
    </div>
  );
}
