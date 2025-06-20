import Member from './memberBlock/memberBlock';
import Dzmitry from '../../assets/img/Dzmitry.png';
import './aboutUs.scss';
import RSLogo from '../../assets/img/rs-logo.svg';

function About() {
  return (
    <div className="about-us">
      <div className="intoduction">
        <h2>Meet our team:</h2>
        <p className="introduction-text">
          We are a passionate and dedicated front-end development team committed to delivering a
          polished and responsive user experience. Our journey began at
          <a href="https://rs.school/" className="logo-link" target="blank">
            <img className="rs-logo" src={RSLogo} alt="rs-logo" />
            RS School
          </a>
          , where we met and discovered a shared passion for web development. This common starting
          point brought us together as a team, allowing each of us to bring our unique strengths to
          the project. Through collaboration, continuous learning, and mutual support, we worked in
          harmony to bring our shared vision to life.
        </p>
      </div>
      <Member
        imgSrc={Dzmitry}
        roleMember="Team Lead"
        info="Dzmitry is a passionate junior front-end developer who enjoys bringing user-friendly interfaces to life. With a love for clean design and responsive code, he’s always eager to learn and grow in the world of web development. Outside of work, Dzmitry enjoys traveling, hiking, running, and reading — always exploring new paths both in nature and in tech."
      />
      <Member
        imgSrc={Dzmitry}
        roleMember="Developer"
        info="Dzmitry is a passionate junior front-end developer who enjoys bringing user-friendly interfaces to life. With a love for clean design and responsive code, he’s always eager to learn and grow in the world of web development. Outside of work, Dzmitry enjoys traveling, hiking, running, and reading — always exploring new paths both in nature and in tech."
      />
      <Member
        imgSrc={Dzmitry}
        roleMember="Developer"
        info="Dzmitry is a passionate junior front-end developer who enjoys bringing user-friendly interfaces to life. With a love for clean design and responsive code, he’s always eager to learn and grow in the world of web development. Outside of work, Dzmitry enjoys traveling, hiking, running, and reading — always exploring new paths both in nature and in tech."
      />
    </div>
  );
}

export default About;
