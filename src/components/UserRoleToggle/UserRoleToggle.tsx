import { UserRole } from "@/types";

type UserRoleToggleProps = {
  currentRole: UserRole;
  changeRole: (role: UserRole) => void;
};

export const UserRoleToggle = (props: UserRoleToggleProps) => {
  const { currentRole, changeRole } = props;
  const isAdmin = currentRole === UserRole.ADMIN;
  const isUser = currentRole === UserRole.USER;

  return (
    <>
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-[#233325] p-1">
        <input type="checkbox" className="sr-only" checked={isAdmin} readOnly />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-bold ${
            isUser ? "text-primary bg-black" : "text-body-color"
          }`}
          onClick={() => changeRole(UserRole.USER)}
        >
          User
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-bold ${
            isAdmin ? "text-primary bg-black" : "text-body-color"
          }`}
          onClick={() => changeRole(UserRole.ADMIN)}
        >
          Admin
        </span>
      </label>
    </>
  );
};
