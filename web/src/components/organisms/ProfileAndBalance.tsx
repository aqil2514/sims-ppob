import { Profile } from "@/@types/user";
import BalanceCard from "../molecules/card/BalanceCard";
import GreetingsCard from "../molecules/card/GreetingsCard";

interface ProfileAndBalanceProps {
  profile?: Profile;
  balance?: number;
}

export default function ProfileAndBalance({
  balance,
  profile,
}: ProfileAndBalanceProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <GreetingsCard
        avatarUrl={profile?.profile_image || ""}
        name={`${profile?.first_name || ""} ${profile?.last_name || ""}`}
      />
      <BalanceCard balance={balance} />
    </section>
  );
}
