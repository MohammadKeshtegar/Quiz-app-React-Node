import DailyUsageChar from "../../ui/DailyUsageChar";
import { useUserStorage } from "../../states/store";
import ButtonLink from "../../ui/ButtonLink";
import LineChart from "../../ui/LineChart";
import UserProfile from "./UserProfile";
import UserLabel from "./UserLabel";

function UserDashboard() {
  const { user } = useUserStorage();
  const { friends, confirmedQuiz, createdQuiz, points } = user;

  return (
    <div className="w-full h-full p-5 flex flex-col gap-3">
      <div className="flex gap-3 items-center w-full">
        <UserLabel label="Your quiz" value={createdQuiz.length} />
        <UserLabel label="Confirmed Quiz" value={confirmedQuiz.length} />
        <UserLabel label="Your points" value={points} />
        <UserLabel label="Firends" value={friends.length} />
      </div>

      <div className="flex gap-3 w-full">
        <div className="w-1/2">
          <UserProfile user={user} />
        </div>
        <div className="w-1/2 dark:bg-neutral-800 p-2 dark:text-neutral-400 text-black rounded flex gap-3 shadow-custom-2">
          <ul className="w-1/2 h-[239px] dark:bg-neutral-900 bg-neutral-100 rounded overflow-y-auto divide-y-2 dark:divide-neutral-800 divide-neutral-200">
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
            <li className="py-2 px-3">hello</li>
          </ul>

          <div className="w-1/2 flex flex-col">
            <div className="flex flex-col gap-2">
              <p className="text-xl">Created quiz: 0</p>
              <p className="text-xl">Average rating: 0</p>
              <p className="text-xl">Users done the quiz: 0</p>
            </div>

            <div className="flex gap-2 w-full mt-auto mb-1">
              <ButtonLink customeStyle="w-1/2 flex justify-center" styleType="fill">
                Create
              </ButtonLink>
              <ButtonLink customeStyle="w-1/2 flex justify-center">See all</ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="text-neutral-600 rounded shadow-lg">
        <div className="dark:bg-neutral-800 rounded shadow-custom-1">
          <LineChart />
        </div>
      </div>

      <DailyUsageChar />
    </div>
  );
}

export default UserDashboard;
