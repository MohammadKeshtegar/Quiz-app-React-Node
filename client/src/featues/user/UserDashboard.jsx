import { useSelector } from "react-redux";

import ButtonLink from "../../ui/ButtonLink";
import LineChart from "../../ui/LineChart";
import UserProfile from "./UserProfile";
import UserLabel from "./UserLabel";
import FriendRow from "../../ui/FriendRow";

function UserDashboard() {
  const user = useSelector((state) => state.user);
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

        <div className="w-1/2 bg-neutral-800 p-2 text-neutral-400 rounded flex gap-3">
          <ul className="w-1/2 h-[272px] bg-neutral-900 rounded overflow-y-auto">
            {friends.length > 0 ? (
              friends.map((friend, i) => <FriendRow friend={friend} key={i} />)
            ) : (
              <div className="flex flex-col justify-center items-center mt-20">
                <p className="text-neutral-500 text-lg">You have noe friends! 😢</p>
                <ButtonLink styleType={"fill"} customeStyle={"text-sm mt-3"}>
                  Invite friends
                </ButtonLink>
              </div>
            )}
          </ul>

          <div className="w-1/2 flex flex-col">
            <div className="flex flex-col gap-2">
              <p className="text-xl">Users had done your quizzes: 0</p>
              <p className="text-xl">Average rating: 0</p>
              <p className="text-xl">Created quiz: {createdQuiz.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-neutral-800 rounded py-2 px-3 text-neutral-400">
        <div className="bg-neutral-800 rounded">
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
