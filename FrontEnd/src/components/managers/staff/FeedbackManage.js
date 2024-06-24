import React, { useState } from "react";

function FeedBackManage() {
  const feedbacks = [
    {
      stars: 5,
      product: {
        id: "P001",
        name: "Product A",
        image: "https://via.placeholder.com/50"
      },
      review: "Excellent!",
      user: {
        name: "Trí",
        date: "6/24/2024",
        comment: "Ngon"
      }
    },
    {
      stars: 4,
      product: {
        id: "P002",
        name: "Product B",
        image: "https://via.placeholder.com/50"
      },
      review: "Very good",
      user: {
        name: "Trí",
        date: "6/24/2024",
        comment: "Ngon"
      }
    },
    {
      stars: 3,
      product: {
        id: "P003",
        name: "Product C",
        image: "https://via.placeholder.com/50"
      },
      review: "Average",
      user: {
        name: "Trí",
        date: "6/24/2024",
        comment: "Ngon"
      }
    },
    {
      stars: 2,
      product: {
        id: "P004",
        name: "Product D",
        image: "https://via.placeholder.com/50"
      },
      review: "Not great",
      user: {
        name: "Trí",
        date: "6/24/2024",
        comment: "Ngon"
      }
    },
    {
      stars: 1,
      product: {
        id: "P005",
        name: "Product E",
        image: "https://via.placeholder.com/50"
      },
      review: "Poor",
      user: {
        name: "Trí",
        date: "6/24/2024",
        comment: "Ngon"
      }
    }
  ];

  const [reviews, setReviews] = useState(feedbacks.map(feedback => feedback.review));

  const handleReviewChange = (index, event) => {
    const newReviews = [...reviews];
    newReviews[index] = event.target.value;
    setReviews(newReviews);
  };

  const renderStars = (stars) => {
    const fullStar = "★"; // You can use any star icon or image here
    const emptyStar = "☆"; // You can use any star icon or image here

    return (
      <span>
        {Array(stars)
          .fill(fullStar)
          .concat(Array(5 - stars).fill(emptyStar))
          .join("")}
      </span>
    );
  };

  return (
    <div>
      <h2>Feedback Management</h2>
      <table>
        <thead>
          <tr>
            <th>Số sao</th>
            <th>Sản phẩm</th>
            <th>Đánh giá</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>
                <div>
                  
                  <p>{feedback.user.name}</p>
                  {renderStars(feedback.stars)}
                  <p>{feedback.user.date}</p>
                  <p>{feedback.user.comment}</p>
                </div>
              </td>
              <td>
                <div>
                <img src="" alt={feedback.product.name} />
                  <p><strong>Mã:</strong> {feedback.product.id}</p>
                  <p><strong>Tên:</strong> {feedback.product.name}</p>
                 
                </div>
              </td>
              <td>
                <textarea
                 
                  onChange={(event) => handleReviewChange(index, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedBackManage;
