import { useSelector } from "react-redux";

import DailyUsageChar from "../../ui/DailyUsageChar";
import ButtonLink from "../../ui/ButtonLink";
import LineChart from "../../ui/LineChart";
import UserProfile from "./UserProfile";
import UserLabel from "./UserLabel";

function UserDashboard() {
  const user = useSelector((state) => state.user);
  const { friends, confirmedQuiz, createdQuiz, points } = user;

  console.log(confirmedQuiz);

  return (
    <div className="w-full h-full p-5 flex flex-col gap-3">
      <div className="flex gap-3 items-center w-full">
        <UserLabel label="Your quiz" value={createdQuiz} />
        <UserLabel label="Confirmed Quiz" value={confirmedQuiz.length} />
        <UserLabel label="Your points" value={points} />
        <UserLabel label="Firends" value={friends.length} />
      </div>

      <div className="w-full bg-neutral-800 rounded py-2 px-3 text-neutral-400">
        <div className="bg-neutral-800 rounded">
          <LineChart />
        </div>
      </div>

      <DailyUsageChar />

      <div className="flex gap-3 w-full">
        <div className="w-1/2">
          <UserProfile user={user} />
        </div>
        <div className="w-1/2 bg-neutral-800 p-2 text-neutral-400 rounded flex gap-3">
          <ul className="w-1/2 h-[239px] bg-neutral-900 rounded overflow-y-auto divide-y-2 divide-neutral-800">
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
    </div>
  );
}

export default UserDashboard;
