import './developedBlock.scss';
import gitLogo from '../../../assets/img/github-logo.svg';

function DevelopedBlock() {
  return (
    <div className="developed-block">
      <h3>Developed by:</h3>
      <ul>
        <li>
          <a href="https://github.com/dzmitryaliakseyeu">
            <img src={gitLogo} alt="github-logo" />
            <p>Dzmitry Aliakseyeu</p>
          </a>
        </li>
        <li>
          <a href="https://github.com/ruslanatretiakova">
            <img src={gitLogo} alt="github-logo" />
            <p>Ruslana Tretiakova</p>
          </a>
        </li>
        <li>
          <a href="https://github.com/nikanorra">
            <img src={gitLogo} alt="github-logo" />
            <p>Olga Nikanorova</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DevelopedBlock;
