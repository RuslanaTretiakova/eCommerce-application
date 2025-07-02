import './promoCode.scss';

interface PromoCodeProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoError: string | null;
  handleApplyPromoCode: () => void;
  promoAttempted: boolean;
}

function PromoCode({
  promoCode,
  setPromoCode,
  promoError,
  handleApplyPromoCode,
  promoAttempted,
}: PromoCodeProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleApplyPromoCode();
      }}
      className="promo"
    >
      <label htmlFor="promo">
        <input
          id="promo"
          type="text"
          value={promoCode}
          placeholder="Enter promocode"
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button type="submit">Apply</button>
      </label>

      {promoAttempted && promoError && <p className="error-message">{promoError}</p>}
    </form>
  );
}

export default PromoCode;
