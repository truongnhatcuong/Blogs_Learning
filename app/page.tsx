import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const sesson = await getUser();
  return (
    <div>
      <h1>Hello world</h1>
      {sesson ? (
        <div>
          <LogoutLink>
            <Button>LogOut</Button>
          </LogoutLink>
        </div>
      ) : (
        <>
          <RegisterLink>
            <Button>Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button variant={"outline"}>Login</Button>
          </LoginLink>
        </>
      )}
    </div>
  );
}
