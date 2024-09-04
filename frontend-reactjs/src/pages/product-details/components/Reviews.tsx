import { APIURL, httpError } from "@/assets/http";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reviews: React.FC<{ reviews: any[] }> = ({ reviews }) => {
  const { id } = useParams();
  const [ratingCounts, setRatingCounts] = useState<number[]>(Array(5).fill(0));
  const [averageRating, setAverageRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const calculateRatingCounts = () => {
      const counts = Array(5).fill(0);
      let totalRating = 0;

      reviews.forEach((review) => {
        if (review.point >= 1 && review.point <= 5) {
          counts[review.point - 1] += 1;
          totalRating += review.point;
        }
      });

      setRatingCounts(counts.reverse()); // Ters sırada göstermek için ters çevir

      if (reviews.length > 0) {
        setAverageRating(totalRating / reviews.length);
      } else {
        setAverageRating(0);
      }
    };

    calculateRatingCounts();
  }, [reviews]);

  const totalReviews = reviews.length;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      alert("Please log in first.");
      setUserLoggedIn(false);
      return;
    }

    if (comment.trim() === "" || rating < 1) {
      alert("Please enter a comment and select a rating.");
      return;
    }

    // Define the request payload
    const requestBody = {
      smartphoneId: id, // You may want to replace this with dynamic data
      content: comment,
      point: rating,
    };

    try {
      // Make the API call
      const response = await fetch(`${APIURL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      window.location.href = window.location.href;

      // Show success alert and reset form
      alert(`Comment: ${comment}\nRating: ${rating}`);
      setComment("");
      setRating(0);
      setUserLoggedIn(true);
    } catch (error) {
      // Handle any errors
      httpError(error); // You may have your own error handling logic
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="p-20">
      <h2 className="font-bold text-3xl font-sfpro mb-10">Reviews</h2>
      <div className="mb-10">
        <div className="grid grid-cols-6 gap-6 mb-10">
          <div className="col-span-2 p-10 grid place-items-center bg-[#FAFAFA]">
            <h1 className="text-6xl font-bold font-sfpro">
              {averageRating.toFixed(1)}
            </h1>
            <p className="text-sm text-gray-400">of {totalReviews} reviews</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(Math.round(averageRating))}
                {"☆".repeat(5 - Math.round(averageRating))}
              </span>
            </div>
          </div>
          <div className="col-span-4">
            <div className="space-y-2">
              {ratingCounts.map((count, index) => {
                const starRating = 5 - index; // Yıldız rating'i 5'ten başlar
                const percentage =
                  totalReviews === 0 ? 0 : (count / totalReviews) * 100;
                return (
                  <div key={starRating} className="flex items-center">
                    <p className="text-md w-16 text-right mx-5">
                      {starRating} Stars:
                    </p>
                    <div className="flex-1 bg-gray-200 h-4 rounded-full relative">
                      <div
                        className="bg-yellow-500 h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="ml-2 text-lg font-bold">{count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="font-bold text-2xl mb-4">Leave a Comment</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Rating</h3>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows={4}
          placeholder="Write your comment here..."
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
            <div className="flex items-start space-x-4">
              <img
                src={review.userProfilePictureImageUrl}
                alt={review.userFullname}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-lg">
                    {review.userFullname || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(review.point)}
                  </span>
                  <span className="ml-2 text-gray-600">({review.point})</span>
                </div>
                <p className="text-gray-700">{review.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;