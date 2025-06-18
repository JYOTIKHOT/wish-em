import { useSearchParams } from "react-router";

import { decryptData } from "../../helpers";

const GiftCard = () => {
  const [params] = useSearchParams();
  const name = decryptData(params.get("name"));
  const message = decryptData(params.get("message"));
  return (
    <section className="mt-25">
      <h1 className="text-bold text-6xl text-indigo-500">{name}</h1>
      <p className="text-lg text-gray-700">{message}</p>
    </section>
  );
};

export default GiftCard;
