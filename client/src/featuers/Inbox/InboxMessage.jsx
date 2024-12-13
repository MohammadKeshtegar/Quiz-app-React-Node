import Modal from "../../ui/Modal";
import ShowUserInfo from "../user/ShowUserInfo";

function InboxMessage() {
  return (
    <div className="w-full h-full p-5">
      <div className="text-white bg-neutral-800 p-4 rounded border-t-4 border-blue-600">
        <h2 className="text-neutral-400 mb-5 text-xl">
          From{" "}
          <Modal>
            <Modal.Open opens="show-user">
              <span className="hover:cursor-pointer hover:text-neutral-300 transition-all">username</span>
            </Modal.Open>
            <Modal.Window name="show-user">
              <ShowUserInfo />
            </Modal.Window>
          </Modal>
        </h2>

        <div className="py-2 px-4 rounded border-l-4 border-blue-600 bg-neutral-700/60">
          <h2 className="font-semibold text-xl mb-5 text-neutral-300/90">Dear username</h2>

          <p className="text-neutral-300/70 mb-3">
            We are thrilled to invite you to become a part of our [group name]. As a member, you’ll have the opportunity to connect with like-minded
            individuals, share ideas, and collaborate on exciting projects.
          </p>

          <p className="text-neutral-300/70">
            To accept this invitation, simply reply to this email or visit our group page at [Group URL]. We look forward to having you on board!
          </p>
        </div>
      </div>
    </div>
  );
}

export default InboxMessage;
