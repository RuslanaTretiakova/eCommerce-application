import ItemDescription from '../../components/item/itemDesc/ItemDescription';
import BaseButton from '../../components/ui/base-button/BaseButton';
import { ProductGallery } from '../../components/item/itemSlider/itemSlider';
import ItemHeader from '../../components/item/itemHeader/ItemHeader';
import ItemSpecification from '../../components/item/itemSpec/itemSpec';
import './item.scss';

const pics = [
  'https://contents.mediadecathlon.com/p2623171/k$9d17c556d9d2e6d0f0da3770060d5191/sq/rower-elektryczny-gorski-mtb-rockrider-e-st100-275.jpg?format=auto&f=969x969',
  'https://contents.mediadecathlon.com/p2698703/k$aa585db33a05bb226efb8ddf7d80e66d/sq/rower-elektryczny-gorski-mtb-rockrider-e-st100-275.jpg?format=auto&f=969x969',
  'https://contents.mediadecathlon.com/p2470097/k$951f45dd38ae2244319655eff6fe4ea3/sq/rower-elektryczny-gorski-mtb-rockrider-e-st100-275.jpg?format=auto&f=969x969',
  'https://contents.mediadecathlon.com/p2470096/k$711a6b80a84f306111f82f855b674387/sq/rower-elektryczny-gorski-mtb-rockrider-e-st100-275.jpg?format=auto&f=969x969',
  'https://contents.mediadecathlon.com/p2470094/k$9fa6059359a0b2c2c89f26ecc08fd955/sq/rower-elektryczny-gorski-mtb-rockrider-e-st100-275.jpg?format=auto&f=969x969',
  'https://contents.mediadecathlon.com/p2415110/k$b95d05bac0f935eb11bf45b508716729/sq/rower-elektryczny-gorski-mtb-rockrider-e-st100-275.jpg?format=auto&f=969x969',
];

const title = '27.5" Mountain Bike - EXPL 50 Dark Grey';
const price = 298.0;
const discount = 20;
const description =
  'Effective? Strong? Both, please! Easily get through your first obstacles: lightweight aluminium frame and 27.5" tyres on double-walled rims';
// const footer = [
//   { delivery: 'Home delivery withing 3 working days' },
//   { return: '365 days to return' },
// ];
const specs = [
  { frame: 'Al' },
  { speeds: '21' },
  { wheel: '27.5"' },
  { brakes: 'pad' },
  { weight: '15.5kg' },
];

function Item() {
  return (
    <div className="item">
      <div className="item_slider">
        <ProductGallery images={pics} />
      </div>
      <div className="item-info">
        <ItemHeader title={title} price={price} discount={discount} />
        <ItemDescription description={description} />
        <ItemSpecification specs={specs} />
        <BaseButton type="button" className="button--submit" title="title">
          Add to card
        </BaseButton>
      </div>
    </div>
  );
}

export default Item;
