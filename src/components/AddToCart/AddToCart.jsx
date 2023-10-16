/* eslint-disable react/prop-types */
export default function AddToCart({ id }) {
  const handleClick = () => {
    window.open(`https://greet.bg/?add-to-cart=${id}`, "_target");
  };

  return (
    <button
      className="text-center bg-primary text-white rounded"
      onClick={handleClick}
      target="_blank"
    >
      Add To Cart
    </button>
  );
}
