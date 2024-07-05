import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";

import { useGetAllCategories } from "../category/useGetAllCategories";
import { DIFFICULTY_OPTIONS } from "../../constant/constant";
import { calcQuizTime } from "../../utils/calcQuizTime";
import { useCreateQuestion } from "./useCreateQuestion";
import { useUpdateQuestion } from "./useUpdateQuestion";
import { useDeleteQuestion } from "./useDeleteQuestion";
import ConfirmDelete from "../../ui/ConfirmDelete";
import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import { useSelector } from "react-redux";

function CreateQuestion({ questions, setQuizTime, setCategory, editQuestion, setEditQuestion, setQuestionIndex, editQuiz }) {
  const { isLoading, data } = useGetAllCategories();

  const [correctAnswer, setCorrectAnswer] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");

  const { isCreating, createQuestion } = useCreateQuestion();
  const { isUpdating, updateQuestion } = useUpdateQuestion();

  const isEditSession = Boolean(editQuestion.question);
  const isEditQuizSession = Boolean(editQuiz.id);
  const user = useSelector((state) => state.user);

  const { register, handleSubmit, reset } = useForm({ defaultValues: isEditSession ? editQuestion : isEditQuizSession ? editQuiz.questions : {} });
  const { isDeleting, deleteQuestion } = useDeleteQuestion();

  // With reset function, we reset the defaultValues of the form with the new values
  useEffect(
    function () {
      if (editQuestion.question) reset(questionObject(editQuestion));
    },
    [editQuestion, reset]
  );

  useEffect(
    function () {
      setQuizTime(calcQuizTime(questions));
    },
    [questions, setQuizTime]
  );

  useEffect(
    function () {
      localStorage.setItem("questions", JSON.stringify(questions));
    },
    [questions]
  );

  if (isLoading) return <Spinner />;

  const { data: categories } = data;

  function questionObject(object) {
    return {
      question: object.question,
      correctAnswer: object.correctAnswer,
      difficulty: object.difficulty,
      option1: object.options?.option1 || "",
      option2: object.options?.option2 || "",
      option3: object.options?.option3 || "",
      option4: object.options?.option4 || "",
      score: object.score,
    };
  }

  function onSubmit(formData) {
    const { correctAnswer, difficulty, question, option1, option2, option3, option4 } = formData;
    const newQuestion = {
      correctAnswer,
      difficulty,
      question,
      options: { option1, option2, option3, option4 },
      owner: user.id,
      isCreatingQuiz: true,
    };

    if (isEditSession) {
      updateQuestion({ questionData: newQuestion, id: editQuestion._id });
    } else {
      createQuestion(newQuestion, {
        onSuccess: () => {
          handleReset();
        },
      });
    }
  }

  function handleReset() {
    setCorrectAnswer(1);
    setDifficulty("easy");
    setEditQuestion({});
    setQuestionIndex(null);
    reset({ question: "", option1: "", option2: "", option3: "", option4: "" });
  }

  function handleDelete(targetQuestion) {
    deleteQuestion(targetQuestion._id, {
      onSuccess: () => {
        handleReset();
      },
    });
  }

  return (
    <div className="w-full p-5 text-white">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 border border-neutral-100 dark:border-none p-3 rounded shadow-md bg-neutral-800"
      >
        <div className="flex items-center gap-10 dark:border dark:border-neutral-800 rounded">
          <div className="p-2 flex gap-3 items-center">
            <label>Category</label>
            <select name="category" className="select-input-style" onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 flex gap-3 items-center">
            <label>Difficulty</label>
            <select
              onInput={(option) => setDifficulty(option.target.value)}
              value={difficulty}
              name="difficulty"
              className="select-input-style"
              {...register("difficulty", { required: "Please select the question diffculty!" })}
            >
              {DIFFICULTY_OPTIONS.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 flex gap-3 items-center">
            <label>Correct answer</label>
            <select
              onInput={(e) => setCorrectAnswer(e.target.value)}
              value={correctAnswer}
              name="correctAnswer"
              className="select-input-style"
              {...register("correctAnswer", { required: "Please select the correct answer of this question!" })}
            >
              {Array.from({ length: 4 }, (_, i) => i).map((num) => (
                <option key={num} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-5 dark:bg-neutral-900 rounded border border-neutral-700">
          <textarea
            placeholder="Question..."
            className="dark:bg-neutral-700 border rounded w-full focus:outline-none px-4 py-2 dark:border-none dark:text-neutral-300 dark:placeholder:text-neutral-500 focus:ring-1 focus:ring-blue-500 mt-5"
            rows={3}
            name="question"
            {...register("question", { required: "Please write the question!" })}
          />

          <div className="dark:border dark:border-neutral-900 mt-10 flex flex-col gap-3">
            <input
              placeholder="1."
              type="text"
              name="option1"
              className="input-option-style"
              {...register("option1", { required: "Please provide this option!" })}
            />
            <input
              placeholder="2."
              type="text"
              name="option2"
              className="input-option-style"
              {...register("option2", { required: "Please provide this option!" })}
            />
            <input
              placeholder="3."
              type="text"
              name="option3"
              className="input-option-style"
              {...register("option3", { required: "Please provide this option!" })}
            />
            <input
              placeholder="4."
              type="text"
              name="option4"
              className="input-option-style"
              {...register("option4", { required: "Please provide this option!" })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Modal>
            <Modal.Open>
              <Button
                disable={!isEditSession}
                onClick={() => handleDelete(editQuestion)}
                customeStyle="border-red-600 text-red-600 hover:text-white hover:border-red-500 hover:bg-red-500 px-5 focus:ring-red-500 disabled:hover:cursor-not-allowed disabled:border-red-500 disabled:text-red-500 disabled:hover:bg-red-400"
              >
                Delete
              </Button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete onClick={() => handleDelete(editQuestion)} isLoading={isDeleting} source="question" />
            </Modal.Window>
          </Modal>
          <div className="w-full flex justify-end gap-3 mt-3">
            <Button type="reset" onClick={handleReset}>
              Clear
            </Button>

            <Button type="submit" disable={questions.length >= 10 || isCreating} styleType="fill" customeStyle="px-7">
              {isCreating || isUpdating ? <MiniSpinner /> : isEditSession ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateQuestion;
