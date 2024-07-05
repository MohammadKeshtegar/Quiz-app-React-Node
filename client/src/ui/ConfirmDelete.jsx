import MiniSpinner from "./MiniSpinner";
import Button from "./Button";

function ConfirmDelete({ onClick, isLoading, onCloseModal, source, itemName, all = false }) {
  return (
    <div>
      {all ? (
        <p className="my-3 mb-5">Are you sure you want to delete all {source}</p>
      ) : (
        <p className="my-3 mb-5">
          Are you sure you want to delete this {source}?{" "}
          {source === "quiz" || source === "category" ? (
            <>
              ( <span className="capitalize">{source}</span>: <span className="text-blue-500">#{itemName}</span> )
            </>
          ) : (
            ""
          )}
        </p>
      )}
      <div className="w-full flex justify-end">
        <Button
          onClick={() => {
            onClick();
            onCloseModal();
          }}
          styleType="fill"
          disable={isLoading}
        >
          {isLoading ? <MiniSpinner /> : "Confirm"}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
