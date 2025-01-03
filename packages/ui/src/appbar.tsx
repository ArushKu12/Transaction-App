import { Button } from "./button";

interface AppbarProps {
  user?: {
    name ? : string | null;
  },
  onSignin : any,
  onSignout : any
}

export const Appbar = ({
  user,
  onSignin,
  onSignout
} : AppbarProps) => {
  return (
    <div className="flex justify-between border-b border-slate-300 px-[3vw]">
      <div className="text-xl font-semibold flex flex-col justify-center">
        PayTM
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  );
};
