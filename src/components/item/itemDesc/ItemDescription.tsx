interface ItemDescriptionProps {
  description: string;
}

function ItemDescription({ description }: ItemDescriptionProps) {
  return (
    <div className="item-description">
      <p>{description}</p>
    </div>
  );
}

export default ItemDescription;
