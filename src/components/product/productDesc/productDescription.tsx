interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="product-description">
      <p>{description}</p>
    </div>
  );
}

export default ProductDescription;
