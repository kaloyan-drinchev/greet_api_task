/* eslint-disable react/prop-types */
export default function AddToCart({ id }) {
  const handleClick = () => {
    window.location.href = `https://greet.bg/?add-to-cart=${id}`;
  };

  return (
    <button
      className="text-center bg-primary text-white rounded"
      onClick={handleClick}
    >
      Add To Cart
    </button>
  );
}
