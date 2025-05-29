import './itemSpec.scss';

interface ItemSpecificationprops {
  specs: Array<Record<string, string>>;
}

function ItemSpecification({ specs }: ItemSpecificationprops) {
  return (
    <div className="item-spec">
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

export default ItemSpecification;
