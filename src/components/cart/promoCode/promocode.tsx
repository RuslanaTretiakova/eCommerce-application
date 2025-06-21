import './promoCode.scss';

interface PromoCodeProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoError: string | null;
  handleApplyPromoCode: () => void;
}

function PromoCode({ promoCode, setPromoCode, promoError, handleApplyPromoCode }: PromoCodeProps) {
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
        <button type="submit" onClick={handleApplyPromoCode}>
          Apply
        </button>
      </label>

      {promoError && <p className="error-message">{promoError}</p>}
    </form>
  );
}

export default PromoCode;
