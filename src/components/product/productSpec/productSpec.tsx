import './productSpec.scss';

interface ProductSpecificationProps {
  specs: Array<Record<string, string>>;
}

function ProductSpecification({ specs }: ProductSpecificationProps) {
  return (
    <div className="product-spec">
      <nav>
        <ul>
          {specs.map((spec) => {
            const [key, val] = Object.entries(spec)[0];
            return (
              <li>
                <p>{`${key}:`}</p>
                <p>{val}</p>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default ProductSpecification;
